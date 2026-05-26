import React from 'react';
import {
  Pressable,
  Vibration,
  Image,
  View,
  ActivityIndicator,
  Text,
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
  inActiveTitleColor = 'text-neutral-500 dark:text-neutral-400',
  activeBackgroundColor = 'bg-blue-600 dark:bg-blue-500',
  disabled = false,
  loading = false,
}) => {
  const scale = useSharedValue(1);

  const pressIn = () => {
    if (disabled || loading) return;
    scale.value = withTiming(0.96, { duration: 90 });

    // optional safer vibration
    Vibration.vibrate?.(50);
  };

  const pressOut = () => {
    if (disabled || loading) return;
    scale.value = withTiming(1, { duration: 90 });
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
      className={`
        ${width} ${height}
        rounded-xl
        flex-row items-center justify-center gap-2
        border
        ${
          active
            ? `${activeBackgroundColor} border-blue-500`
            : 'bg-white dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700'
        }
        ${disabled || loading ? 'opacity-50' : 'opacity-100'}
      `}
    >
      <Animated.View style={animatedStyle}>
        <View className="flex-row items-center justify-center gap-2">
          {/* Text */}
          <Text
            className={`${fontSize} font-yekan-semibold ${
              active ? 'text-white' : inActiveTitleColor
            }`}
          >
            {title}
          </Text>

          {/* Icon */}
          {showIcon && !loading && (
            <Image
              source={image}
              className="w-6 h-6"
              style={{ opacity: active ? 1 : 0.8 }}
            />
          )}

          {/* Loading */}
          {loading && (
            <ActivityIndicator
              size="small"
              color={active ? '#fff' : '#6B7280'}
            />
          )}
        </View>
      </Animated.View>
    </Pressable>
  );
};

export default AnimatedButton;
