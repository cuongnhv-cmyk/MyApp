import { useNavigation } from '@react-navigation/native';
import { View, Text, Image, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ICON } from '@assets/icon';
import { IMAGE } from '@assets/image';

import { RootStackParamList } from '@navigation/RootStack';

export default function MyFlightScreen() {
    type RootNavigationProp = NativeStackNavigationProp<RootStackParamList>;

    const navigation = useNavigation<RootNavigationProp>();
    return (
        <SafeAreaView className="flex-1">
            <View className="p-2">
                <View className="flex-row py-4 px-4 bg-[#E1E5EC] justify-between items-center mb-1 rounded-md">
                    <Text className="text-2xl font-bold text-[#212121]">
                        Cebu Pacific
                    </Text>
                    <Image source={ICON.headerQuestion} className="w-6 h-6" />
                </View>

                <View className="flex-row py-3 px-4 bg-[#E1E5EC] items-center mb-1 ">
                    <Text className="text-sm font-bold text-[#212121]">
                        Travel Advisory:{' '}
                    </Text>
                    <Text className="text-sm text-[#212121] flex-1">
                        Cancelled flights due... (view all)
                    </Text>
                    <Text className="text-sm text-[#212121] ">{'< >'}</Text>
                </View>

                <View className="flex-column py-6 px-4 bg-[#E1E5EC] p-6 justify-center mb-1 rounded-md">
                    <Text className="text-sm font-bold text-[#212121] mb-3">
                        Redeem flights with GoRewards points
                    </Text>
                    <Pressable
                        onPress={() => navigation.navigate('BookNow')}
                        className="w-full bg-[#7289EE] py-3 items-center rounded-md"
                    >
                        <Text className="text-white font-semibold ">
                            Log in
                        </Text>
                    </Pressable>
                </View>

                <View className="flex-column py-10 px-4 bg-[#FFFCE4] items-center p-6 mb-1 rounded-md">
                    <Image
                        source={IMAGE.placeholder}
                        className="mb-6 w-[319px] h-[266px]"
                    />
                    <Text className="text-4xl text-[#212121] mb-6">
                        Book your next trip
                    </Text>
                    <View className="self-stretch">
                        <Pressable
                            onPress={() => navigation.navigate('BookNow')}
                            className="w-full bg-blue-600 py-3 items-center rounded-md"
                        >
                            <Text className="text-white font-semibold">
                                Book now
                            </Text>
                        </Pressable>
                    </View>
                </View>

                <View className="flex-row py-3 px-6 bg-[#E1E5EC] items-center justify-center mb-1 gap-8 rounded-md">
                    <Text className="text-xl font-bold underline text-[#133FFF]">
                        Flight Status
                    </Text>
                    <Text className="text-xl font-bold underline text-[#133FFF]">
                        Check-in
                    </Text>
                </View>
            </View>
        </SafeAreaView>
    );
}
