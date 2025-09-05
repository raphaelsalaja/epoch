import { useCallback } from "react";
import useSound from "use-sound";

const root = "/media/sounds";

export type SoundKey =
  | "button"
  | "caution"
  | "celebration"
  | "disabled"
  | "notification"
  | "progressLoop"
  | "ringtoneLoop"
  | "select"
  | "swipe"
  | "toggleOff"
  | "toggleOn"
  | "transitionDown"
  | "transitionUp"
  | "typing"
  | "swipes"
  | "taps";

export interface SoundController {
  play: (sounds: SoundKey | SoundKey[]) => void;
}

function pickRandom<T>(arr: readonly T[]): T | undefined {
  if (!arr.length) return undefined;
  const i = Math.floor(Math.random() * arr.length);
  return arr[i];
}

export function useSoundController(
  config: Parameters<typeof useSound>[1] = {
    interrupt: true,
    volume: 0.75,
  },
): SoundController {
  const [playButton] = useSound(`${root}/button.wav`);
  const [playCaution] = useSound(`${root}/caution.wav`, config);
  const [playCelebration] = useSound(`${root}/celebration.wav`, config);
  const [playDisabled] = useSound(`${root}/disabled.wav`, config);
  const [playNotification] = useSound(`${root}/notification.wav`, config);
  const [playProgressLoop] = useSound(`${root}/progress_loop.wav`, config);
  const [playRingtoneLoop] = useSound(`${root}/ringtone_loop.wav`, config);
  const [playSelect] = useSound(`${root}/select.wav`, config);
  const [playSwipe] = useSound(`${root}/swipe.wav`, config);
  const [playToggleOff] = useSound(`${root}/toggle_off.wav`, config);
  const [playToggleOn] = useSound(`${root}/toggle_on.wav`, config);
  const [playTransitionDown] = useSound(`${root}/transition_down.wav`, config);
  const [playTransitionUp] = useSound(`${root}/transition_up.wav`, config);
  const [playType1] = useSound(`${root}/type_01.wav`, config);
  const [playType2] = useSound(`${root}/type_02.wav`, config);
  const [playType3] = useSound(`${root}/type_03.wav`, config);
  const [playType4] = useSound(`${root}/type_04.wav`, config);
  const [playType5] = useSound(`${root}/type_05.wav`, config);
  const [playSwipe1] = useSound(`${root}/swipe_01.wav`, config);
  const [playSwipe2] = useSound(`${root}/swipe_02.wav`, config);
  const [playSwipe3] = useSound(`${root}/swipe_03.wav`, config);
  const [playSwipe4] = useSound(`${root}/swipe_04.wav`, config);
  const [playSwipe5] = useSound(`${root}/swipe_05.wav`, config);
  const [playTap1] = useSound(`${root}/tap_01.wav`, config);
  const [playTap2] = useSound(`${root}/tap_02.wav`, config);
  const [playTap3] = useSound(`${root}/tap_03.wav`, config);
  const [playTap4] = useSound(`${root}/tap_04.wav`, config);
  const [playTap5] = useSound(`${root}/tap_05.wav`, config);

  const play = useCallback<SoundController["play"]>(
    (input: SoundKey | SoundKey[]) => {
      const keys = Array.isArray(input) ? input : [input];

      keys.forEach((key) => {
        switch (key) {
          case "button":
            playButton();
            break;
          case "caution":
            playCaution();
            break;
          case "celebration":
            playCelebration();
            break;
          case "disabled":
            playDisabled();
            break;
          case "notification":
            playNotification();
            break;
          case "progressLoop":
            playProgressLoop();
            break;
          case "ringtoneLoop":
            playRingtoneLoop();
            break;
          case "select":
            playSelect();
            break;
          case "swipe":
            playSwipe();
            break;
          case "toggleOff":
            playToggleOff();
            break;
          case "toggleOn":
            playToggleOn();
            break;
          case "transitionDown":
            playTransitionDown();
            break;
          case "transitionUp":
            playTransitionUp();
            break;
          case "typing": {
            const typePlayer = pickRandom([
              playType1,
              playType2,
              playType3,
              playType4,
              playType5,
            ]);
            typePlayer?.();
            break;
          }
          case "swipes": {
            const swipePlayer = pickRandom([
              playSwipe1,
              playSwipe2,
              playSwipe3,
              playSwipe4,
              playSwipe5,
            ]);
            swipePlayer?.();
            break;
          }
          case "taps": {
            const tapPlayer = pickRandom([
              playTap1,
              playTap2,
              playTap3,
              playTap4,
              playTap5,
            ]);
            tapPlayer?.();
            break;
          }
        }
      });
    },
    [
      playButton,
      playCaution,
      playCelebration,
      playDisabled,
      playNotification,
      playProgressLoop,
      playRingtoneLoop,
      playSelect,
      playSwipe,
      playToggleOff,
      playToggleOn,
      playTransitionDown,
      playTransitionUp,
      playType1,
      playType2,
      playType3,
      playType4,
      playType5,
      playSwipe1,
      playSwipe2,
      playSwipe3,
      playSwipe4,
      playSwipe5,
      playTap1,
      playTap2,
      playTap3,
      playTap4,
      playTap5,
    ],
  );

  return { play };
}
