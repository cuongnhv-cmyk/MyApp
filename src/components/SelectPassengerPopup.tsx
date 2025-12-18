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

export const SelectPassengerPopup = ({
    visible,
    onClose,
}: {
    visible: boolean;
    onClose: () => void;
}) => {
    type RootNavigationProp = NativeStackNavigationProp<RootStackParamList>;
    const navigation = useNavigation<RootNavigationProp>();
    const { passengers } = usePassengerStore();
    const totalPassengers =
        passengers.adults +
        passengers.child +
        passengers.infantOnLap +
        passengers.infantOnSeat;
    const getPassengerText = () => {
        if (totalPassengers === 0) return 'No passengers selected';

        const unit = totalPassengers === 1 ? 'passenger' : 'passengers';

        return `${totalPassengers} ${unit} selected`;
    };
    const onContinue = () => {
        navigation.navigate('FlightDetails');
    };
    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="slide" // Slips up from the bottom
        >
            <Pressable
                className="flex-1 bg-black/40 justify-end"
                onPress={onClose}
            >
                <View
                    className="w-full min-h-[480px] max-h-[100%] bg-white rounded-t-3xl shadow-2xl"
                    onStartShouldSetResponder={() => true}
                    onResponderTerminationRequest={() => false}
                >
                    {/* Modal Content */}
                    <View className="px-4">
                        <View className="py-5">
                            <Pressable onPress={onClose}>
                                <Image
                                    source={ICON.close}
                                    className="w-8 h-8"
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
                label={getPassengerText()}
                buttonLabel="Continue"
                onContinue={onContinue}
                isDisabled={!totalPassengers}
            />
        </Modal>
    );
};
