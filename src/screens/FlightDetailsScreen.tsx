import { View, Text, Image, FlatList } from 'react-native';
import { useFlightStore } from '@store/useFlightStore';
import { useDateStore } from '@store/useDateStore';
import { formatDateObject } from '@utils/DateFormatter';
import { SyncedCarouselGroup } from '@components/SyncedCarouselGroup';
import { ICON } from '@assets/icon/';
import { FlightCard } from '@components/FlightCard';
import { useState } from 'react';
import { useMemo } from 'react';

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

export default function FlightDetailsScreen() {
    const destination = useFlightStore(state => state.destination);
    const range = useDateStore(state => state.range);
    const startDate = formatDateObject(range.start);

    const initialDate = formatDateObject(range.start);

    // State
    const [selectedDate, setSelectedDate] = useState(
        initialDate?.display || '',
    );

    // Hooks (useMemo)
    const filteredFlights = useMemo(() => {
        return Array(5)
            .fill(null)
            .map((_, index) => ({
                id: `${selectedDate}-${index}`,
                // This replaces the Airline name with the date from the carousel
                airline: `Flight for ${selectedDate}`,
                departureTime: '1:35 am',
                arrivalTime: '5:35 am',
                origin: 'Singapore',
                destination: 'Cebu',
                // Making the price change slightly so it feels like a new search
                price: (15055 + index * 100).toLocaleString(),
                seatsLeft: index + 2,
            }));
    }, [selectedDate]);

    // Functions

    // Updates the state which triggers the useMemo and FlatList reload
    const handleDateChange = (date: string) => {
        setSelectedDate(date);
    };

    return (
        <View className="mt-6 flex-1 px-4">
            <Text className="mb-2 text-2xl">
                <Text>Clark </Text>
                <Text className="font-bold">CRK </Text>
                <Text>→ </Text>
                <Text>{destination?.name} </Text>
                <Text className="font-bold">{destination?.code}</Text>
            </Text>
            <Text className="text-xl">{startDate?.display}</Text>
            <View className="justify-center px-4">
                <SyncedCarouselGroup onDateChange={handleDateChange} />
            </View>
            <View className="flex-1 justify-center rounded-lg bg-[#FFFFFF] p-4">
                {/* Flight List */}
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
