import { create } from "zustand";

interface NavbarState {
    latestRoute: number;
    updateLatestRoute: (routeNumber: number) => void;
}

export const useNavbarStore = create<NavbarState>((set) => ({
    latestRoute: 1,
    updateLatestRoute: (route) => set(() => ({ latestRoute: route })),
}));
