import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';
import HomeScreen from '@screens/HomeScreen';
import MyFlightScreen from '@screens/MyFlightScreen';
import AccountScreen from '@screens/AccountScreen';
import MenuScreen from '@screens/MenuScreen';
import { TAB_ICON } from '@navigation/tabIcon';

// Types
const Tab = createBottomTabNavigator();

// Function Name
export default function BottomTabs() {
    // Functions

    // Renders the icon using NativeWind for dimensions and inline style for the dynamic tint
    const renderTabIcon = (routeName: string, color: string) => {
        return (
            <Image
                source={TAB_ICON[routeName as keyof typeof TAB_ICON]}
                className="h-[25px] w-[25px]"
                style={{ tintColor: color }}
                resizeMode="contain"
            />
        );
    };

    // JSX
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color }) => renderTabIcon(route.name, color),
                tabBarActiveTintColor: '#0063A6',
                tabBarInactiveTintColor: '#212121',
                headerShown: false,
            })}
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="MyFlight" component={MyFlightScreen} />
            <Tab.Screen name="Account" component={AccountScreen} />
            <Tab.Screen name="Menu" component={MenuScreen} />
        </Tab.Navigator>
    );
}
