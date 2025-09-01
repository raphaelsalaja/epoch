import type { NextRequest } from "next/server";
import { normalizeTracks, spotifySdk } from "@/lib/spotify";

export const runtime = "edge";
export const dynamic = "force-dynamic";
export const preferredRegion = "auto";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q") ?? "";
  const limit = Math.max(
    1,
    Math.min(50, Number(searchParams.get("limit") ?? 8)),
  );

  if (!q.trim()) {
    return Response.json(
      { items: [] },
      { headers: { "Cache-Control": "no-store" } },
    );
  }

  try {
    const res = await spotifySdk.search(q, ["track"], "US");
    const items = normalizeTracks(res.tracks?.items).slice(0, limit);
    return Response.json(
      { items },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Search failed";
    return Response.json({ error: message }, { status: 500 });
  }
}
