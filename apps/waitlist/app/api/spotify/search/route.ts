import type { Market } from "@spotify/web-api-ts-sdk";
import type { NextRequest } from "next/server";
import { getSpotifySdk, normalizeTracks } from "@/lib/spotify";

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
  const marketParam = (searchParams.get("market") ?? "US").toUpperCase();
  const market: Market | undefined = /^[A-Z]{2}$/.test(marketParam)
    ? (marketParam as Market)
    : undefined;

  if (!q.trim()) {
    return Response.json(
      { items: [] },
      { headers: { "Cache-Control": "no-store" } },
    );
  }

  try {
    const spotifySdk = getSpotifySdk();
    const res = await spotifySdk.search(q, ["track"], market);
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
