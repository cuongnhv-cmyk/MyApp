import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import BottomTabs from '@navigation/BottomTabs';

import { BookNowScreen } from '@screens/BookNowScreen';
import SearchDestinationScreen from '@screens/SearchDestinationScreen';
import SelectTravelDateScreen from '@screens/SelectTravelDateScreen';
import FlightDetailsScreen from '@screens/FlightDetailsScreen';

export type RootStackParamList = {
    Tabs: undefined;
    BookNow: undefined;
    SearchDestination: undefined;
    SelectTravelDate: {
        name: string;
        code: string;
    };
    FlightDetails: undefined;
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
            <Stack.Screen
                name="SelectTravelDate"
                component={SelectTravelDateScreen}
                options={{
                    presentation: 'modal',
                    title: 'Select Travel Date',
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="FlightDetails"
                component={FlightDetailsScreen}
                options={{
                    presentation: 'modal',
                    title: 'Flight Details',
                    headerShown: false,
                }}
            />
        </Stack.Navigator>
    );
}
