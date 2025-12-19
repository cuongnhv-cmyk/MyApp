import React from 'react';
import { View, Text, Pressable } from 'react-native';

// Types
interface Props {
    label: string;
    buttonLabel?: string;
    onContinue?: () => void;
    isDisabled?: boolean;
}

// Function Name
export const SummaryFooter = (props: Props) => {
    // Props
    const { label, buttonLabel, onContinue, isDisabled } = props;

    // JSX
    return (
        <View className="h-24 flex-row items-center justify-between border-t border-gray-200 bg-white px-6">
            <View>
                <Text className="pb-1 text-base text-black">{label}</Text>
            </View>

            <Pressable
                onPress={isDisabled ? undefined : onContinue}
                className={`${
                    isDisabled ? 'bg-gray-300' : 'bg-black'
                } rounded-full px-8 py-3 active:opacity-70`}
            >
                <Text
                    className={`${
                        isDisabled ? 'text-gray-500' : 'text-white'
                    } pb text-base font-bold`}
                >
                    {buttonLabel}
                </Text>
            </Pressable>
        </View>
    );
};
