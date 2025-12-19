import React, { useState, useEffect } from 'react';
import { View, Text, Image, Pressable, Modal } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { ICON } from '@assets/icon';
import { useDateStore } from '../store/useDateStore';
import moment from 'moment';

export const DateRangePicker = () => {
    // State
    const [showModal, setShowModal] = useState(false);
    const [tempMarkedDates, setTempMarkedDates] = useState({});
    const [tempStart, setTempStart] = useState<string | null>(null);

    // Hooks
    const { range, setRange, clearRange } = useDateStore();

    // Internal Functions

    // Calculates and marks all dates between start and end for the Calendar UI
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

    // Manages selection logic: starts a new range or completes an existing one
    const onDayPress = (day: any) => {
        const { dateString } = day;
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
            generateRange(tempStart, dateString);
        }
    };

    // Commits the temporary selection to the global store
    const handleConfirm = () => {
        const keys = Object.keys(tempMarkedDates).sort();
        if (keys.length > 0) {
            setRange(keys[0], keys[keys.length - 1]);
        }
        setShowModal(false);
    };

    // Side Effects

    // Syncs local state with the store when the picker opens
    useEffect(() => {
        if (showModal && range.start && range.end) {
            setTempStart(range.start);
            generateRange(range.start, range.end);
        }
    }, [showModal, range.start, range.end]);

    // UI Render
    return (
        <View>
            <Pressable
                onPress={() => setShowModal(true)}
                className="mx-4 flex-row items-center justify-between rounded-lg border border-gray-200 bg-white px-4 py-2 shadow-sm"
            >
                <View className="flex-row items-center">
                    <Text
                        className={`text-lg ${range.start ? 'font-semibold text-black' : 'text-gray-400'}`}
                    >
                        {range.start
                            ? moment(range.start).format('DD/MM/YYYY')
                            : 'DD/MM/YYYY'}
                    </Text>
                    <Text className="mx-3 text-gray-400">—</Text>
                    <Text
                        className={`text-lg ${range.end ? 'font-semibold text-black' : 'text-gray-400'}`}
                    >
                        {range.end
                            ? moment(range.end).format('DD/MM/YYYY')
                            : 'DD/MM/YYYY'}
                    </Text>
                </View>
                <View className="items-center justify-center rounded-lg border border-gray-200 bg-gray-100 p-1">
                    <Image source={ICON.calendar} className="h-8 w-8" />
                </View>
            </Pressable>

            <Modal visible={showModal} transparent animationType="fade">
                <View className="flex-1 items-center justify-center bg-black/50 px-4">
                    <View className="w-full rounded-3xl bg-white p-5">
                        <View className="mb-4 flex-row justify-between">
                            <Pressable onPress={() => setShowModal(false)}>
                                <Text className="font-bold text-gray-500">
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
                                <Text className="font-bold text-red-500">
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
                            className="mt-6 items-center rounded-full bg-[#171717] py-4"
                        >
                            <Text className="text-lg font-bold text-white">
                                Confirm
                            </Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </View>
    );
};
