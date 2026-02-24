import React from 'react';
import { Text, Pressable, Vibration, Image, View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

interface AnimatedButtonTypeProps {
  title: string;
  active: boolean;
  onPress: () => void;
  image: any;
  showIcon: boolean;
  width: string;
  height: string;
  fontSize?: string;
  inActiveTitleColor?: string;
  activeBackgroundColor?: string;
}

const AnimatedButton: React.FC<AnimatedButtonTypeProps> = ({
  title,
  active,
  onPress,
  image,
  showIcon,
  width,
  height,
  fontSize = 'text-xs',
  inActiveTitleColor = 'text-[#A2A2A2]',
  activeBackgroundColor = 'bg-[#3C73D4]',
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
      className={`px-5 py-3 rounded-xl ${width} ${height}
        ${
          active
            ? `${activeBackgroundColor} border border-[#508FE1]`
            : 'bg-[#F1F7FD]'
        }`}
    >
      <Animated.View style={animatedStyle}>
        <View
          className="flex-row items-center justify-center gap-x-2"
          style={{ direction: 'ltr' }}
        >
          <Text
            className={`font-yekan-semibold ${fontSize} ${
              active ? 'text-white' : inActiveTitleColor
            }`}
          >
            {title}
          </Text>

          {showIcon && <Image source={image} className="w-8 h-8" />}
        </View>
      </Animated.View>
    </Pressable>
  );
};

export default AnimatedButton;
