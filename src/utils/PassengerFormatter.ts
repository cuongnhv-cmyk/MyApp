// utils/PassengerFormatter.ts

export const formatPassengerData = (passengers: Record<string, number>) => {
    const total = Object.values(passengers).reduce(
        (sum, count) => sum + count,
        0,
    );

    if (total === 0) {
        return {
            total: 0,
            summary: 'No passengers selected',
            details: [],
        };
    }

    const labels: Record<string, { s: string; p: string }> = {
        adults: { s: 'Adult', p: 'Adults' },
        child: { s: 'Child', p: 'Children' },
        infantOnLap: { s: 'Infant (Lap)', p: 'Infants (Lap)' },
        infantOnSeat: { s: 'Infant (Seat)', p: 'Infants (Seat)' },
    };

    // Create an array of formatted strings like ["1 Adult", "2 Children"]
    const details = Object.entries(passengers)
        .filter(([_, count]) => count > 0)
        .map(([type, count]) => {
            const labelObj = labels[type];
            const label = count > 1 ? labelObj.p : labelObj.s;
            return `${count} ${label}`;
        });

    return {
        total,
        // Example: "2 passengers selected"
        summary: `${total} ${total === 1 ? 'passenger' : 'passengers'} selected`,
        // Example: "1 Adult, 2 Children"
        detailString: details.join(', '),
        details, // The raw array if you need to map over it in JSX
    };
};
