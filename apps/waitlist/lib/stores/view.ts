type View =
  | "card"
  | "edit-activity"
  | "edit-spotify"
  | "edit-item-one"
  | "edit-item-two"
  | "edit-quote";

import { create } from "zustand";
import { useSoundController } from "../sounds";

interface ViewState {
  view: View;
  setView: (view: View, playSound?: () => void) => void;
}

export const useViewStore = create<ViewState>()((set) => ({
  view: "card",
  setView: (view, playSound) => {
    if (playSound) {
      playSound();
    }
    set({ view });
  },
}));

export const useViewSwitcher = () => {
  const { view, setView } = useViewStore();
  const { play } = useSoundController();

  const setViewWithSound = (newView: View) => {
    setView(newView, () => play("transitionDown"));
  };

  return {
    view,
    setView: setViewWithSound,
  };
};
