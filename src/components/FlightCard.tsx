// Imports
import React from 'react';
import { View, Text, Image, FlatList, ScrollView } from 'react-native';
import { ICON } from '@assets/icon';

// Types
interface FlightData {
    id: string;
    airline: string;
    departureTime: string;
    arrivalTime: string;
    origin: string;
    destination: string;
    price: string;
    seatsLeft: number;
}

// Function Name
export const FlightCard = ({ item }: { item: FlightData }) => {
    // JSX
    return (
        <View className="mb-4 w-full flex-row items-center overflow-hidden rounded-lg border border-gray-300 bg-[#F2F2F7]">
            {/* Left Section */}
            <View className="flex-[7] p-2">
                {/* Departure Flight */}
                <View className="flex-row items-center">
                    <Image
                        source={ICON.yellowAirplane}
                        className="mr-2 h-3 w-3"
                    />
                    <Text className="text-sm font-bold">{item.airline}</Text>
                </View>

                <View className="-mt-1 flex-row justify-between">
                    <View>
                        <Text className="text-lg">{item.departureTime}</Text>
                        <Text className="-mt-2 text-lg text-[#80888D]">
                            {item.origin}
                        </Text>
                    </View>
                    <View className="flex-row items-center">
                        <Text className="text-xs">........</Text>
                        <Image
                            source={ICON.yellowAirplane}
                            className="mx-1 mt-2 h-5 w-5"
                        />
                        <Text className="text-xs">........</Text>
                    </View>
                    <View>
                        <Text className="text-lg">{item.arrivalTime}</Text>
                        <Text className="-mt-2 text-lg text-[#80888D]">
                            {item.destination}
                        </Text>
                    </View>
                </View>

                {/* Return Flight */}
                <View className="mt-1 flex-row items-center">
                    <Image
                        source={ICON.greenAirplane}
                        className="mr-2 h-3 w-3"
                    />
                    <Text className="text-sm font-bold">Cebgo</Text>
                </View>

                <View className="-mt-1 flex-row justify-between">
                    <View>
                        <Text className="text-lg">1:35 am</Text>
                        <Text className="-mt-2 text-lg text-[#80888D]">
                            {item.destination}
                        </Text>
                    </View>
                    <View className="flex-row items-center">
                        <Text className="text-xs">........</Text>
                        <Image
                            source={ICON.greenAirplane}
                            className="mx-1 mt-2 h-5 w-5"
                        />
                        <Text className="text-xs">........</Text>
                    </View>
                    <View>
                        <Text className="text-lg">5:35 am</Text>
                        <Text className="-mt-2 text-lg text-[#80888D]">
                            Clark
                        </Text>
                    </View>
                </View>

                <View className="mt-1">
                    <Text className="text-xs text-[#80888D]">
                        5J 861 · 4h · 1 Stop: Cebu (1h 30m)
                    </Text>
                </View>

                <View className="mt-1 items-center justify-center self-start rounded-full border border-slate-200 bg-[#F2F5F6] px-4 py-1">
                    <Text className="text-xs text-black">
                        {item.seatsLeft} seats left
                    </Text>
                </View>
            </View>

            {/* Vertical Divider */}
            <View className="h-[80%] w-[1px] bg-gray-300" />

            {/* Right Section */}
            <View className="flex-[3] items-center justify-center bg-[#F2F2F7]">
                <Text className="text-sm text-black">PHP</Text>
                <Text className="text-lg text-black">{item.price}</Text>
                <Text className="text-center text-sm text-[#80888D]">
                    All in-fare/guest
                </Text>
                <View className="mt-2 items-center justify-center rounded-full border border-slate-200 bg-black px-2 py-1">
                    <Text className="text-xs text-white">Discounted</Text>
                </View>
            </View>
        </View>
    );
};
