import React, { useEffect, useRef, useState } from 'react';
import { Animated, Easing, Image, StatusBar, View } from 'react-native';
import { logoBlue } from '@/shared/assets/images';
import { Text } from '@/shared/ui';

const AppLoadingScreen = () => {
  const scale = useRef(new Animated.Value(0.9)).current;

  const opacity = useRef(new Animated.Value(0)).current;

  const pulse = useRef(new Animated.Value(1)).current;

  const [dots, setDots] = useState('');

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),

      Animated.spring(scale, {
        toValue: 1,
        friction: 6,
        tension: 60,
        useNativeDriver: true,
      }),
    ]).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 1.08,
          duration: 900,
          useNativeDriver: true,
        }),

        Animated.timing(pulse, {
          toValue: 1,
          duration: 900,
          useNativeDriver: true,
        }),
      ]),
    ).start();

    const interval = setInterval(() => {
      setDots(prev => {
        if (prev === '') return '.';
        if (prev === '.') return '..';
        if (prev === '..') return '...';

        return '';
      });
    }, 400);

    return () => clearInterval(interval);
  }, []);

  return (
    <View className="flex-1 bg-white justify-center items-center px-6">
      <StatusBar backgroundColor="white" barStyle="dark-content" />

      <Animated.View
        style={{
          opacity,
          transform: [{ scale }, { scale: pulse }],
        }}
        className="items-center"
      >
        <Image
          source={logoBlue}
          className="w-[120px] h-[120px]"
          resizeMode="contain"
        />

        <Text className="text-[#020202] text-lg mt-5" font="font-yekan-bold">
          Smart Security
        </Text>

        <Text className="text-[#7A7A7A] text-sm mt-2" font="font-yekan-medium">
          در حال آماده‌سازی سیستم
          {dots}
        </Text>
      </Animated.View>
    </View>
  );
};

export default AppLoadingScreen;
