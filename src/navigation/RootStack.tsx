// Imports
import React from 'react';
import { Pressable, Image } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import BottomTabs from '@navigation/BottomTabs';
import { BookNowScreen } from '@screens/BookNowScreen';
import SearchDestinationScreen from '@screens/SearchDestinationScreen';
import SelectTravelDateScreen from '@screens/SelectTravelDateScreen';
import FlightDetailsScreen from '@screens/FlightDetailsScreen';
import { FlightDetailsHeader } from '@components/FlightDetailsHeader';
import { ICON } from '@assets/icon';

// Types
export type RootStackParamList = {
    Tabs: undefined;
    BookNow: undefined;
    SearchDestination: undefined;
    SelectTravelDate: undefined;
    FlightDetails: undefined;
};

type RootNavigationProp = NativeStackNavigationProp<RootStackParamList>;

// Function Name
const FlightDetailsHeaderWrapper = () => <FlightDetailsHeader />;

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootStack() {
    // Hooks
    const navigation = useNavigation<RootNavigationProp>();

    // JSX
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
                    presentation: 'card',
                    title: 'Book Now',
                    headerShown: false,
                }}
            />

            <Stack.Screen
                name="SearchDestination"
                component={SearchDestinationScreen}
                options={{
                    presentation: 'card',
                    title: 'Search Destination',
                    headerShown: false,
                }}
            />

            <Stack.Screen
                name="SelectTravelDate"
                component={SelectTravelDateScreen}
                options={{
                    presentation: 'card',
                    title: 'Select Travel Date',
                    headerShown: false,
                }}
            />

            <Stack.Screen
                name="FlightDetails"
                component={FlightDetailsScreen}
                options={{
                    title: 'Flight Details',
                    headerTitleAlign: 'center',
                    headerTitle: FlightDetailsHeaderWrapper,
                    headerLeft: () => (
                        <Pressable onPress={() => navigation.goBack()}>
                            <Image source={ICON.back} className="h-5 w-5" />
                        </Pressable>
                    ),
                }}
            />
        </Stack.Navigator>
    );
}
