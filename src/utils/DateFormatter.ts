// DateFormatter.ts

export const getDaysArray = (startStr: string, endStr: string): Date[] => {
    const start = new Date(startStr);
    const end = new Date(endStr);
    const arr: Date[] = [];

    // Use a separate variable to iterate to avoid mutating inputs
    let dt = new Date(start);
    while (dt <= end) {
        arr.push(new Date(dt));
        dt.setDate(dt.getDate() + 1);
    }
    return arr;
};

export const formatDateObject = (dateInput?: string | Date | null) => {
    if (!dateInput) return null;
    const d = new Date(dateInput);
    if (isNaN(d.getTime())) return null;

    const weekday = d.toLocaleDateString('en-US', { weekday: 'short' });
    const dayNumber = d.getDate().toString().padStart(2, '0');
    const monthName = d.toLocaleDateString('en-US', { month: 'short' });
    const year = d.getFullYear();

    return {
        weekday,
        day: dayNumber,
        month: monthName,
        year,
        fullMonth: `${dayNumber} ${monthName}`,
        display: `${weekday}, ${dayNumber} ${monthName}`,
    };
};
