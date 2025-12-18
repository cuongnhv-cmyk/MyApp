import React from 'react';
import { View, Text, Pressable } from 'react-native';
interface Props {
    label: string;
    buttonLabel?: string;
    onContinue?: () => void;
    isDisabled?: boolean;
}

export const SummaryFooter = ({
    label,
    buttonLabel,
    onContinue,
    isDisabled,
}: Props) => {
    return (
        <View className="flex-row h-24 items-center justify-between px-6 bg-white border-t border-gray-200">
            <View>
                <Text className="text-black text-base pb-1">{label}</Text>
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
                    {buttonLabel}
                </Text>
            </Pressable>
        </View>
    );
};
