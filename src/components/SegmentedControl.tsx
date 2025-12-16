import { View, Text, Pressable } from 'react-native';
import { useSegmentStore } from '../store/useSegmentStore';

const segments = ['Round-trip', 'One-way', 'Multi-city'] as const;

export function SegmentedControl() {
    const { active, setActive } = useSegmentStore();

    return (
        <View className="flex-row bg-white p-2 rounded-full shadow-md">
            {segments.map(item => {
                const isActive = active === item;

                return (
                    <Pressable
                        key={item}
                        onPress={() => setActive(item)}
                        className={`flex-1 py-2 rounded-full ${
                            isActive ? 'bg-[#9CADB6]' : ''
                        }`}
                    >
                        <Text
                            className={`text-center font-small text-l ${
                                isActive ? 'text-black' : 'text-gray-500'
                            }`}
                        >
                            {item}
                        </Text>
                    </Pressable>
                );
            })}
        </View>
    );
}
