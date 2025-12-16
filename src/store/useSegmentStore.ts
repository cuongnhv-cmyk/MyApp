import { create } from 'zustand';

type Segment = 'Round-trip' | 'One-way' | 'Multi-city';

type SegmentState = {
    active: Segment;
    setActive: (value: Segment) => void;
};

export const useSegmentStore = create<SegmentState>(set => ({
    active: 'Round-trip',
    setActive: value => set({ active: value }),
}));
