import React from 'react';
import { View, Text, Image } from 'react-native';
import { useFlightStore } from '@store/useFlightStore';
import { useDateStore } from '@store/useDateStore';
import { ICON } from '@assets/icon';
import { usePassengerStore } from '@store/usePassengerStore';

export const FlightDetailsHeader = () => {
    const destination = useFlightStore(state => state.destination);
    const range = useDateStore(state => state.range);
    const passengerData = usePassengerStore(state => state.passengers);

    // Passenger Display Logic
    const getPassengerLabel = (type: string, count: number) => {
        const labels: Record<string, { s: string; p: string }> = {
            adults: { s: 'Adult', p: 'Adults' },
            child: { s: 'Child', p: 'Children' },
            infantOnLap: { s: 'Infant (Lap)', p: 'Infants (Lap)' },
            infantOnSeat: { s: 'Infant (Seat)', p: 'Infants (Seat)' },
        };
        const labelObj = labels[type];
        return `${count} ${count > 1 ? labelObj.p : labelObj.s}`;
    };

    const passengerDisplay = Object.entries(passengerData)
        .filter(([_, count]) => count > 0) // Only show categories > 0
        .map(([type, count]) => getPassengerLabel(type, count))
        .join(', ');

    // Date Formatting Logic
    const formatDate = (dateString: string | undefined) => {
        if (!dateString) return null;
        const d = new Date(dateString);
        const day = d.getDate().toString().padStart(2, '0');
        // Force Capitalization
        const m = d.toLocaleDateString('en-US', { month: 'short' });
        const month = m.charAt(0).toUpperCase() + m.slice(1);
        const year = d.getFullYear();
        return { label: `${day} ${month}`, year };
    };

    const start = formatDate(range.start || undefined);
    const end = formatDate(range.end || undefined);

    const dateDisplay = start
        ? end
            ? `${start.label} - ${end.label} ${end.year}`
            : `${start.label} ${start.year}`
        : 'Select date';

    return (
        <View className="items-center justify-center">
            <View className="flex-row items-center">
                <Text className="text-lg font-bold text-black">CRK</Text>
                <Image source={ICON.flightRoundTrip} className="w-4 h-4 mx-2" />
                <Text className="text-lg font-bold text-black">
                    {destination?.code || '---'}
                </Text>
            </View>

            <View className="flex-row items-center px-4">
                <Text
                    numberOfLines={1}
                    className="text-[10px] text-gray-500 font-medium"
                >
                    {dateDisplay} • {passengerDisplay || 'No passengers'}
                </Text>
            </View>
        </View>
    );
};
