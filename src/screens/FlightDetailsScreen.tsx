import { View, Text } from 'react-native';
import { useFlightStore } from '@store/useFlightStore';
import { useDateStore } from '@store/useDateStore';
import { formatDateObject } from '@utils/DateFormatter';

export default function FlightDetailsScreen() {
    const destination = useFlightStore(state => state.destination);
    const range = useDateStore(state => state.range);
    const startDate = formatDateObject(range.start);

    return (
        <View className="px-4 mt-6 flex-1">
            <Text className="text-2xl">
                <Text>Clark </Text>
                <Text className="font-bold">CRK </Text>
                <Text>→ </Text>
                <Text>{destination?.name} </Text>
                <Text className="font-bold">{destination?.code}</Text>
            </Text>
            <Text className="text-xl">{startDate?.display}</Text>
        </View>
    );
}
