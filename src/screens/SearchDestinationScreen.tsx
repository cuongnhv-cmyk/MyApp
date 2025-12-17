import {
    View,
    Text,
    Pressable,
    Image,
    SectionList,
    TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { LocationSection } from '@app-types/locationSearch';
import { Location } from '@app-types/locationSearch';
import { useMemo, useState } from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@navigation/RootStack';
import { ICON } from '@assets/icon';

const SECTIONS: LocationSection[] = [
    {
        title: 'AUSTRALIA',
        data: [
            { id: '1', name: 'Melbourne', code: 'MEL' },
            { id: '2', name: 'Sydney', code: 'SYD' },
        ],
    },
    {
        title: 'BRUNEI DARUSSALAM',
        data: [{ id: '1', name: 'Melbourne', code: 'MEL' }],
    },
    {
        title: 'PHILIPPINES',
        data: [
            { id: '1', name: 'Clark', code: 'CRK' },
            { id: '2', name: 'Davao', code: 'DVO' },
            { id: '3', name: 'Manila', code: 'MNL' },
        ],
    },
    {
        title: 'SINGAPORE  ',
        data: [{ id: '1', name: 'Singapore', code: 'SIN' }],
    },
];
export default function SearchDestinationScreen() {
    type RootNavigationProp = NativeStackNavigationProp<RootStackParamList>;
    const navigation = useNavigation<RootNavigationProp>();

    const [query, setQuery] = useState('');

    const filteredSections = useMemo(() => {
        if (!query.trim()) return SECTIONS;

        const lower = query.toLowerCase();

        return SECTIONS.map(section => ({
            ...section,
            data: section.data.filter(item =>
                item.name.toLowerCase().includes(lower),
            ),
        })).filter(section => section.data.length > 0);
    }, [query]);
    return (
        <SafeAreaView className="flex-1">
            <View className="flex-1 p-2">
                <View className="flex-1 py-4 px-4 justify-start mb-1">
                    <View className="py-5 mb-2 ">
                        <Pressable onPress={() => navigation.goBack()}>
                            <Image source={ICON.close} className="w-8 h-8" />
                        </Pressable>
                    </View>
                    <View className="py-5">
                        <Text className="text-4xl">Search Destination</Text>
                    </View>

                    <View className="flex-row bg-white items-center p-4 rounded-lg mb-2">
                        <Image source={ICON.search} className="w-8 h-8" />
                        <TextInput
                            placeholder="City, Airport, Province, Region"
                            value={query}
                            onChangeText={setQuery}
                            className="ml-2 text-lg flex-1"
                        />
                        <Pressable onPress={() => setQuery('')}>
                            <Image source={ICON.close} className="w-8 h-8" />
                        </Pressable>
                    </View>

                    <View className="flex-1 py-5 bg-white rounded-lg p-4">
                        <Text className="text-[#003A61] font-bold px-2 mb-4">
                            All locations
                        </Text>
                        {/* Search input */}

                        <SectionList<Location, LocationSection>
                            sections={filteredSections}
                            keyExtractor={item => item.id}
                            renderSectionHeader={({ section }) => (
                                <View className="px-2 py-2">
                                    <Text className="text-gray-500 font-bold text-sm">
                                        {section.title}
                                    </Text>
                                </View>
                            )}
                            renderItem={({ item, index, section }) => {
                                const isLast =
                                    index === section.data.length - 1;

                                return (
                                    <Pressable
                                        onPress={() => {
                                            navigation.navigate(
                                                'SelectTravelDate',
                                                {
                                                    name: item.name,
                                                    code: item.code,
                                                },
                                            );
                                        }}
                                    >
                                        <View className="flex-row px-6 py-3 justify-between items-center">
                                            <Text className="text-xl">
                                                {item.name}
                                            </Text>

                                            <View className="bg-gray-200 flex-row items-center justify-center p-2 rounded-xl">
                                                <Text className="text-gray-500">
                                                    {item.code}
                                                </Text>
                                            </View>
                                        </View>

                                        {isLast && (
                                            <View className="h-px bg-gray-200" />
                                        )}
                                    </Pressable>
                                );
                            }}
                        />
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}
