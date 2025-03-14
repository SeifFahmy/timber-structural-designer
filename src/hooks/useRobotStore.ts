import { create } from "zustand";

export interface RobotData {
    Id: number;
    MomentMajor: number;
    MomentMinor: number;
    ShearMajor: number;
    ShearMinor: number;
    Axial: number;
    IsAxialMember: boolean;
    Deflection: number;
    Area: number;
    SecondMomentOfArea: number;
    Length: number;
    MaterialE: number;
    MaterialG: number;
}

interface RobotState {
    robotData: RobotData[];
    updateRobotData: (data: RobotData[]) => void;
}

export const useRobotStore = create<RobotState>((set) => ({
    robotData: [],
    updateRobotData: (data) => set(() => ({ robotData: data })),
}));
