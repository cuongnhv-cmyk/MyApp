import React from 'react';
import { View, Text, Pressable } from 'react-native';

export default function HomeScreen({ navigation }: any) {
    return (
        <View className="flex-1 items-center justify-center">
            <Pressable
                onPress={() => navigation.navigate('My Flight')}
                className="bg-blue-500 px-6 py-3 rounded-xl"
            >
                <Text className="text-white text-lg">Go to Booking</Text>
            </Pressable>
        </View>
    );
}
