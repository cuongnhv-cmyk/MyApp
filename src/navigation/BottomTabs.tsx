import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, StyleSheet } from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import MyFlightScreen from '../screens/MyFlightScreen';
import AccountScreen from '../screens/AccountScreen';
import MenuScreen from '../screens/MenuScreen';

import { TAB_ICON } from './tabIcon';

const Tab = createBottomTabNavigator();

const styles = StyleSheet.create({
    icon: {
        height: 25,
        width: 25,
    },
});
const renderTabIcon = (routeName: string, color: string) => {
    return (
        <Image
            source={TAB_ICON[routeName as keyof typeof TAB_ICON]}
            style={[styles.icon, { tintColor: color }]}
            resizeMode="contain"
        />
    );
};

export default function BottomTabs() {
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
