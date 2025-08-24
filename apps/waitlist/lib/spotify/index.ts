import { SpotifyApi, type Track } from "@spotify/web-api-ts-sdk";

const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

if (!clientId || !clientSecret) {
  throw new Error("Missing Spotify credentials");
}

export const spotifySdk = SpotifyApi.withClientCredentials(
  clientId,
  clientSecret,
);

export function normalizeTracks(items: Track[] = []) {
  return items.map((track) => ({
    id: track.id,
    title: track.name,
    subtitle: track.artists.map((artist) => artist.name).join(", "),
    image: track.album.images?.[1]?.url ?? track.album.images?.[0]?.url ?? "",
    previewUrl: track.preview_url ?? null,
    uri: track.uri,
  }));
}
