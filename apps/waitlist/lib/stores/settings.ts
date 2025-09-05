import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SettingsState {
  isMuted: boolean;
  toggleMute: () => void;
  setMuted: (muted: boolean) => void;
}

export const useSettings = create<SettingsState>()(
  persist(
    (set) => ({
      isMuted: false,

      toggleMute: () => {
        set((state) => ({ isMuted: !state.isMuted }));
      },

      setMuted: (muted: boolean) => {
        set({ isMuted: muted });
      },
    }),
    {
      name: "epoch-settings",
    },
  ),
);
