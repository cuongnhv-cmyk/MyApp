import { View, Text, Pressable, Image, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SegmentedControl } from '@components/SegmentedControl';
import type { ListRenderItemInfo } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@navigation/RootStack';
import { useNavigation } from '@react-navigation/native';
import { RecentSearch } from '@app-types/recentSearch';
import { ICON } from '@assets/icon';

type RecentSearchItemProps = {
    item: RecentSearch;
};

function RecentSearchItem({ item }: RecentSearchItemProps) {
    return (
        <View className="flex-row bg-white rounded-lg p-4 justify-between items-center mb-2">
            <Text className="text-xl">
                {item.title}
                {'\n'}
                {item.subtitle}
            </Text>
            <Image source={ICON.searchItem} className="w-8 h-8" />
        </View>
    );
}
export function BookNowScreen() {
    type RootNavigationProp = NativeStackNavigationProp<RootStackParamList>;
    const navigation = useNavigation<RootNavigationProp>();

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

    return (
        <SafeAreaView className="flex-1">
            <View className="p-2">
                <View className="flex-column py-4 px-4 justify-start mb-1">
                    <View className="py-5 mb-2 ">
                        <Pressable onPress={() => navigation.goBack()}>
                            <Image source={ICON.close} className="w-8 h-8" />
                        </Pressable>
                    </View>
                    <View className="py-5">
                        <Text className="text-4xl">Search</Text>
                    </View>
                </View>

                <View className="flex-column py-2 px-4 justify-start">
                    <View className="mb-4">
                        <SegmentedControl />
                    </View>

                    <View className="flex-row bg-white rounded-lg items-center mb-4 py-4 px-2 gap-20">
                        <View className="flex-row items-center gap-10">
                            <Image
                                source={ICON.switchRoute}
                                className="w-8 h-8"
                            />
                            <Text className="text-2xl">CRK{'\n'}Clark</Text>
                        </View>

                        <Pressable
                            onPress={() =>
                                navigation.navigate('SearchDestination')
                            }
                        >
                            <Text className="text-2xl text-gray-500 ">
                                Destination
                            </Text>
                        </Pressable>
                    </View>
                </View>

                <View className="flex-column py-2 px-4 justify-start">
                    <View className="flex-row items-center justify-between mb-4">
                        <Text className="text-[#003A61] font-bold text-l">
                            Your recent searches
                        </Text>
                        <Image source={ICON.recentSearch} className="w-8 h-8" />
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
