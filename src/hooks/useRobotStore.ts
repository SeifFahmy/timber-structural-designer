import { create } from "zustand";

interface RobotData {
    id: number;
    momentMajor: number;
    momentMinor: number;
    shearMajor: number;
    shearMinor: number;
    axial: number;
    length: number;
}

interface RobotState {
    robotData: RobotData[];
    updateRobotData: (data: RobotData[]) => void;
}

export const useRobotStore = create<RobotState>((set) => ({
    robotData: [],
    updateRobotData: (data) => set(() => ({ robotData: data })),
}));
