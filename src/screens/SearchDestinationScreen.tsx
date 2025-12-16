import { View, Text, Pressable, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

export default function SearchDestinationScreen() {
    const navigation = useNavigation();
    return (
        <SafeAreaView className="flex-1">
            <View className="p-2">
                <View className="flex-column py-4 px-4 justify-start mb-1">
                    <View className="py-5 mb-2 ">
                        <Pressable onPress={() => navigation.goBack()}>
                            <Image
                                source={require('../../assets/icon_close.png')}
                                className="w-8 h-8"
                            />
                        </Pressable>
                    </View>
                    <View className="py-5">
                        <Text className="text-4xl">Search Destination</Text>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}
