"use client";

import { create } from "zustand";
import P5 from "./p5";

// Zustand Store の定義
export const useP5Store = create<{
  showP5: boolean;
  showConnections: boolean;
  setShowP5: (show: boolean) => void;
  setShowConnections: (show: boolean) => void;
}>((set) => ({
  showP5: false,
  showConnections: false,
  setShowP5: (show) => set({ showP5: show }),
  setShowConnections: (show) => set({ showConnections: show }),
}));

// Container Component
const P5Container = () => {
  const { showP5, showConnections } = useP5Store();

  if (!showP5) {
    return null;
  }

  // showP5 が true なら P5 を表示
  // showConnections を props で渡す)
  return <P5 showConnections={showConnections} />;
};

export default P5Container;
