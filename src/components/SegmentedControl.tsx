import { View, Text, Pressable } from 'react-native';
import { useSegmentStore } from '@store/useSegmentStore';

// Types
const segments = ['Round-trip', 'One-way', 'Multi-city'] as const;

// Function Name
export function SegmentedControl() {
    // Hooks
    const { active, setActive } = useSegmentStore();

    // JSX
    return (
        <View className="flex-row rounded-full bg-white p-2 shadow-md">
            {segments.map(item => {
                const isActive = active === item;

                return (
                    <Pressable
                        key={item}
                        onPress={() => setActive(item)}
                        className={`flex-1 rounded-full py-2 ${
                            isActive ? 'bg-[#9CADB6]' : ''
                        }`}
                    >
                        <Text
                            className={`font-small text-l text-center ${
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
