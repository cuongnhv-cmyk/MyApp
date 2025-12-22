import React from 'react';
import { Modal, View, Pressable, Text, Image, ScrollView } from 'react-native';
import { ICON } from '@assets/icon';
import { PassengerRow } from '@components/PassengersRow';
import { SummaryFooter } from './SummaryFooter';
import { usePassengerStore } from '@store/usePassengerStore';
import { SeatRequirementInfo } from './SeatRequirementDetail';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@navigation/RootStack';
import { formatPassengerData } from '@utils/PassengerFormatter';

// Types
type RootNavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface Props {
    visible: boolean;
    onClose: () => void;
}

// Function Name
export const SelectPassengerPopup = ({ visible, onClose }: Props) => {
    // Hooks
    const navigation = useNavigation<RootNavigationProp>();
    const { passengers } = usePassengerStore();

    // Functions

    // Navigates to the flight details screen after selection
    const onContinue = () => {
        onClose();
        navigation.navigate('FlightDetails');
    };

    // Formats raw passenger data into displayable strings and totals
    const passengerInfo = formatPassengerData(passengers);

    // JSX
    return (
        <Modal visible={visible} transparent animationType="slide">
            <Pressable
                className="flex-1 justify-end bg-black/40"
                onPress={onClose}
            >
                <View
                    className="max-h-[100%] min-h-[480px] w-full rounded-t-3xl bg-white shadow-2xl"
                    onStartShouldSetResponder={() => true}
                    onResponderTerminationRequest={() => false}
                >
                    <View className="px-4">
                        <View className="py-5">
                            <Pressable onPress={onClose}>
                                <Image
                                    source={ICON.close}
                                    className="h-8 w-8"
                                />
                            </Pressable>
                        </View>

                        <View className="py-5">
                            <Text className="text-4xl">Select passengers</Text>
                        </View>

                        <ScrollView
                            className="flex-grow"
                            showsVerticalScrollIndicator={false}
                        >
                            <PassengerRow
                                label="Adults"
                                subLabel="Age 12 or above"
                                type="adults"
                            />
                            <PassengerRow
                                label="Child"
                                subLabel="Age 2 - 6 years"
                                type="child"
                            />
                            <PassengerRow
                                label="Infant on lap"
                                subLabel="Your infant will not require a seat"
                                type="infantOnLap"
                            />
                            <PassengerRow
                                label="Infant on seat"
                                type="infantOnSeat"
                                subLabel="Under 2 years. Will be charged the same as adults and children"
                            />
                        </ScrollView>

                        <SeatRequirementInfo />
                    </View>
                </View>
            </Pressable>

            <SummaryFooter
                label={passengerInfo.summary}
                buttonLabel="Continue"
                onContinue={onContinue}
                isDisabled={passengerInfo.total === 0}
            />
        </Modal>
    );
};
