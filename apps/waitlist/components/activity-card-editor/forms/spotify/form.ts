import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { z } from "zod";

import { Schemas } from "@/lib/schemas";
import type { Track } from "@/lib/spotify/types";
import { useCardStore } from "@/lib/stores/card";

type FormValues = z.infer<typeof Schemas.Spotify>;

export function useSpotifyForm() {
  const { card, updateSection } = useCardStore();

  const form = useForm<FormValues>({
    resolver: zodResolver(Schemas.Spotify),
    defaultValues: {
      title: card.spotify.title ?? "",
      subtitle: card.spotify.subtitle ?? "",
      image: card.spotify.image ?? "",
    },
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  const onValid = ({ title, subtitle, image }: FormValues) => {
    const clean = {
      title: (title ?? "").trim(),
      subtitle: (subtitle ?? "").trim(),
      image,
    };
    updateSection("spotify", clean);
    form.reset(clean, { keepDirty: false, keepValues: true });
  };

  const selectTrack = (track: Track) => {
    const clean = {
      title: track.title,
      subtitle: track.artist,
      image: track.image,
    } satisfies FormValues;
    updateSection("spotify", clean);
    form.reset(clean, { keepDirty: false, keepValues: true });
  };

  return {
    form,
    onValid,
    selectTrack,
  };
}

export type { FormValues as SpotifyFormValues };
