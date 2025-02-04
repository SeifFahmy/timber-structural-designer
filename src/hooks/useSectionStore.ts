import { create } from "zustand";

interface SectionData {
    [key: string]: number[];
}

interface SectionState {
    sectionData: SectionData;
    updateSectionData: (data: SectionData) => void;
}

export const useRobotStore = create<SectionState>((set) => ({
    sectionData: {} as SectionData,
    updateSectionData: (data) => set(() => ({ sectionData: data })),
}));
