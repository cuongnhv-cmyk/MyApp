import React from 'react';
import { Modal, View, Pressable } from 'react-native';

export const SelectPassengerPopup = ({
    visible,
    onClose,
}: {
    visible: boolean;
    onClose: () => void;
}) => {
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
                    className="w-full h-[480px] bg-white rounded-t-3xl shadow-2xl"
                    // Stopping propagation so clicks inside don't close the modal
                    onStartShouldSetResponder={() => true}
                    onResponderTerminationRequest={() => false}
                >
                    {/* Blank for now */}
                </View>
            </Pressable>
        </Modal>
    );
};
