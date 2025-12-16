import { View, Text, Pressable, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootStack';
import { RouteProp } from '@react-navigation/native';

type Props = {
    route: RouteProp<RootStackParamList, 'SelectTravelDate'>;
};

export default function SelectTravelDateScreen({ route }: Props) {
    type RootNavigationProp = NativeStackNavigationProp<RootStackParamList>;
    const navigation = useNavigation<RootNavigationProp>();
    return (
        <SafeAreaView className="flex-1">
            <View className=" p-2">
                <View className=" p-4 justify-start mb-1">
                    <View className="py-5 mb-2 ">
                        <Pressable onPress={() => navigation.goBack()}>
                            <Image
                                source={require('../../assets/icon_close.png')}
                                className="w-8 h-8"
                            />
                        </Pressable>
                    </View>
                    <View className="py-5">
                        <Text className="text-4xl">Select Travel Date</Text>
                    </View>
                </View>
                <View className="flex-row rounded-lg items-center mb-4 px-2 justify-center">
                    <Text className="text-2xl">
                        Clark CRK → {route.params.name} {route.params.code}
                    </Text>
                </View>
            </View>
        </SafeAreaView>
    );
}
