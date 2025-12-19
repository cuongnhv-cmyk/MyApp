import { View, Text, Pressable, Image, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SegmentedControl } from '@components/SegmentedControl';
import type { ListRenderItemInfo } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@navigation/RootStack';
import { useNavigation } from '@react-navigation/native';
import { RecentSearch } from '@app-types/recentSearch';
import { ICON } from '@assets/icon';

// Types
type RecentSearchItemProps = {
    item: RecentSearch;
};

type RootNavigationProp = NativeStackNavigationProp<RootStackParamList>;

// Function Name
function RecentSearchItem({ item }: RecentSearchItemProps) {
    // JSX
    return (
        <View className="mb-2 flex-row items-center justify-between rounded-lg bg-white p-4">
            <Text className="text-xl">
                {item.title}
                {'\n'}
                {item.subtitle}
            </Text>
            <Image source={ICON.searchItem} className="h-8 w-8" />
        </View>
    );
}

// Function Name
export function BookNowScreen() {
    // Hooks
    const navigation = useNavigation<RootNavigationProp>();

    // Functions

    // Static data for previous flight searches
    const RECENT_SEARCHES = [
        {
            id: '1',
            title: 'Clark - Singapore',
            subtitle: '16 Nov - Dev • 1 guest',
        },
        {
            id: '2',
            title: 'Clark - Taipei',
            subtitle: '16 Nov - Dev • 3 guests',
        },
        {
            id: '3',
            title: 'Manila - Davao',
            subtitle: '16 Nov - Dev • 3 guests',
        },
    ];

    // JSX
    return (
        <SafeAreaView className="flex-1">
            <View className="p-2">
                <View className="flex-column mb-1 justify-start px-4 py-4">
                    <View className="mb-2 py-5">
                        <Pressable onPress={() => navigation.goBack()}>
                            <Image source={ICON.close} className="h-8 w-8" />
                        </Pressable>
                    </View>

                    <View className="py-5">
                        <Text className="text-4xl">Search</Text>
                    </View>
                </View>

                <View className="flex-column justify-start px-4 py-2">
                    <View className="mb-4">
                        <SegmentedControl />
                    </View>

                    <View className="mb-4 flex-row items-center gap-20 rounded-lg bg-white px-2 py-4">
                        <View className="flex-row items-center gap-10">
                            <Image
                                source={ICON.switchRoute}
                                className="h-8 w-8"
                            />
                            <Text className="text-2xl">CRK{'\n'}Clark</Text>
                        </View>

                        <Pressable
                            onPress={() =>
                                navigation.navigate('SearchDestination')
                            }
                        >
                            <Text className="text-2xl text-gray-500">
                                Destination
                            </Text>
                        </Pressable>
                    </View>
                </View>

                <View className="flex-column justify-start px-4 py-2">
                    <View className="mb-4 flex-row items-center justify-between">
                        <Text className="text-l font-bold text-[#003A61]">
                            Your recent searches
                        </Text>
                        <Image source={ICON.recentSearch} className="h-8 w-8" />
                    </View>

                    <FlatList<RecentSearch>
                        data={RECENT_SEARCHES}
                        keyExtractor={item => item.id}
                        renderItem={({
                            item,
                        }: ListRenderItemInfo<RecentSearch>) => (
                            <RecentSearchItem item={item} />
                        )}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
}
