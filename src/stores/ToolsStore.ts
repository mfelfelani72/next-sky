/**
 * @Author: Mohammad Felfelani
 * @Email: mfelfelani72@gmail.com
 * @Team:
 * @Date: 2025-12-24 07:04:44
 * @Description: Tools Store - Zustand
 */

import { create } from "zustand";
import { ReactNode } from "react";

type DrawerLocation = "bottom" | "top" | "left" | "right";

interface ToolsStoreState {
  // Drawer
  drawerContent: ReactNode | null;
  drawerLocation: DrawerLocation;
  drawerClassName: string;
  drawerKey: number;
  setDrawerContent: (content: ReactNode | null) => void;
  setDrawerLocation: (location: DrawerLocation) => void;
  setDrawerClassName: (className: string) => void;
  resetDrawer: () => void;

  // Modal
  modalContent: ReactNode | null;
  modalClassName: string;
  modalKey: number;
  setModalContent: (content: ReactNode | null) => void;
  setModalClassName: (className: string) => void;
  resetModal: () => void;

  // Up Button
  upButtonFunction: () => void;
  setUpButtonFunction: (fn: () => void) => void;
  resetUpButtonFunction: () => void;
}

export const useToolsStore = create<ToolsStoreState>((set) => ({
  // Drawer - State
  drawerContent: null,
  drawerLocation: "right",
  drawerClassName: "",
  drawerKey: 0,

  // Drawer - Actions
  setDrawerContent: (content) => 
    set((state) => ({ 
      drawerContent: content, 
      drawerKey: state.drawerKey + 1 // برای رندر مجدد
    })),
  
  setDrawerLocation: (location) => set({ drawerLocation: location }),
  
  setDrawerClassName: (className) =>
    set({
      drawerClassName: `pointer-events-auto ${className}`,
    }),
  
  resetDrawer: () =>
    set({
      drawerContent: null,
      drawerLocation: "right",
      drawerClassName: "",
    }),

  // Modal - State
  modalContent: null,
  modalClassName: "max-w-md pointer-events-auto",
  modalKey: 0,

  // Modal - Actions
  setModalContent: (content) =>
    set((state) => ({
      modalContent: content,
      modalKey: state.modalKey + 1,
    })),
  
  setModalClassName: (className) => set({ modalClassName: className }),
  
  resetModal: () =>
    set({
      modalContent: null,
      modalClassName: "max-w-md pointer-events-auto",
    }),

  // Up Button - State
  upButtonFunction: () => {},
  
  // Up Button - Actions
  setUpButtonFunction: (fn) => set({ upButtonFunction: fn }),
  
  resetUpButtonFunction: () => set({ upButtonFunction: () => {} }),
}));