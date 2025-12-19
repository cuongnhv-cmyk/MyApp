import { View, Text } from 'react-native';
import { useFlightStore } from '@store/useFlightStore';
import { useDateStore } from '@store/useDateStore';
import { formatDateObject } from '@utils/DateFormatter';
import { SyncedCarouselGroup } from '@components/SyncedCarouselGroup';

export default function FlightDetailsScreen() {
    const destination = useFlightStore(state => state.destination);
    const range = useDateStore(state => state.range);
    const startDate = formatDateObject(range.start);
    // 1. Define your data clearly
    const myData = [
        { date: 'Sun, 2 Nov' },
        { date: 'Mon, 3 Nov' },
        { date: 'Tue, 4 Nov' },
        { date: 'Wed, 5 Nov' },
        { date: 'Thu, 6 Nov' },
    ];

    // 2. Pass it to the 'data' prop (not dataGroups)
    <SyncedCarouselGroup data={myData} />;

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
            <View className="justify-center p-4">
                <SyncedCarouselGroup data={myData} />
            </View>
        </View>
    );
}
