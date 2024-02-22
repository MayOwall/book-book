import { create } from "zustand";
import type { ReactNode } from "react";
import type { useModalState } from "@/src/types";

export const useModalStore = create<useModalState>((set) => ({
  content: null,
  createModal: (nextContent: ReactNode) => set({ content: nextContent }),
  remoteModal: () => set({ content: null }),
}));
