import React, { useRef, useState } from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import Carousel, { ICarouselInstance } from 'react-native-reanimated-carousel';

const SCREEN_WIDTH = Dimensions.get('window').width;
// Adjust this value so the arrows have enough room on the sides
const CONTAINER_WIDTH = SCREEN_WIDTH - 60;
const ITEM_WIDTH = CONTAINER_WIDTH / 3;

export const SyncedCarouselGroup = ({ data }: { data: any[] }) => {
    const ref = useRef<ICarouselInstance>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <View className="w-full flex-row items-center justify-center bg-white px-2">
            {/* 1. Left Arrow */}
            <TouchableOpacity
                onPress={() => ref.current?.prev()}
                className="z-10 p-2"
            >
                <Text className="text-xl font-bold text-blue-500">{'<'}</Text>
            </TouchableOpacity>

            {/* 2. Carousel Wrapper */}
            <View style={{ width: CONTAINER_WIDTH, height: 80 }}>
                <Carousel
                    ref={ref}
                    // IMPORTANT: width here is the width of a SINGLE item
                    width={ITEM_WIDTH}
                    height={80}
                    data={data}
                    loop={false}
                    // This allows items to be seen outside the 'active' slot
                    style={{ width: CONTAINER_WIDTH, justifyContent: 'center' }}
                    // windowSize={3} ensures at least 3 items are kept in memory
                    windowSize={3}
                    onSnapToItem={index => setActiveIndex(index)}
                    renderItem={({ item, index }) => {
                        const isSelected = index === activeIndex;
                        return (
                            <View
                                style={{ width: ITEM_WIDTH, height: 80 }}
                                className="px-1"
                            >
                                <View
                                    className={`flex-1 items-center justify-center rounded-xl border ${
                                        isSelected
                                            ? 'border-gray-300 bg-gray-200'
                                            : 'border-transparent bg-white'
                                    }`}
                                >
                                    <Text
                                        className={
                                            isSelected
                                                ? 'text-black'
                                                : 'text-gray-400'
                                        }
                                    >
                                        {item.date}
                                    </Text>
                                    <Text className="text-[10px]">
                                        placeholder
                                    </Text>
                                </View>
                            </View>
                        );
                    }}
                />
            </View>

            {/* 3. Right Arrow */}
            <TouchableOpacity
                onPress={() => ref.current?.next()}
                className="z-10 p-2"
            >
                <Text className="text-xl font-bold text-blue-500">{'>'}</Text>
            </TouchableOpacity>
        </View>
    );
};
