import { View, Text, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

export function BookNowScreen() {
    const navigation = useNavigation();

    return (
        <SafeAreaView className="flex-1">
            <View className="p-2">
                <View className="flex-column py-16 px-4 border-4 justify-start">
                    <View className="py-5 border-4">
                        {/* Close button */}
                        <Pressable
                            onPress={() => navigation.goBack()}
                            className="left-4"
                        >
                            <Text className="text-2xl">✕</Text>
                        </Pressable>
                    </View>
                    <View className="py-5 border-4">
                        {/* Close button */}
                        <Pressable
                            onPress={() => navigation.goBack()}
                            className="left-4"
                        >
                            <Text className="text-2xl">placeholder</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}
