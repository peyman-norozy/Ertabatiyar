import React, { useEffect, useRef } from 'react';
import { Animated, Dimensions, View } from 'react-native';
import { Text } from '@/shared/ui';

const { width } = Dimensions.get('window');

type Props = {
  message: string;
  type?: 'success' | 'error' | 'warning';
};

const Toast = ({ message, type = 'success' }: Props) => {
  // 👇 شروع از پایین
  const translateY = useRef(new Animated.Value(120)).current;

  useEffect(() => {
    // 👇 بیاد بالا
    Animated.timing(translateY, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();

    const timer = setTimeout(() => {
      // 👇 برگرده پایین
      Animated.timing(translateY, {
        toValue: 120,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }, 3200);

    return () => clearTimeout(timer);
  }, []);

  const backgroundColor =
    type === 'success' ? '#22C55E' : type === 'error' ? '#EF4444' : '#F59E0B';

  return (
    <Animated.View
      style={{
        transform: [{ translateY }],
        position: 'absolute',
        bottom: 40, // 👈 پایین صفحه
        alignSelf: 'center',
        width: width * 0.9,
        zIndex: 9999,
      }}
    >
      <View
        style={{
          backgroundColor,
          paddingVertical: 14,
          paddingHorizontal: 16,
          borderRadius: 14,
        }}
      >
        <Text className={'text-white text-center'}>{message}</Text>
      </View>
    </Animated.View>
  );
};

export default Toast;
