import { create } from "zustand";

enum State {
  Idle = "idle",
  Loading = "loading",
  Success = "success",
}

interface ButtonState {
  displayState: State;
  setActualState: (state: State) => void;
  timeoutId: NodeJS.Timeout | null;
}

export const useButtonState = create<ButtonState>((set, get) => ({
  displayState: State.Idle,
  timeoutId: null,

  setActualState: (newState: State) => {
    const { timeoutId } = get();

    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    if (newState === State.Loading) {
      set({ displayState: newState });
      return;
    }

    const newTimeoutId = setTimeout(() => {
      set({ displayState: newState, timeoutId: null });
    }, 1000);

    set({ timeoutId: newTimeoutId });
  },
}));

export { State };
