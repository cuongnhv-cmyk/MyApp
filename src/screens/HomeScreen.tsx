import React from 'react';
import { View, Text, Pressable } from 'react-native';

export default function HomeScreen({ navigation }: any) {
    return (
        <View className="flex-1 items-center justify-center">
            <Pressable
                onPress={() => navigation.navigate('MyFlight')}
                className="bg-[#1C1C1E] px-6 py-3 rounded-lg"
            >
                <Text className="text-white text-lg font-bold">
                    ✈️ Go to Booking
                </Text>
            </Pressable>
        </View>
    );
}
