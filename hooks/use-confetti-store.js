import { create } from 'zustand';

export const useConfettiStore = create((set) => ({
    isOpen: false,
    open: () => set({ isOpen: true }),
    close: () => set({ isOpen: false }),
}));