import React from 'react';
import { View, Text, Image } from 'react-native';
import { useFlightStore } from '@store/useFlightStore';
import { useDateStore } from '@store/useDateStore';
import { ICON } from '@assets/icon';
import { usePassengerStore } from '@store/usePassengerStore';
import { formatDateObject } from '@utils/DateFormatter';

export const FlightDetailsHeader = () => {
    const destination = useFlightStore(state => state.destination);
    const range = useDateStore(state => state.range);
    const passengerData = usePassengerStore(state => state.passengers);

    const startDate = formatDateObject(range.start);
    const endDate = formatDateObject(range.end);
    const dateDisplay = startDate
        ? `${startDate.day} ${startDate.month}${
              endDate ? ` - ${endDate.day} ${endDate.month}` : ''
          } ${startDate.year}`
        : 'Select Date';

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
