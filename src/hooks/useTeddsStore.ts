import { create } from "zustand";

export interface TeddsData {
    MemberData: MemberData[];
    MaterialData: MaterialData;
}

export interface MemberData {
    id: number;
    section: string;
    result: string;
    designMessage: string;
    util: number;
    material: string;
    strength: string;
    outputHtml: string;
}

export interface MaterialData {
    Name: string;
    Type: string;
    E: number;
    G: number;
    UnitWeight: number;
}

interface TeddsState {
    teddsData: TeddsData;
    updateTeddsData: (data: TeddsData) => void;
}

export const useTeddsStore = create<TeddsState>((set) => ({
    teddsData: {} as TeddsData,
    updateTeddsData: (data) => set(() => ({ teddsData: data })),
}));
