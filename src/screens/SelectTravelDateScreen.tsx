import { View, Text, Pressable, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@navigation/RootStack';
import { ICON } from '@assets/icon';
import { DateRangePicker } from '@components/DateRangePicker';
import { SummaryFooter } from '@components/SummaryFooter';
import { useDateStore } from '@store/useDateStore';
import { SelectPassengerPopup } from '@components/SelectPassengerPopup';
import { useState } from 'react';
import moment from 'moment';
import { useFlightStore } from '@store/useFlightStore';

// Types
type RootNavigationProp = NativeStackNavigationProp<RootStackParamList>;

// Function Name
export default function SelectTravelDateScreen() {
    // State
    const [isContinue, setIsContinue] = useState(false);

    // Hooks
    const navigation = useNavigation<RootNavigationProp>();
    const { range } = useDateStore();
    const { destination } = useFlightStore();

    // Functions

    // Triggers the passenger selection popup
    const onContinue = () => {
        setIsContinue(true);
    };

    // Calculates and returns the string representation of the selected date range
    const getDurationText = () => {
        if (range.start && range.end) {
            const days =
                moment(range.end).diff(moment(range.start), 'days') + 1;
            return `Round-trips: ${days} days`;
        }
        return 'Select dates';
    };

    // Helper to determine if the user has selected both start and end dates
    const isDateSelectionComplete = !!(range.start && range.end);

    // JSX
    return (
        <SafeAreaView className="flex-1">
            <View className="flex-1 p-2">
                <View className="mb-1 justify-start p-4">
                    <View className="mb-2 py-5">
                        <Pressable onPress={() => navigation.goBack()}>
                            <Image source={ICON.close} className="h-8 w-8" />
                        </Pressable>
                    </View>

                    <View className="py-5">
                        <Text className="text-4xl">Select Travel Date</Text>
                    </View>
                </View>

                <View className="mb-4 mb-8 flex-row items-center justify-center rounded-lg px-2">
                    <Text className="text-2xl">
                        Clark CRK → {destination?.name} {destination?.code}
                    </Text>
                </View>

                <DateRangePicker />
            </View>

            <SummaryFooter
                label={getDurationText()}
                buttonLabel="Continue"
                onContinue={onContinue}
                isDisabled={!isDateSelectionComplete}
            />

            <SelectPassengerPopup
                visible={isContinue}
                onClose={() => setIsContinue(false)}
            />
        </SafeAreaView>
    );
}
