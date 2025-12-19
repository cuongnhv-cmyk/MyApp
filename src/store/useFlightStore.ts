import { create } from 'zustand';

interface LocationState {
    destination: {
        name: string;
        code: string;
    } | null;
    setDestination: (name: string, code: string) => void;
    clearDestination: () => void;
}

export const useFlightStore = create<LocationState>(set => ({
    destination: null,

    setDestination: (name, code) => set({ destination: { name, code } }),

    clearDestination: () => set({ destination: null }),
}));
