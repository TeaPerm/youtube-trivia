import { create } from "zustand";
import { VideoResponse } from "@/lib/types";

interface GameState {
  currentView: "landing" | "game" | "gameover";
  score: number;
  youtuber: string;
  videos: VideoResponse[];
  currentIndex: number;
  setVideos: (videos: VideoResponse[]) => void;
  setScore: (score: number) => void;
  setYoutuber: (username: string) => void;
  startGame: () => void;
  // endGame: (finalScore: number) => void;
  backToMenu: () => void;
  nextVideo: () => void;
}

export const useGame = create<GameState>((set) => ({
  currentView: "landing",
  youtuber: "",
  score: 0,
  videos: [],
  currentIndex: 0,
  setVideos: (videos: VideoResponse[]) => set({ videos, currentIndex: 0 }),
  setYoutuber: (username: string) => set({ youtuber: username }),
  setScore: (score: number) => set({ score }),
  startGame: () => set({ currentView: "game", score: 0, currentIndex: 0 }),
  // endGame: () => set({ currentView: "gameover" }),
  backToMenu: () => set({ currentView: "landing" }),
  nextVideo: () => set((state) => ({ currentIndex: state.currentIndex + 1 })),
}));
