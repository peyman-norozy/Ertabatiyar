import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  TouchableOpacity,
  Animated,
  ActivityIndicator,
} from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useNavigation, useRoute } from '@react-navigation/native';

import { Chart, SimCard, Synchronization } from '@/shared/assets/icons';

import { Text } from '@/shared/ui';
import { useTranslation } from 'react-i18next';
import { getStorage, setStorage } from '@/utils/storage';
import { useSms } from '@/hook/useSms';
import { useAuth } from '@/context/AuthContext';
import { parseDeviceSms } from '@/utils/parseDeviceSms';
import { useZonesContext } from '@/context/ZonesContext';

const COOLDOWN_KEY = 'syncCooldownUntil';

type Props = Partial<BottomTabBarProps>;

const CustomBottomTab: React.FC<Props> = ({
  state,
  navigation: tabNavigation,
}) => {
  const { t } = useTranslation();

  const navigation = useNavigation();
  const route = useRoute();

  const { sendSms, loading } = useSms();
  const { logout } = useAuth();
  const { reload } = useZonesContext();

  const [cooldown, setCooldown] = useState(false);

  const scaleAnim = useRef(new Animated.Value(1)).current;

  // route فعلی
  const currentRoute = state?.routes?.[state.index ?? 0]?.name ?? route.name;

  const handleTabPress = (routeName: string) => {
    if (currentRoute === routeName) return;

    // اگر داخل Tab.Navigator بود
    if (tabNavigation && state) {
      tabNavigation.navigate(routeName);
      return;
    }

    // fallback برای استفاده‌های دیگه
    navigation.navigate(routeName as never);
  };

  const handleSync = async () => {
    const devicePhoneNumber = (await getStorage('devicePhoneNumber')) ?? '';

    const password = (await getStorage('password')) ?? '';

    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.85,
        duration: 80,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 120,
        useNativeDriver: true,
      }),
    ]).start();

    try {
      const sms = await sendSms(
        devicePhoneNumber,
        `${password} GETALL`,
        'CALL:',
        ['access_denied', 'SETADMIN'],
      );

      if (sms.body.includes('CALL:')) {
        const parsedData = parseDeviceSms(sms.body);

        await setStorage('deviceZones', JSON.stringify(parsedData));

        const cooldownUntil = Date.now() + 2 * 60 * 1000;

        await setStorage(COOLDOWN_KEY, cooldownUntil.toString());

        reload();
        setCooldown(true);

        setTimeout(() => {
          setCooldown(false);
        }, 2 * 60 * 1000);
      }
    } catch (e) {
      if (e === 'SETADMIN') {
        logout();
      }
    }
  };

  useEffect(() => {
    const checkCooldown = async () => {
      const saved = await getStorage(COOLDOWN_KEY);

      if (!saved) return;

      const remaining = Number(saved) - Date.now();

      if (remaining > 0) {
        setCooldown(true);

        setTimeout(() => {
          setCooldown(false);
        }, remaining);
      } else {
        setCooldown(false);
      }
    };

    checkCooldown();
  }, []);

  return (
    <View className='absolute bottom-0 w-full z-40'>
      <View className="h-[80px] bg-white dark:bg-neutral-800 border rounded-t-[40px] border-gray-200 dark:border-neutral-800 justify-center">
        {/* Sync Button */}
        <View className="absolute self-center -top-8 z-10 items-center">
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={handleSync}
            disabled={loading || cooldown}
            className="bg-[#F9F9F9] dark:bg-neutral-900 rounded-full p-2"
          >
            <Animated.View
              style={{
                transform: [{ scale: scaleAnim }],
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 4,
                },
                shadowOpacity: 0.2,
                shadowRadius: 6,
                elevation: 6,
                opacity: loading || cooldown ? 0.5 : 1,
              }}
              className={`w-[50px] h-[50px] rounded-full ${
                cooldown ? 'bg-[#A2A2A2]' : 'bg-[#3260C3]'
              } items-center justify-center`}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Synchronization width={26} height={26} stroke="#FFFFFF" />
              )}
            </Animated.View>
          </TouchableOpacity>

          <Text
            className={`mt-2 text-sm ${
              loading ? 'text-[#3260C3] font-yekan-bold' : 'text-[#616161]'
            }`}
          >
            {t('customBottom.tabs.synchronization')}
          </Text>
        </View>

        {/* Tabs */}
        <View className="flex-row justify-between px-10">
          <TouchableOpacity
            onPress={() => handleTabPress('NotificationPage')}
            className="items-center"
          >
            <SimCard
              width={24}
              height={24}
              stroke={
                currentRoute === 'NotificationPage' ? '#3260C3' : '#616161'
              }
            />

            <Text
              className={`mt-1 text-sm ${
                currentRoute === 'NotificationPage'
                  ? 'text-[#3260C3] font-yekan-bold'
                  : 'text-[#616161]'
              }`}
            >
              {t('customBottom.tabs.simCart')}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => handleTabPress('ProfilePage')}
            className="items-center"
          >
            <Chart
              width={24}
              height={24}
              stroke={currentRoute === 'ProfilePage' ? '#3260C3' : '#616161'}
            />

            <Text
              className={`mt-1 text-sm ${
                currentRoute === 'ProfilePage'
                  ? 'text-[#3260C3] font-yekan-bold'
                  : 'text-[#616161]'
              }`}
            >
              {t('customBottom.tabs.anten')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default CustomBottomTab;
