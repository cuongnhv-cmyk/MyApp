import { View, Pressable, Text, Image } from 'react-native';
import { useState } from 'react';
import { ICON } from '@assets/icon';

// Function Name
export const SeatRequirementInfo = () => {
    // State
    const [isExpanded, setIsExpanded] = useState(false);

    // Functions

    // Toggles the visibility of the safety requirement details
    const toggle = () => setIsExpanded(!isExpanded);

    // JSX
    return (
        <View className="my-1">
            {isExpanded && (
                <View className="my-3 pr-[30%]">
                    <Text className="text-base leading-5 text-black">
                        For safety reasons, a Federal Aviation Administration
                        (FAA) approved car seat or any Child Restraint System
                        (CRS) that confirms to all applicable Federal Motor
                        Vehicle Safety Standards (FMVSS) is required for infants
                        on a full-fare seat.
                    </Text>
                </View>
            )}

            <Pressable onPress={toggle} className="flex-row items-center">
                <Image source={ICON.information} className="h-6 w-6" />
                <Text className="ml-2 font-bold text-black underline">
                    {isExpanded ? 'Hide details' : 'Seat requirement'}
                </Text>
            </Pressable>
        </View>
    );
};
