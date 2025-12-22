import React, { useRef, useState, useMemo } from 'react';
import { View, Text, TouchableOpacity, Dimensions, Image } from 'react-native';
import Carousel, { ICarouselInstance } from 'react-native-reanimated-carousel';
import { ICON } from '@assets/icon';
import { useDateStore } from '@store/useDateStore';
import * as DateFormatter from '@utils/DateFormatter';

const SCREEN_WIDTH = Dimensions.get('window').width;

interface Props {
    onDateChange: (date: string) => void;
}
export const SyncedCarouselGroup = ({ onDateChange }: Props) => {
    const ref = useRef<ICarouselInstance>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    // Get range from Zustand
    const { range } = useDateStore();

    // Generate Carousel Data
    const carouselData = useMemo(() => {
        if (!range.start || !range.end) return [];

        // Explicitly type the result of the array
        const dates: Date[] = DateFormatter.getDaysArray(
            range.start,
            range.end,
        );

        return dates.map((date: Date) => {
            const formatted = DateFormatter.formatDateObject(date);
            return {
                id: date.toISOString().split('T')[0], // Use as key
                weekday: formatted?.weekday,
                day: formatted?.day,
                month: formatted?.month,
                display: formatted?.display, // "Mon, 27 Oct"
            };
        });
    }, [range.start, range.end]);

    if (carouselData.length === 0) return null;

    // Syncs active index and notifies parent when any snap occurs
    const handleSnap = (index: number) => {
        const selectedItem = carouselData[index];
        if (!selectedItem || !selectedItem.display) return;
        setActiveIndex(index);
        onDateChange(selectedItem.display);
    };

    // If using Absolute, we can make the CONTAINER wider (e.g., -40)
    const CONTAINER_WIDTH = SCREEN_WIDTH - 20;
    const ITEM_WIDTH = CONTAINER_WIDTH / 3;

    return (
        // Added 'relative' so the absolute arrows stay inside this box
        <View className="relative w-full flex-row items-center justify-center py-2">
            {/* 1. Left Arrow - Now Absolute */}
            <TouchableOpacity
                onPress={() => ref.current?.prev()}
                style={{ position: 'absolute', left: -24, zIndex: 50 }} // Change 'left' to move it
                className="h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-[#D9D9D9] shadow-sm"
            >
                <Image
                    source={ICON.carouselLeft}
                    className="h-4 w-4"
                    resizeMode="contain"
                />
            </TouchableOpacity>

            {/* 2. Carousel Wrapper */}
            <View style={{ width: CONTAINER_WIDTH, height: 80 }}>
                <Carousel
                    ref={ref}
                    width={ITEM_WIDTH}
                    height={80}
                    data={carouselData}
                    loop={false}
                    style={{ width: CONTAINER_WIDTH, justifyContent: 'center' }}
                    onSnapToItem={handleSnap}
                    renderItem={({ item, index }) => {
                        const isSelected = index === activeIndex;
                        return (
                            <View
                                style={{ width: ITEM_WIDTH, height: 80 }}
                                className="justify-center px-1"
                            >
                                <View
                                    className={`items-center justify-center rounded-lg border py-4 ${
                                        isSelected
                                            ? 'border-gray-300 bg-[#E4E9EB]'
                                            : 'border-gray-300 bg-[#F2F5F6]'
                                    }`}
                                >
                                    <Text
                                        className={`text-sm ${isSelected ? 'text-black' : 'text-gray-500'}`}
                                    >
                                        {item.weekday}, {item.day} {item.month}
                                    </Text>
                                    <View className="flex-row items-center justify-center">
                                        <Text className="mr-1 text-xs">
                                            PHP
                                        </Text>
                                        <Text className="text-small font-bold">
                                            8,000.00
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        );
                    }}
                />
            </View>

            {/* 3. Right Arrow - Now Absolute */}
            <TouchableOpacity
                onPress={() => ref.current?.next()}
                style={{ position: 'absolute', right: -24, zIndex: 50 }} // Change 'right' to move it
                className="h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-[#D9D9D9] shadow-sm"
            >
                <Image
                    source={ICON.carouselRight}
                    className="h-4 w-4"
                    resizeMode="contain"
                />
            </TouchableOpacity>
        </View>
    );
};
