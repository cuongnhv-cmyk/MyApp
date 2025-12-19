import React from 'react';
import { View, Text, Image } from 'react-native';
import { useFlightStore } from '@store/useFlightStore';
import { useDateStore } from '@store/useDateStore';
import { ICON } from '@assets/icon';
import { usePassengerStore } from '@store/usePassengerStore';
import { formatDateObject } from '@utils/DateFormatter';
import { formatPassengerData } from '@utils/PassengerFormatter';

// Function Name
export const FlightDetailsHeader = () => {
    // Hooks
    const destination = useFlightStore(state => state.destination);
    const range = useDateStore(state => state.range);
    const passengerData = usePassengerStore(state => state.passengers);

    // Functions

    // Formats the selected date range into a readable string for the header
    const startDate = formatDateObject(range.start);
    const endDate = formatDateObject(range.end);
    const dateDisplay = startDate
        ? `${startDate.day} ${startDate.month}${
              endDate ? ` - ${endDate.day} ${endDate.month}` : ''
          } ${startDate.year}`
        : 'Select Date';

    // Generates formatting options for passenger display
    const passengerInfo = formatPassengerData(passengerData);

    // JSX
    return (
        <View className="items-center justify-center">
            <View className="flex-row items-center">
                <Text className="text-lg font-bold text-black">CRK</Text>
                <Image source={ICON.flightRoundTrip} className="mx-2 h-4 w-4" />
                <Text className="text-lg font-bold text-black">
                    {destination?.code || '---'}
                </Text>
            </View>

            <View className="flex-row items-center px-4">
                <Text
                    numberOfLines={1}
                    className="text-[10px] font-medium text-gray-500"
                >
                    {dateDisplay} •{' '}
                    {passengerInfo.detailString || 'No passengers'}
                </Text>
            </View>
        </View>
    );
};
