import React, { useEffect } from 'react';
import {
  TouchableWithoutFeedback,
  View,
  Platform,
  I18nManager,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  interpolateColor,
  Extrapolation,
  interpolate,
} from 'react-native-reanimated';
import { DarkMode, LightMode } from '@/shared/assets/icons';

interface CustomSwitchProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
  size?: 'sm' | 'md' | 'lg';
  activeColor?: string;
  inactiveColor?: string;
  thumbColor?: string;
  className?: string;
  disabled?: boolean;
}

export default function CustomSwitch({
  value,
  onValueChange,
  size = 'md',
  activeColor = '#3b82f6',
  inactiveColor = '#d1d5db',
  thumbColor = '#ffffff',
  className = '',
  disabled = false,
}: CustomSwitchProps) {
  const translateX = useSharedValue(value ? 1 : 0);
  const isRTL = I18nManager.isRTL;
  const dir = isRTL ? -1 : 1;

  const sizes = {
    sm: { trackW: 44, trackH: 24, thumb: 20, iconSize: 16 },
    md: { trackW: 52, trackH: 28, thumb: 24, iconSize: 18 },
    lg: { trackW: 60, trackH: 32, thumb: 28, iconSize: 20 },
  } as const;

  const { trackW, trackH, thumb, iconSize } = sizes[size];
  const thumbMargin = 4;
  const maxTravel = trackW - thumb - thumbMargin * 2;

  useEffect(() => {
    translateX.value = withSpring(value ? 1 : 0, {
      damping: 20,
      stiffness: 150,
    });
  }, [value]);

  const trackStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      translateX.value,
      [0, 1],
      [inactiveColor!, activeColor!],
    ),
  }));

  const thumbAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: interpolate(
          translateX.value,
          [0, 1],
          [thumbMargin * dir, (maxTravel + thumbMargin) * dir],
          Extrapolation.CLAMP,
        ),
      },
    ],
  }));

  const iconOpacityOn = useAnimatedStyle(() => ({
    opacity: interpolate(translateX.value, [0, 1], [0, 1]),
  }));

  const iconOpacityOff = useAnimatedStyle(() => ({
    opacity: interpolate(translateX.value, [0, 1], [1, 0]),
  }));

  const iconOnPosition = useAnimatedStyle(() => ({
    left: isRTL ? thumbMargin : trackW - iconSize - thumbMargin,
  }));

  const iconOffPosition = useAnimatedStyle(() => ({
    left: isRTL ? trackW - iconSize - thumbMargin : thumbMargin,
  }));

  const iconVertical = (trackH - iconSize) / 2;

  const handlePress = () => {
    if (!disabled) onValueChange(!value);
  };

  const thumbStyleStatic: any = {
    width: thumb,
    height: thumb,
    backgroundColor: thumbColor,
    position: 'absolute',
    top: (trackH - thumb) / 2,
    borderRadius: thumb / 2,
  };

  if (Platform.OS === 'ios') {
    thumbStyleStatic.shadowColor = '#000';
    thumbStyleStatic.shadowOffset = { width: 0, height: 2 };
    thumbStyleStatic.shadowOpacity = 0.25;
    thumbStyleStatic.shadowRadius = 3.5;
  } else {
    thumbStyleStatic.elevation = 4;
  }

  return (
    <TouchableWithoutFeedback onPress={handlePress} disabled={disabled}>
      <View className={`items-center justify-center ${className}`}>
        <Animated.View
          style={[
            trackStyle,
            {
              width: trackW,
              height: trackH,
              borderRadius: trackH / 2,
              overflow: 'hidden',
              opacity: disabled ? 0.6 : 1,
            },
          ]}
        >
          {/* روشن */}
          <Animated.View
            style={[
              iconOpacityOn,
              iconOnPosition,
              { position: 'absolute', top: iconVertical },
            ]}
          >
            <LightMode width={iconSize} height={iconSize} fill="#fff" />
          </Animated.View>

          {/* خاموش */}
          <Animated.View
            style={[
              iconOpacityOff,
              iconOffPosition,
              { position: 'absolute', top: iconVertical },
            ]}
          >
            <DarkMode width={iconSize} height={iconSize} fill="#fff" />
          </Animated.View>

          {/* thumb */}
          <Animated.View style={[thumbAnimatedStyle, thumbStyleStatic]} />
        </Animated.View>
      </View>
    </TouchableWithoutFeedback>
  );
}
