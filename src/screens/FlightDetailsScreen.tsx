import { View, Text, Image } from 'react-native';
import { useFlightStore } from '@store/useFlightStore';
import { useDateStore } from '@store/useDateStore';
import { formatDateObject } from '@utils/DateFormatter';
import { SyncedCarouselGroup } from '@components/SyncedCarouselGroup';
import { ICON } from '@assets/icon/';

export default function FlightDetailsScreen() {
    const destination = useFlightStore(state => state.destination);
    const range = useDateStore(state => state.range);
    const startDate = formatDateObject(range.start);
    // 1. Define your data clearly
    const myData = [
        { date: 'Sun, 2 Nov' },
        { date: 'Mon, 3 Nov' },
        { date: 'Tue, 4 Nov' },
        { date: 'Wed, 5 Nov' },
        { date: 'Thu, 6 Nov' },
    ];

    // 2. Pass it to the 'data' prop (not dataGroups)
    <SyncedCarouselGroup data={myData} />;

    return (
        <View className="mt-6 flex-1 px-4">
            <Text className="mb-2 text-2xl">
                <Text>Clark </Text>
                <Text className="font-bold">CRK </Text>
                <Text>→ </Text>
                <Text>{destination?.name} </Text>
                <Text className="font-bold">{destination?.code}</Text>
            </Text>
            <Text className="text-xl">{startDate?.display}</Text>
            <View className="justify-center px-4">
                <SyncedCarouselGroup data={myData} />
            </View>
            <View className="flex-1 justify-center bg-[#FFFFFF] px-4">
                <View className="w-full flex-row items-center overflow-hidden rounded-lg border border-gray-300 bg-slate-50">
                    {/* Left Section */}
                    <View className="flex-[7] p-2">
                        {/* Departure Flight */}
                        <View className="flex-row items-center">
                            <Image
                                source={ICON.yellowAirplane}
                                className="mr-2 h-3 w-3"
                            />
                            <Text className="text-sm font-bold">
                                Cebu Pacific
                            </Text>
                        </View>

                        <View className="-mt-1 flex-row justify-between">
                            <View>
                                <Text className="text-lg">1:35 am</Text>
                                <Text className="-mt-2 text-lg text-[#80888D]">
                                    Singapore
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
                                <Text className="text-lg">5:35 am</Text>
                                <Text className="-mt-2 text-lg text-[#80888D]">
                                    Cebu
                                </Text>
                            </View>
                        </View>
                        {/* Return Flight */}
                        <View className="mt-1 flex-row items-center">
                            <Image
                                source={ICON.greenAirplane}
                                className="tint-[#009681] mr-2 h-3 w-3"
                            />
                            <Text className="text-sm font-bold">Cebgo</Text>
                        </View>

                        <View className="-mt-1 flex-row justify-between">
                            <View>
                                <Text className="text-lg">1:35 am</Text>
                                <Text className="-mt-2 text-lg text-[#80888D]">
                                    Cebu
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
                                2 seats left
                            </Text>
                        </View>
                    </View>
                    {/* Vertical Divider Line */}
                    <View className="h-[80%] w-[1px] bg-gray-300" />
                    {/* Right Section */}
                    <View className="flex-[3] items-center justify-center bg-slate-50">
                        <Text className="text-sm text-black">PHP</Text>
                        <Text className="text-lg text-black">15,055.00</Text>
                        <Text className="text-sm text-[#80888D]">
                            All in-fare/guest
                        </Text>
                        <View className="mt-2 items-center justify-center rounded-full border border-slate-200 bg-black px-2 py-1">
                            <Text className="text-xs text-white">
                                Discounted
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
}
