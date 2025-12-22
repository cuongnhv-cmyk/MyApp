// Imports
import React, { useState, useMemo } from 'react';
import { View, Text, FlatList } from 'react-native';
import { useFlightStore } from '@store/useFlightStore';
import { useDateStore } from '@store/useDateStore';
import { formatDateObject } from '@utils/DateFormatter';
import { SyncedCarouselGroup } from '@components/SyncedCarouselGroup';
import { FlightCard } from '@components/FlightCard';

// Types
interface FlightData {
    id: string;
    airline: string;
    departureTime: string;
    arrivalTime: string;
    origin: string;
    destination: string;
    price: string;
    seatsLeft: number;
}

// Function Name
export default function FlightDetailsScreen() {
    // State
    const destination = useFlightStore(state => state.destination);
    const range = useDateStore(state => state.range);
    const initialDate = formatDateObject(range.start);
    const [selectedDate, setSelectedDate] = useState(
        initialDate?.display || '',
    );

    // Hooks
    const filteredFlights = useMemo(() => {
        return Array(5)
            .fill(null)
            .map((_, index) => ({
                id: `${selectedDate}-${index}`,
                airline: `Flight for ${selectedDate}`,
                departureTime: '1:35 am',
                arrivalTime: '5:35 am',
                origin: 'Singapore',
                destination: 'Cebu',
                price: (15055 + index * 100).toLocaleString(),
                seatsLeft: index + 2,
            }));
    }, [selectedDate]);

    // Functions
    // Updates the local date state to trigger data re-calculation
    const handleDateChange = (date: string) => {
        setSelectedDate(date);
    };

    // JSX
    return (
        <View className="mt-6 flex-1 px-4">
            <Text className="mb-2 text-2xl">
                <Text>Clark </Text>
                <Text className="font-bold">CRK </Text>
                <Text>→ </Text>
                <Text>{destination?.name} </Text>
                <Text className="font-bold">{destination?.code}</Text>
            </Text>

            <Text className="text-xl">{selectedDate}</Text>

            <View className="justify-center px-4">
                <SyncedCarouselGroup onDateChange={handleDateChange} />
            </View>

            <View className="flex-1 justify-center rounded-lg bg-[#FFFFFF] p-4">
                <FlatList
                    data={filteredFlights}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => <FlightCard item={item} />}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 20 }}
                />
            </View>
        </View>
    );
}
