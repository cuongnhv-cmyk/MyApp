import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { usePassengerStore } from '@store/usePassengerStore';

// Types
type PassengerType = 'adults' | 'child' | 'infantOnLap' | 'infantOnSeat';

interface Props {
    label: string;
    subLabel: string;
    type: PassengerType;
}

// Function Name
export const PassengerRow = (props: Props) => {
    // Props
    const { label, subLabel, type } = props;

    // Hooks
    const count = usePassengerStore(state => state.passengers[type]);
    const updateCount = usePassengerStore(state => state.updateCount);

    // JSX
    return (
        <View className="flex-row items-center justify-between border-b border-gray-50 py-5">
            <View className="flex-1 pr-10">
                <Text className="text-xl font-bold text-gray-900">{label}</Text>
                <Text className="text-base leading-5 text-gray-500">
                    {subLabel}
                </Text>
            </View>

            <View className="flex-row items-center space-x-4">
                <TouchableOpacity
                    onPress={() => updateCount(type, -1)}
                    disabled={count === 0}
                    className={`h-11 w-11 items-center justify-center rounded-xl ${
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

                <View className="w-6 items-center">
                    <Text className="text-xl font-bold text-gray-800">
                        {count}
                    </Text>
                </View>

                <TouchableOpacity
                    onPress={() => updateCount(type, 1)}
                    className="h-11 w-11 items-center justify-center rounded-xl bg-gray-100 active:bg-gray-200"
                >
                    <Text className="text-2xl font-semibold text-gray-800">
                        +
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};
