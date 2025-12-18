import { View, Pressable, Text, Image } from 'react-native';
import { useState } from 'react';
import { ICON } from '@assets/icon';

export const SeatRequirementInfo = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggle = () => setIsExpanded(!isExpanded);

    return (
        <View className="my-1">
            {isExpanded && (
                <View className="my-3 pr-[30%]">
                    <Text className="text-black text-base leading-5">
                        For safety reasons, a Federal Aviation Administration
                        (FAA) approved car seat or any Child Restraint System
                        (CRS) that confirms to all applicable Federal Motor
                        Vehicle Safety Standards (FMVSS) is required for infants
                        on a full-fare seat.
                    </Text>
                </View>
            )}
            <Pressable onPress={toggle} className="flex-row items-center">
                <Image source={ICON.information} className="w-6 h-6" />
                <Text className="text-black ml-2 font-bold underline">
                    {isExpanded ? 'Hide details' : 'Seat requirement'}
                </Text>
            </Pressable>
        </View>
    );
};
