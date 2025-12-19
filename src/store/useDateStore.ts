import { create } from 'zustand';

interface DateRange {
    start: string | null;
    end: string | null;
}

interface DateStore {
    range: DateRange;
    setRange: (start: string | null, end: string | null) => void;
    clearRange: () => void;
}

export const useDateStore = create<DateStore>(set => ({
    range: { start: null, end: null },
    setRange: (start, end) => set({ range: { start, end } }),
    clearRange: () => set({ range: { start: null, end: null } }),
}));
