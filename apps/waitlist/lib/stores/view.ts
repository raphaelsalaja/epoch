type View =
  | "card"
  | "edit-activity"
  | "edit-spotify"
  | "edit-item-one"
  | "edit-item-two"
  | "edit-quote";

import { create } from "zustand";

interface ViewState {
  view: View;
  setView: (view: View) => void;
}

export const useViewStore = create<ViewState>()((set) => ({
  view: "card",
  setView: (view) => set({ view }),
}));
