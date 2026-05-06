import React from 'react';
import {
  Text,
  Pressable,
  Vibration,
  Image,
  View,
  ActivityIndicator,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

interface AnimatedButtonTypeProps {
  title: string;
  active: boolean;
  onPress: () => void;
  image?: any;
  showIcon?: boolean;
  width: string;
  height: string;
  fontSize?: string;
  inActiveTitleColor?: string;
  activeBackgroundColor?: string;
  disabled?: boolean;
  loading?: boolean;
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
  disabled = false,
  loading = false,
}) => {
  const scale = useSharedValue(1);

  const pressIn = () => {
    if (disabled || loading) return;
    scale.value = withTiming(0.95, { duration: 80 });
    Vibration.vibrate(100);
  };

  const pressOut = () => {
    if (disabled || loading) return;
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
      disabled={disabled || loading}
      className={`px-5 py-3 rounded-xl ${width} ${height}
        ${
          active
            ? `${activeBackgroundColor} border border-[#508FE1]`
            : 'bg-[#F1F7FD]'
        }
        ${disabled || loading ? 'opacity-50' : 'opacity-100'}
      `}
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
            style={{ opacity: loading ? 0.5 : 1 }}
          >
            {title}
          </Text>

          {showIcon && !loading && <Image source={image} className="w-8 h-8" />}

          {loading && (
            <ActivityIndicator size="small" color={active ? '#fff' : '#999'} />
          )}
        </View>
      </Animated.View>
    </Pressable>
  );
};

export default AnimatedButton;
