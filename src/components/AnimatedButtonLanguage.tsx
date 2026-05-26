import React from 'react';
import {
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

const AnimatedButtonLanguage: React.FC<AnimatedButtonTypeProps> = ({
  active,
  onPress,
  image,
  showIcon,
  width,
  height,
  activeBackgroundColor = 'bg-blue-600',
  disabled = false,
  loading = false,
}) => {
  const scale = useSharedValue(1);

  const pressIn = () => {
    if (disabled || loading) return;
    scale.value = withTiming(0.95, { duration: 80 });
    Vibration.vibrate(80);
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
      className={`
        px-5 py-3 rounded-3xl
        ${width} ${height}
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
        <View className="flex-col items-center justify-center gap-4">
          {showIcon && !loading && (
            <Image
              source={image}
              className="h-[91px] w-[91px]"
              style={{
                opacity: active ? 1 : 0.8,
              }}
            />
          )}

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

export default AnimatedButtonLanguage;
