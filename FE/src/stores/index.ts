import { create } from "zustand";
import type { ReactNode } from "react";

interface useModalState {
  content: null | ReactNode;
  createModal: (nextContent: ReactNode) => void;
  remoteModal: () => void;
}

export const useModalStore = create<useModalState>((set) => ({
  content: null,
  createModal: (nextContent: ReactNode) => set({ content: nextContent }),
  remoteModal: () => set({ content: null }),
}));
