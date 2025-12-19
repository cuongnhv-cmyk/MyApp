import React, { useRef, useState } from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import Carousel, { ICarouselInstance } from 'react-native-reanimated-carousel';

interface Props {
    dataGroups: string[][]; // Array of 3 arrays: [['A1','B1'], ['A2','B2'], ['A3','B3']]
}

const SCREEN_WIDTH = Dimensions.get('window').width;
const CAROUSEL_WIDTH = (SCREEN_WIDTH - 80) / 3; // Adjusting for arrows/padding

const SyncedCarouselGroup = ({ dataGroups }: Props) => {
    const [activeIndex, setActiveIndex] = useState(0);

    // Refs to control the carousels
    const carouselRefs = [
        useRef<ICarouselInstance>(null),
        useRef<ICarouselInstance>(null),
        useRef<ICarouselInstance>(null),
    ];

    const handlePress = (direction: 'next' | 'prev') => {
        const newIndex =
            direction === 'next' ? activeIndex + 1 : activeIndex - 1;

        // Boundary check
        if (newIndex >= 0 && newIndex < dataGroups[0].length) {
            setActiveIndex(newIndex);
            // Loop through refs and animate them together
            carouselRefs.forEach(ref => {
                ref.current?.scrollTo({ index: newIndex, animated: true });
            });
        }
    };

    return (
        <View className="flex-row items-center justify-between bg-slate-100 p-4 rounded-2xl shadow-sm">
            {/* Left Arrow */}
            <TouchableOpacity
                onPress={() => handlePress('prev')}
                disabled={activeIndex === 0}
                className={`p-2 ${
                    activeIndex === 0 ? 'opacity-20' : 'opacity-100'
                }`}
            >
                <Text className="text-2xl font-bold text-blue-600">{'<'}</Text>
            </TouchableOpacity>

            {/* Synchronized Carousels Block */}
            <View className="flex-row flex-1 justify-center space-x-1">
                {dataGroups.map((group, i) => (
                    <View key={i} style={{ width: CAROUSEL_WIDTH }}>
                        <Carousel
                            ref={carouselRefs[i]}
                            width={CAROUSEL_WIDTH}
                            height={50}
                            data={group}
                            enabled={false} // Prevents users from swiping and desyncing
                            renderItem={({ item }) => (
                                <View className="flex-1 items-center justify-center bg-white border border-slate-200 rounded-lg mx-1">
                                    <Text className="text-lg font-semibold text-slate-800">
                                        {item}
                                    </Text>
                                </View>
                            )}
                        />
                    </View>
                ))}
            </View>

            {/* Right Arrow */}
            <TouchableOpacity
                onPress={() => handlePress('next')}
                disabled={activeIndex === dataGroups[0].length - 1}
                className={`p-2 ${
                    activeIndex === dataGroups[0].length - 1
                        ? 'opacity-20'
                        : 'opacity-100'
                }`}
            >
                <Text className="text-2xl font-bold text-blue-600">{'>'}</Text>
            </TouchableOpacity>
        </View>
    );
};

export default SyncedCarouselGroup;
