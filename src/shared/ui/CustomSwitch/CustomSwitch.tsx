import { useEffect } from 'react';
import {
  TouchableWithoutFeedback,
  View,
  Platform,
  I18nManager,
  Text,
  Vibration,
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
  size?: 'xs' | 'sm' | 'md' | 'lg';
  activeColor?: string;
  inactiveColor?: string;
  activeThumbColor?: string;
  inactiveThumbColor?: string;
  className?: string;
  disabled?: boolean;
  darkModeIcons?: boolean;
  showText?: boolean;
  textColorOn?: string;
  textColorOff?: string;
  switchHandler:(value: boolean) => void
}

export default function CustomSwitch({
  value,
  onValueChange,
  size = 'md',
  activeColor = '#3b82f6',
  inactiveColor = '#d1d5db',
  activeThumbColor = '#ffffff',
  inactiveThumbColor = '#ffffff',
  className = '',
  disabled = false,
  darkModeIcons = true,
  showText = false,
  textColorOn = '#ffffff',
  textColorOff = '#ffffff',
  switchHandler
}: CustomSwitchProps) {
  const translateX = useSharedValue(value ? 1 : 0);
  const isRTL = I18nManager.isRTL;
  const dir = isRTL ? -1 : 1;

  const sizes = {
    xs: { trackW: 42, trackH: 20, thumb: 16, iconSize: 10 },
    sm: { trackW: 44, trackH: 24, thumb: 20, iconSize: 16 },
    md: { trackW: 52, trackH: 28, thumb: 24, iconSize: 18 },
    lg: { trackW: 60, trackH: 32, thumb: 28, iconSize: 20 },
  } as const;

  const { trackW, trackH, thumb, iconSize } = sizes[size];
  const thumbMargin = 2;
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
          [1, 0],
          [thumbMargin * dir, (maxTravel + thumbMargin) * dir],
          Extrapolation.CLAMP,
        ),
      },
    ],
  }));

  const opacityOn = useAnimatedStyle(() => ({
    opacity: interpolate(translateX.value, [0, 1], [0, 1]),
  }));

  const opacityOff = useAnimatedStyle(() => ({
    opacity: interpolate(translateX.value, [0, 1], [1, 0]),
  }));

  const positionOn = useAnimatedStyle(() => ({
    left: trackW - (showText ? 28 : iconSize) - thumbMargin,
    right: thumbMargin,
  }));

  const positionOff = useAnimatedStyle(() => ({
    right: trackW - (showText ? 28 : iconSize) - thumbMargin,
    left: thumbMargin,
  }));

  const verticalAlign = (trackH - (showText ? 16 : iconSize)) / 2;

  const handlePress = () => {
    console.log(value,'jsdfuuegggg')
    switchHandler(value)
    if (!disabled) {
      onValueChange(!value);
      Vibration.vibrate(100);
    }

  };

  const thumbStyleStatic: any = {
    width: thumb,
    height: thumb,
    backgroundColor: value ? activeThumbColor : inactiveThumbColor,
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
          {darkModeIcons && (
            <>
              <Animated.View
                style={[
                  opacityOn,
                  positionOn,
                  { position: 'absolute', top: verticalAlign },
                ]}
              >
                <LightMode width={iconSize} height={iconSize} fill="#fff" />
              </Animated.View>

              <Animated.View
                style={[
                  opacityOff,
                  positionOff,
                  { position: 'absolute', top: verticalAlign },
                ]}
              >
                <DarkMode width={iconSize} height={iconSize} fill="#fff" />
              </Animated.View>
            </>
          )}

          {showText && (
            <>
              <Animated.View
                style={[
                  opacityOn,
                  positionOn,
                  {
                    position: 'absolute',
                    height: trackH,
                    justifyContent: 'center',
                    alignItems: 'center',
                    ...(isRTL ? { right: -16 } : { left: 'auto', right: 2 }),
                  },
                ]}
              >
                <Text
                  style={{
                    color: textColorOn,
                    fontSize: size === 'xs' ? 10 : 12,
                    fontWeight: '600',
                    includeFontPadding: false,
                    textAlign: 'center',
                    lineHeight: size === 'xs' ? 12 : 14,
                    paddingHorizontal: 2,
                  }}
                >
                  ON
                </Text>
              </Animated.View>

              <Animated.View
                style={[
                  opacityOff,
                  positionOff,
                  {
                    position: 'absolute',
                    height: trackH,
                    justifyContent: 'center',
                    alignItems: 'center',
                    ...(isRTL ? { left: 2 } : { left: 2, right: 'auto' }),
                  },
                ]}
              >
                <Text
                  style={{
                    color: textColorOff,
                    fontSize: size === 'xs' ? 10 : 12,
                    fontWeight: '600',
                    includeFontPadding: false,
                    textAlign: 'center',
                    lineHeight: size === 'xs' ? 12 : 14,
                    paddingHorizontal: 2,
                  }}
                >
                  OFF
                </Text>
              </Animated.View>
            </>
          )}

          <Animated.View style={[thumbAnimatedStyle, thumbStyleStatic]} />
        </Animated.View>
      </View>
    </TouchableWithoutFeedback>
  );
}
