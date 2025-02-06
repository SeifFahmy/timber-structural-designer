import { create } from "zustand";

export interface RobotData {
    Id: number;
    MomentMajor: number;
    MomentMinor: number;
    ShearMajor: number;
    ShearMinor: number;
    Axial: number;
    IsAxialMember: boolean;
}

interface RobotState {
    robotData: RobotData[];
    updateRobotData: (data: RobotData[]) => void;
}

export const useRobotStore = create<RobotState>((set) => ({
    robotData: [],
    updateRobotData: (data) => set(() => ({ robotData: data })),
}));
