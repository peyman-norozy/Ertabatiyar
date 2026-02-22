import React from 'react';
import { Text, Pressable, Vibration } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

interface AnimatedButtonTypeProps {
  title: string;
  active: boolean;
  onPress: () => void;
}

const AnimatedButton: React.FC<AnimatedButtonTypeProps> = ({
  title,
  active,
  onPress,
}) => {
  const scale = useSharedValue(1);

  const pressIn = () => {
    scale.value = withTiming(0.95, { duration: 80 });
    Vibration.vibrate(100);
  };

  const pressOut = () => {
    scale.value = withTiming(1, { duration: 80 });
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Pressable
      onPressIn={pressIn}
      onPressOut={pressOut}
      onPress={onPress}
      className={`px-5 py-3 rounded-xl w-28 h-11
        ${active ? 'bg-[#3C73D4] border border-[#508FE1]' : 'bg-[#F1F7FD]'}`}
    >
      <Animated.View style={animatedStyle}>
        <Text
          className={`font-yekan-semibold text-center text-xs ${
            active ? 'text-white' : 'text-[#A2A2A2]'
          }`}
        >
          {title}
        </Text>
      </Animated.View>
    </Pressable>
  );
};

export default AnimatedButton;
