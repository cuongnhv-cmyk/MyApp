import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { useDateStore } from '../store/useDateStore';
import moment from 'moment';

interface Props {
    onContinue: () => void;
    isDisabled: boolean;
}

export const SummaryFooter = ({ onContinue, isDisabled }: Props) => {
    const { range } = useDateStore();

    const getDurationText = () => {
        if (range.start && range.end) {
            const days =
                moment(range.end).diff(moment(range.start), 'days') + 1;
            return `Round-trips: ${days} days`;
        }
        return 'Select dates';
    };

    return (
        <View className="flex-row h-24 items-center justify-between px-6 bg-white border-t border-gray-200">
            <View>
                <Text className="text-black text-base pb-1">
                    {getDurationText()}
                </Text>
            </View>

            <Pressable
                // Prevent action if disabled
                onPress={isDisabled ? undefined : onContinue}
                // Change background color to gray if disabled
                className={`${
                    isDisabled ? 'bg-gray-300' : 'bg-black'
                } px-8 py-3 rounded-full active:opacity-70`}
            >
                <Text
                    className={`${
                        isDisabled ? 'text-gray-500' : 'text-white'
                    } font-bold text-base pb`}
                >
                    Continue
                </Text>
            </Pressable>
        </View>
    );
};
