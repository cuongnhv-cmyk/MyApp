import React from 'react';
import './global.css';
import { NavigationContainer } from '@react-navigation/native';
import RootStack from './src/navigation/RootStack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
    return (
        <SafeAreaProvider>
            <NavigationContainer>
                <RootStack />
            </NavigationContainer>
        </SafeAreaProvider>
    );
}
