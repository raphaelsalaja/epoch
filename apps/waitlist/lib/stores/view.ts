type View =
  | "card"
  | "edit-activity"
  | "edit-spotify"
  | "edit-item-one"
  | "edit-item-two"
  | "edit-quote";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ViewState {
  view: View;
  setView: (view: View) => void;
}

const initialView: View = "card";

export const useViewStore = create<ViewState>()(
  persist(
    (set) => ({
      view: initialView,
      setView: (view) => set({ view }),
    }),
    {
      name: "waitlist-view-store",
    },
  ),
);
