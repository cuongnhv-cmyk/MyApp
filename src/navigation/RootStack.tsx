import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import BottomTabs from './BottomTabs';
import { BookNowScreen } from '../screens/BookNowScreen';
import SearchDestinationScreen from '../screens/SearchDestinationScreen';
// import BookingScreen from '../screens/BookingScreen';

export type RootStackParamList = {
    Tabs: undefined;
    BookNow: undefined;
    SearchDestination: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Tabs"
                component={BottomTabs}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="BookNow"
                component={BookNowScreen}
                options={{
                    presentation: 'modal',
                    title: 'Book Now',
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="SearchDestination"
                component={SearchDestinationScreen}
                options={{
                    presentation: 'modal',
                    title: 'Search Destination',
                    headerShown: false,
                }}
            />
        </Stack.Navigator>
    );
}
