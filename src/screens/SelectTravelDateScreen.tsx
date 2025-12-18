import { View, Text, Pressable, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@navigation/RootStack';
import { RouteProp } from '@react-navigation/native';
import { ICON } from '@assets/icon';
import { DateRangePicker } from '@components/DateRangePicker';
import { SummaryFooter } from '@components/SummaryFooter';
import { useDateStore } from '@store/useDateStore';
import { SelectPassengerPopup } from '@components/SelectPassengerPopup';
import { useState } from 'react';
import moment from 'moment';

type Props = {
    route: RouteProp<RootStackParamList, 'SelectTravelDate'>;
};

export default function SelectTravelDateScreen({ route }: Props) {
    type RootNavigationProp = NativeStackNavigationProp<RootStackParamList>;
    const navigation = useNavigation<RootNavigationProp>();
    const { range } = useDateStore();
    const isDateSelectionComplete = !!(range.start && range.end);
    const [isConinue, setIsContinue] = useState(false);
    const onContinue = () => {
        setIsContinue(true);
    };
    const getDurationText = () => {
        if (range.start && range.end) {
            const days =
                moment(range.end).diff(moment(range.start), 'days') + 1;
            return `Round-trips: ${days} days`;
        }
        return 'Select dates';
    };
    return (
        <SafeAreaView className="flex-1">
            <View className="p-2 flex-1">
                <View className="p-4 justify-start mb-1">
                    <View className="py-5 mb-2 ">
                        <Pressable onPress={() => navigation.goBack()}>
                            <Image source={ICON.close} className="w-8 h-8" />
                        </Pressable>
                    </View>
                    <View className="py-5">
                        <Text className="text-4xl">Select Travel Date</Text>
                    </View>
                </View>
                <View className="flex-row rounded-lg items-center mb-4 px-2 justify-center mb-8">
                    <Text className="text-2xl">
                        Clark CRK → {route.params.name} {route.params.code}
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
                visible={isConinue}
                onClose={() => setIsContinue(false)}
            />
        </SafeAreaView>
    );
}
