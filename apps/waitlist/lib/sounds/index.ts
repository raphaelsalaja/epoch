import { useCallback } from "react";
import useSound from "use-sound";

export function useTypingSound() {
  const [playType1] = useSound("/media/sounds/type_01.wav", {
    preload: true,
    interrupt: true,
    volume: 0.5,
  });

  const [playType2] = useSound("/media/sounds/type_02.wav", {
    preload: true,
    interrupt: true,
    volume: 0.5,
  });

  const [playType3] = useSound("/media/sounds/type_03.wav", {
    preload: true,
    interrupt: true,
    volume: 0.5,
  });

  const [playType4] = useSound("/media/sounds/type_04.wav", {
    preload: true,
    interrupt: true,
    volume: 0.5,
  });

  const [playType5] = useSound("/media/sounds/type_05.wav", {
    preload: true,
    interrupt: true,
    volume: 0.5,
  });

  const playRandom = useCallback(() => {
    const players = [playType1, playType2, playType3, playType4, playType5];
    const randomPlayer = players[Math.floor(Math.random() * players.length)];
    randomPlayer();
  }, [playType1, playType2, playType3, playType4, playType5]);

  return playRandom;
}

export function useTransitionSound() {
  const [playTransitionUp] = useSound("/media/sounds/transition_up.wav", {
    preload: true,
    interrupt: true,
    volume: 0.5,
  });

  const play = useCallback(() => {
    playTransitionUp();
  }, [playTransitionUp]);

  return play;
}

export function useTapSound() {
  const [playTap1] = useSound("/media/sounds/tap_01.wav", {
    preload: true,
    interrupt: true,
    volume: 0.5,
  });

  const [playTap2] = useSound("/media/sounds/tap_02.wav", {
    preload: true,
    interrupt: true,
    volume: 0.5,
  });

  const [playTap3] = useSound("/media/sounds/tap_03.wav", {
    preload: true,
    interrupt: true,
    volume: 0.5,
  });

  const [playTap4] = useSound("/media/sounds/tap_04.wav", {
    preload: true,
    interrupt: true,
    volume: 0.5,
  });

  const [playTap5] = useSound("/media/sounds/tap_05.wav", {
    preload: true,
    interrupt: true,
    volume: 0.5,
  });

  const playRandom = useCallback(() => {
    const players = [playTap1, playTap2, playTap3, playTap4, playTap5];
    const randomPlayer = players[Math.floor(Math.random() * players.length)];
    randomPlayer();
  }, [playTap1, playTap2, playTap3, playTap4, playTap5]);

  return playRandom;
}

export function useSelectionSound() {
  const [playSelection] = useSound("/media/sounds/selection.wav", {
    preload: true,
    interrupt: true,
    volume: 0.5,
  });

  const play = useCallback(() => {
    playSelection();
  }, [playSelection]);

  return play;
}

export function useErrorSound() {
  const [playError] = useSound("/media/sounds/error.wav", {
    preload: true,
    interrupt: true,
    volume: 0.5,
  });

  const play = useCallback(() => {
    playError();
  }, [playError]);

  return play;
}
