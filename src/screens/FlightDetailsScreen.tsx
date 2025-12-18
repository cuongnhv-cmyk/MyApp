import { View, Text, Pressable, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@navigation/RootStack';
import { ICON } from '@assets/icon';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function FlightDetailsScreen() {
    type RootNavigationProp = NativeStackNavigationProp<RootStackParamList>;
    const navigation = useNavigation<RootNavigationProp>();
    return (
        <SafeAreaView className="flex-1">
            <View className="p-2 flex-1"></View>
        </SafeAreaView>
    );
}
