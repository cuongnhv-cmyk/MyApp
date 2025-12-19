export const formatDateObject = (dateInput?: string | Date | null) => {
    if (!dateInput) return null;

    const d = new Date(dateInput);

    if (isNaN(d.getTime())) return null;

    // Weekday (e.g., "Mon")
    const weekday = d.toLocaleDateString('en-US', { weekday: 'short' });

    // Day (e.g., "03")
    const dayNumber = d.getDate().toString().padStart(2, '0');

    // Month (e.g., "Nov")
    const monthName = d.toLocaleDateString('en-US', { month: 'short' });
    const month = monthName.charAt(0).toUpperCase() + monthName.slice(1);

    // Year (e.g., 2025)
    const year = d.getFullYear();

    return {
        weekday,
        day: dayNumber,
        month,
        year,
        fullMonth: `${dayNumber} ${month}`,
        display: `${weekday}, ${dayNumber} ${month}`,
    };
};
