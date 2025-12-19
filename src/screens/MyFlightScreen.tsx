import { useNavigation } from '@react-navigation/native';
import { View, Text, Image, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ICON } from '@assets/icon';
import { IMAGE } from '@assets/image';
import { RootStackParamList } from '@navigation/RootStack';

// Types
type RootNavigationProp = NativeStackNavigationProp<RootStackParamList>;

// Function Name
export default function MyFlightScreen() {
    // Hooks
    const navigation = useNavigation<RootNavigationProp>();

    // JSX
    return (
        <SafeAreaView className="flex-1">
            <View className="p-2">
                <View className="mb-1 flex-row items-center justify-between rounded-md bg-[#E1E5EC] px-4 py-4">
                    <Text className="text-2xl font-bold text-[#212121]">
                        Cebu Pacific
                    </Text>
                    <Image source={ICON.headerQuestion} className="h-6 w-6" />
                </View>

                <View className="mb-1 flex-row items-center bg-[#E1E5EC] px-4 py-3">
                    <Text className="text-sm font-bold text-[#212121]">
                        Travel Advisory:{' '}
                    </Text>
                    <Text className="flex-1 text-sm text-[#212121]">
                        Cancelled flights due... (view all)
                    </Text>
                    <Text className="text-sm text-[#212121]">{'< >'}</Text>
                </View>

                <View className="flex-column mb-1 justify-center rounded-md bg-[#E1E5EC] p-6 px-4 py-6">
                    <Text className="mb-3 text-sm font-bold text-[#212121]">
                        Redeem flights with GoRewards points
                    </Text>
                    <Pressable
                        onPress={() => navigation.navigate('BookNow')}
                        className="w-full items-center rounded-md bg-[#7289EE] py-3"
                    >
                        <Text className="font-semibold text-white">Log in</Text>
                    </Pressable>
                </View>

                <View className="flex-column mb-1 items-center rounded-md bg-[#FFFCE4] p-6 px-4 py-10">
                    <Image
                        source={IMAGE.placeholder}
                        className="mb-6 h-[266px] w-[319px]"
                    />
                    <Text className="mb-6 text-4xl text-[#212121]">
                        Book your next trip
                    </Text>
                    <View className="self-stretch">
                        <Pressable
                            onPress={() => navigation.navigate('BookNow')}
                            className="w-full items-center rounded-md bg-blue-600 py-3"
                        >
                            <Text className="font-semibold text-white">
                                Book now
                            </Text>
                        </Pressable>
                    </View>
                </View>

                <View className="mb-1 flex-row items-center justify-center gap-8 rounded-md bg-[#E1E5EC] px-6 py-3">
                    <Text className="text-xl font-bold text-[#133FFF] underline">
                        Flight Status
                    </Text>
                    <Text className="text-xl font-bold text-[#133FFF] underline">
                        Check-in
                    </Text>
                </View>
            </View>
        </SafeAreaView>
    );
}
