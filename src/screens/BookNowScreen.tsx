import { View, Text, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export function BookNowScreen() {
    const navigation = useNavigation();

    return (
        <View className="flex-1 bg-white pt-12 px-4">
            {/* Close button */}
            <Pressable
                onPress={() => navigation.goBack()}
                className="absolute top-12 left-4 z-10"
            >
                <Text className="text-2xl">✕</Text>
            </Pressable>

            {/* Content */}
            <Text className="text-2xl font-bold mt-8">Book your flight</Text>
        </View>
    );
}
