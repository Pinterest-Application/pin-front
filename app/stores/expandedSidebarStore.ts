import { create } from 'zustand';

type SidebarType = 'notification' | 'messages';

interface ExpandedSidebarState {
  isOpen: boolean;
  type: SidebarType;
  setIsOpen: (isOpen: boolean) => void;
  setType: (type: SidebarType) => void;
}

export const useExpandedSidebarStore = create<ExpandedSidebarState>()((set) => ({
  isOpen: false,
  type: 'notification',
  setIsOpen: (isOpen) => set(() => ({ isOpen })),
  setType: (type) => set(() => ({ type })),
}));
