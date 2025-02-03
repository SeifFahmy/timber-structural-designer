import { create } from "zustand";

export interface TeddsData {
    id: number;
    width: number;
    depth: number;
    result: number;
    designMessage: string;
    util: number;
    material: string;
    strength: string;
    outputRtf: string;
}

interface TeddsState {
    teddsData: TeddsData[];
    updateTeddsData: (data: TeddsData[]) => void;
}

export const useTeddsStore = create<TeddsState>((set) => ({
    teddsData: [],
    updateTeddsData: (data) => set(() => ({ teddsData: data })),
}));
