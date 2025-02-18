import { create } from "zustand";
import ReactPlayer from "react-player";
import { createRef, RefObject } from "react";

interface PlayerStore {
  playerRef: RefObject<ReactPlayer | null>;
  isPlaying: boolean;
  currentTime:number;
  setPlayerRef: (ref: RefObject<ReactPlayer | null>) => void;
  setIsPlaying: (isPlaying: boolean) => void;
  setCurrentTime: (time: number) => void;
}

export const usePlayerStore = create<PlayerStore>((set) => ({
  playerRef: createRef<ReactPlayer>(),
  isPlaying: false,
  currentTime:0,
  setPlayerRef: (ref) => set({ playerRef: ref }),
  setIsPlaying: (isPlaying) => set({ isPlaying }),
  setCurrentTime: (time) => set({ currentTime: time }),
}));
