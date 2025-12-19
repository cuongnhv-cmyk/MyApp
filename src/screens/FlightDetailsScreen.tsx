import { View, Text } from 'react-native';
import { useFlightStore } from '@store/useFlightStore';
import { useDateStore } from '@store/useDateStore';
import { formatDateObject } from '@utils/DateFormatter';
import SyncedCarouselGroup from '@components/SyncedCarouselGroup';

export default function FlightDetailsScreen() {
    const destination = useFlightStore(state => state.destination);
    const range = useDateStore(state => state.range);
    const startDate = formatDateObject(range.start);
    const myData = [
        ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'], // Carousel 1
        ['1st', '2nd', '3rd', '4th', '5th'], // Carousel 2
        ['Jan', 'Feb', 'Mar', 'Apr', 'May'], // Carousel 3
    ];

    return (
        <View className="px-4 mt-6 flex-1">
            <Text className="text-2xl mb-2">
                <Text>Clark </Text>
                <Text className="font-bold">CRK </Text>
                <Text>→ </Text>
                <Text>{destination?.name} </Text>
                <Text className="font-bold">{destination?.code}</Text>
            </Text>
            <Text className="text-xl">{startDate?.display}</Text>
            <View className="flex-1 justify-center p-4">
                <SyncedCarouselGroup dataGroups={myData} />
            </View>
        </View>
    );
}
