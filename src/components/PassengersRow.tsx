import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { usePassengerStore } from '@store/usePassengerStore';

type PassengerType = 'adults' | 'child' | 'infantOnLap' | 'infantOnSeat';

interface Props {
    label: string;
    subLabel: string;
    type: PassengerType;
}

export const PassengerRow = ({ label, subLabel, type }: Props) => {
    const count = usePassengerStore(state => state.passengers[type]);
    const updateCount = usePassengerStore(state => state.updateCount);

    return (
        <View className="flex-row items-center justify-between py-5 border-b border-gray-50">
            {/* Labels - flex-1 prevents text from pushing buttons off-screen */}
            <View className="flex-1 pr-10">
                <Text className="text-xl font-bold text-gray-900">{label}</Text>
                <Text className="text-gray-500 text-base leading-5">
                    {subLabel}
                </Text>
            </View>

            {/* Stepper Group */}
            <View className="flex-row items-center space-x-4">
                {/* Minus Button */}
                <TouchableOpacity
                    onPress={() => updateCount(type, -1)}
                    disabled={count === 0}
                    // We swap bg-gray-100 for bg-gray-50 when disabled
                    className={`w-11 h-11 items-center justify-center rounded-xl ${
                        count === 0
                            ? 'bg-gray-50 opacity-50'
                            : 'bg-gray-100 active:bg-gray-200'
                    }`}
                >
                    <Text
                        className={`text-2xl font-semibold ${
                            count === 0 ? 'text-gray-400' : 'text-gray-800'
                        }`}
                    >
                        -
                    </Text>
                </TouchableOpacity>

                {/* Counter Value */}
                <View className="w-6 items-center">
                    <Text className="text-xl font-bold text-gray-800">
                        {count}
                    </Text>
                </View>

                {/* Plus Button */}
                <TouchableOpacity
                    onPress={() => updateCount(type, 1)}
                    className="w-11 h-11 items-center justify-center rounded-xl bg-gray-100 active:bg-gray-200"
                >
                    <Text className="text-2xl font-semibold text-gray-800">
                        +
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};
