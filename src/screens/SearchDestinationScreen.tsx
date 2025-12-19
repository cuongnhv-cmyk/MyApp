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
import { useFlightStore } from '@store/useFlightStore';

// Types
type RootNavigationProp = NativeStackNavigationProp<RootStackParamList>;

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

// Function Name
export default function SearchDestinationScreen() {
    // State
    const [query, setQuery] = useState('');

    // Hooks
    const navigation = useNavigation<RootNavigationProp>();
    const { setDestination } = useFlightStore();

    // Functions

    // Filters the location sections based on the user's search query
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

    // JSX
    return (
        <SafeAreaView className="flex-1">
            <View className="flex-1 p-2">
                <View className="mb-1 flex-1 justify-start px-4 py-4">
                    <View className="mb-2 py-5">
                        <Pressable onPress={() => navigation.goBack()}>
                            <Image source={ICON.close} className="h-8 w-8" />
                        </Pressable>
                    </View>

                    <View className="py-5">
                        <Text className="text-4xl">Search Destination</Text>
                    </View>

                    <View className="mb-2 flex-row items-center rounded-lg bg-white p-4">
                        <Image source={ICON.search} className="h-8 w-8" />
                        <TextInput
                            placeholder="City, Airport, Province, Region"
                            value={query}
                            onChangeText={setQuery}
                            className="ml-2 flex-1 text-lg"
                        />
                        <Pressable onPress={() => setQuery('')}>
                            <Image source={ICON.close} className="h-8 w-8" />
                        </Pressable>
                    </View>

                    <View className="flex-1 rounded-lg bg-white p-4 py-5">
                        <Text className="mb-4 px-2 font-bold text-[#003A61]">
                            All locations
                        </Text>

                        <SectionList<Location, LocationSection>
                            sections={filteredSections}
                            keyExtractor={item => item.id}
                            renderSectionHeader={({ section }) => (
                                <View className="px-2 py-2">
                                    <Text className="text-sm font-bold text-gray-500">
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
                                            setDestination(
                                                item.name,
                                                item.code,
                                            );
                                            navigation.navigate(
                                                'SelectTravelDate',
                                            );
                                        }}
                                    >
                                        <View className="flex-row items-center justify-between px-6 py-3">
                                            <Text className="text-xl">
                                                {item.name}
                                            </Text>

                                            <View className="flex-row items-center justify-center rounded-xl bg-gray-200 p-2">
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
