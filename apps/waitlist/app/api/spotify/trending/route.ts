import type { NextRequest } from "next/server";
import { normalizeTracks, spotifySdk } from "@/lib/spotify";

export const runtime = "edge";
export const revalidate = 300;
export const preferredRegion = "auto";

export async function GET(_req: NextRequest) {
  try {
    const playlistItems = await spotifySdk.playlists.getPlaylistItems(
      "6UeSakyzhiEt4NB3UAd6NQ",
      "US",
      undefined,
      3,
      0,
    );

    const tracks = (playlistItems.items ?? [])
      .map((i) => i.track)
      .filter(Boolean);

    const items = normalizeTracks(tracks);

    return Response.json(
      {
        items,
        source: { playlist: "todays-top-hits", id: "6UeSakyzhiEt4NB3UAd6NQ" },
      },
      {
        headers: {
          "Cache-Control": "public, max-age=300, stale-while-revalidate=60",
        },
      },
    );
  } catch (e) {
    const message =
      e instanceof Error ? e.message : "Failed to fetch top tracks";
    return Response.json({ error: message }, { status: 500 });
  }
}
