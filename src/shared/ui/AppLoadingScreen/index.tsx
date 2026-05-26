import { useEffect, useRef, useState } from 'react';
import { Animated, Image, StatusBar, View } from 'react-native';
import { logo } from '@/shared/assets/images';
import { Text } from '@/shared/ui';
import { useTranslation } from 'react-i18next';

const AppLoadingScreen = () => {
  const { t } = useTranslation();
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
    <View className="flex-1 bg-blue-800 justify-center items-center px-6">
      <StatusBar backgroundColor="white" barStyle="dark-content" />

      <Animated.View
        style={{
          opacity,
          transform: [{ scale }, { scale: pulse }],
        }}
        className="items-center"
      >
        <Image
          source={logo}
          className="w-[150px] h-[150px]"
          resizeMode="contain"
        />
        <Text className="text-white text-base mt-6" font="font-yekan-medium">
          {t('general.loading')}
          {dots}
        </Text>
      </Animated.View>
    </View>
  );
};

export default AppLoadingScreen;
