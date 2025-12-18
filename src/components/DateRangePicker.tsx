import React, { useState, useEffect } from 'react';
import { View, Text, Image, Pressable, Modal } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { ICON } from '@assets/icon';
import { useDateStore } from '../store/useDateStore';
import moment from 'moment';

export const DateRangePicker = () => {
    const { range, setRange, clearRange } = useDateStore();
    const [showModal, setShowModal] = useState(false);

    // Local state to manage the visual selection before hitting "Confirm"
    const [tempMarkedDates, setTempMarkedDates] = useState({});
    const [tempStart, setTempStart] = useState<string | null>(null);

    // Sync local UI with Store whenever modal opens
    useEffect(() => {
        if (showModal && range.start && range.end) {
            setTempStart(range.start);
            generateRange(range.start, range.end);
        }
    }, [showModal, range.start, range.end]);

    // Take two dates and create a list of every single day in between
    // so the calendar knows which boxes to color.
    const generateRange = (startStr: string, endStr: string) => {
        let marked: any = {};
        let start = moment(startStr);
        let end = moment(endStr);
        if (end.isBefore(start)) [start, end] = [end, start];

        let current = start.clone();
        while (current.isSameOrBefore(end)) {
            const dateStr = current.format('YYYY-MM-DD');
            const isEdge =
                dateStr === start.format('YYYY-MM-DD') ||
                dateStr === end.format('YYYY-MM-DD');

            marked[dateStr] = {
                color: isEdge ? '#4b5563' : '#f3f4f6',
                textColor: isEdge ? 'white' : '#1f2937',
                startingDay: dateStr === start.format('YYYY-MM-DD'),
                endingDay: dateStr === end.format('YYYY-MM-DD'),
            };
            current.add(1, 'days');
        }
        setTempMarkedDates(marked);
    };

    // Check if we are starting a new selection or finishing one;
    // if finishing, call the generateRange to fill the gap.
    const onDayPress = (day: any) => {
        const { dateString } = day;
        // If it's a new selection
        if (!tempStart || Object.keys(tempMarkedDates).length > 1) {
            setTempStart(dateString);
            setTempMarkedDates({
                [dateString]: {
                    startingDay: true,
                    color: '#4b5563',
                    textColor: 'white',
                },
            });
        } else {
            // Completing the range
            generateRange(tempStart, dateString);
        }
    };

    // Find the first and last days of the selection and save them
    // to the permanent store.
    const handleConfirm = () => {
        const keys = Object.keys(tempMarkedDates).sort();
        if (keys.length > 0) {
            setRange(keys[0], keys[keys.length - 1]);
        }
        setShowModal(false);
    };

    return (
        <View>
            {/* 1. THE TRIGGER BUTTON */}
            <Pressable
                onPress={() => {
                    console.log('Calendar Button Pressed!');
                    setShowModal(true);
                }}
                className="flex-row py-2 px-4 mx-4 border border-gray-200 justify-between items-center rounded-lg bg-white shadow-sm"
            >
                <View className="flex-row items-center">
                    <Text
                        className={`text-lg ${
                            range.start
                                ? 'text-black font-semibold'
                                : 'text-gray-400'
                        }`}
                    >
                        {range.start
                            ? moment(range.start).format('DD/MM/YYYY')
                            : 'DD/MM/YYYY'}
                    </Text>
                    <Text className="mx-3 text-gray-400">—</Text>
                    <Text
                        className={`text-lg ${
                            range.end
                                ? 'text-black font-semibold'
                                : 'text-gray-400'
                        }`}
                    >
                        {range.end
                            ? moment(range.end).format('DD/MM/YYYY')
                            : 'DD/MM/YYYY'}
                    </Text>
                </View>
                <View className="bg-gray-100 p-1 justify-center items-center rounded-lg border border-gray-200">
                    <Image source={ICON.calendar} className="w-8 h-8" />
                </View>
            </Pressable>

            {/* 2. THE MODAL */}
            <Modal visible={showModal} transparent animationType="fade">
                <View className="flex-1 justify-center items-center bg-black/50 px-4">
                    <View className="bg-white rounded-3xl p-5 w-full">
                        {/* Header with Clear/Back */}
                        <View className="flex-row justify-between mb-4">
                            <Pressable onPress={() => setShowModal(false)}>
                                <Text className="text-gray-500 font-bold">
                                    Back
                                </Text>
                            </Pressable>
                            <Pressable
                                onPress={() => {
                                    clearRange();
                                    setTempMarkedDates({});
                                    setTempStart(null);
                                }}
                            >
                                <Text className="text-red-500 font-bold">
                                    Clear
                                </Text>
                            </Pressable>
                        </View>

                        <Calendar
                            markingType="period"
                            markedDates={tempMarkedDates}
                            onDayPress={onDayPress}
                            theme={{
                                todayTextColor: '#EF4444',
                                arrowColor: '#000000',
                            }}
                        />

                        <Pressable
                            onPress={handleConfirm}
                            className="bg-[#171717] py-4 rounded-full mt-6 items-center"
                        >
                            <Text className="text-white font-bold text-lg">
                                Confirm
                            </Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </View>
    );
};
