import React from 'react';
import { View, Text, Pressable } from 'react-native';

export default function HomeScreen({ navigation }: any) {
    return (
        <View className="flex-1 items-center justify-center">
            <Pressable
                onPress={() => navigation.navigate('MyFlight')}
                className="rounded-lg bg-[#1C1C1E] px-6 py-3"
            >
                <Text className="text-lg font-bold text-white">
                    ✈️ Go to Booking
                </Text>
            </Pressable>
        </View>
    );
}
