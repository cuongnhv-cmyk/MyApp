import { create } from 'zustand';

// Define the valid keys
type PassengerType = 'adults' | 'child' | 'infantOnLap' | 'infantOnSeat';

interface PassengerState {
    passengers: Record<PassengerType, number>;
    updateCount: (type: PassengerType, delta: number) => void;
}

export const usePassengerStore = create<PassengerState>(set => ({
    passengers: {
        adults: 0,
        child: 0,
        infantOnLap: 0,
        infantOnSeat: 0,
    },
    updateCount: (type, delta) =>
        set(state => ({
            passengers: {
                ...state.passengers,
                [type]: Math.max(0, state.passengers[type] + delta),
            },
        })),
}));
