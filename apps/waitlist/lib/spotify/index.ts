import { SpotifyApi, type Track } from "@spotify/web-api-ts-sdk";

let sdk: ReturnType<typeof SpotifyApi.withClientCredentials> | null = null;

export function getSpotifySdk() {
  if (sdk) return sdk;
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  if (!clientId || !clientSecret) {
    throw new Error("Missing Spotify credentials");
  }
  sdk = SpotifyApi.withClientCredentials(clientId, clientSecret);
  return sdk;
}

export function normalizeTracks(items: Track[] = []) {
  return items.map((track) => ({
    id: track.id,
    title: track.name,
    artist: track.artists.map((artist) => artist.name).join(", "),
    image: track.album.images?.[1]?.url ?? track.album.images?.[0]?.url ?? "",
    url: track.external_urls.spotify,
  }));
}
