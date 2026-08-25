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
const COOLDOWN_DURATION = 2 * 60 * 1000;

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

  const cooldownTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  /**
   * Route فعلی
   */
  const currentRoute = state?.routes?.[state.index ?? 0]?.name ?? route.name;

  /**
   * تغییر Tab
   */
  const handleTabPress = (routeName: string) => {
    if (currentRoute === routeName) {
      return;
    }

    if (tabNavigation && state) {
      tabNavigation.navigate(routeName);
      return;
    }

    navigation.navigate(routeName as never);
  };

  /**
   * شروع cooldown
   */
  const startCooldown = async () => {
    const cooldownUntil = Date.now() + COOLDOWN_DURATION;

    await setStorage(COOLDOWN_KEY, cooldownUntil.toString());

    setCooldown(true);

    if (cooldownTimerRef.current) {
      clearTimeout(cooldownTimerRef.current);
    }

    cooldownTimerRef.current = setTimeout(() => {
      setCooldown(false);
      cooldownTimerRef.current = null;
    }, COOLDOWN_DURATION);
  };

  /**
   * Synchronization
   */
  const handleSync = async () => {
    if (loading || cooldown) {
      return;
    }

    const devicePhoneNumber = (await getStorage('devicePhoneNumber')) ?? '';

    const password = (await getStorage('password')) ?? '';

    /**
     * Animation
     */
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
      /**
       * دستور دستگاه همان GETALL قبلی است.
       *
       * PASSWORD GETALL
       */
      const sms = await sendSms(
        devicePhoneNumber,
        `${password} GETALL`,
        'SYS:',
        ['access_denied', 'SETADMIN'],
      );

      console.log('GETALL response:', sms.body);

      /**
       * پاسخ جدید چیزی شبیه:
       *
       * SYS:D C:1
       * Z1:O/B/I/0/0
       * Z2:O/B/1/0/0
       * Z3:O/B/1/0/0
       * Z4:O/B/I/0/0
       * Z5:O/B/1/0/0
       *
       * بنابراین فقط کافی است پاسخ را با
       * parser جدید parse کنیم.
       */
      if (sms.body.includes('SYS:')) {
        const parsedData = parseDeviceSms(sms.body);

        console.log('Parsed GETALL:', parsedData);

        /**
         * ذخیره اطلاعات جدید دستگاه
         */
        await setStorage('deviceZones', JSON.stringify(parsedData));

        /**
         * Context را دوباره از Storage بخوان
         */
        await reload();

        /**
         * شروع cooldown فقط وقتی Sync موفق بوده
         */
        await startCooldown();
      }
    } catch (e: any) {
      console.log('GETALL error:', e);

      if (e === 'SETADMIN') {
        logout();
      }
    }
  };

  /**
   * بررسی cooldown هنگام mount
   */
  useEffect(() => {
    const checkCooldown = async () => {
      try {
        const saved = await getStorage(COOLDOWN_KEY);

        if (!saved) {
          return;
        }

        const cooldownUntil = Number(saved);
        const remaining = cooldownUntil - Date.now();

        if (remaining <= 0) {
          setCooldown(false);

          await setStorage(COOLDOWN_KEY, '0');

          return;
        }

        setCooldown(true);

        if (cooldownTimerRef.current) {
          clearTimeout(cooldownTimerRef.current);
        }

        cooldownTimerRef.current = setTimeout(() => {
          setCooldown(false);
          cooldownTimerRef.current = null;
        }, remaining);
      } catch (e) {
        console.log('checkCooldown error:', e);
      }
    };

    checkCooldown();

    /**
     * cleanup
     */
    return () => {
      if (cooldownTimerRef.current) {
        clearTimeout(cooldownTimerRef.current);
      }
    };
  }, []);

  const syncDisabled = loading || cooldown;

  return (
    <View className="absolute bottom-0 w-full z-40">
      <View
        className="
          h-[80px]
          bg-white dark:bg-neutral-800
          border
          rounded-t-[40px]
          border-gray-200 dark:border-neutral-800
          justify-center
        "
      >
        {/* ========================= */}
        {/* SYNC BUTTON */}
        {/* ========================= */}

        <View
          className="
            absolute
            self-center
            -top-8
            z-10
            items-center
          "
        >
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={handleSync}
            disabled={syncDisabled}
          >
            <Animated.View
              style={{
                transform: [
                  {
                    scale: scaleAnim,
                  },
                ],
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 4,
                },
                shadowOpacity: 0.2,
                shadowRadius: 6,
                elevation: 6,
                opacity: syncDisabled ? 0.5 : 1,
              }}
              className={`
                w-[50px]
                h-[50px]
                rounded-full
                items-center
                justify-center
                ${cooldown ? 'bg-[#A2A2A2]' : 'bg-[#3260C3]'}
              `}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Synchronization width={26} height={26} stroke="#FFFFFF" />
              )}
            </Animated.View>
          </TouchableOpacity>

          <Text
            className={`
              mt-2
              text-sm
              ${
                loading
                  ? 'text-[#3260C3] font-yekan-bold'
                  : cooldown
                  ? 'text-[#A2A2A2]'
                  : 'text-[#616161]'
              }
            `}
          >
            {t('customBottom.tabs.synchronization')}
          </Text>
        </View>

        {/* ========================= */}
        {/* TABS */}
        {/* ========================= */}

        <View className="flex-row justify-between px-10">
          {/* Notification */}

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
              className={`
                mt-1
                text-sm
                ${
                  currentRoute === 'NotificationPage'
                    ? 'text-[#3260C3] font-yekan-bold'
                    : 'text-[#616161]'
                }
              `}
            >
              {t('customBottom.tabs.simCart')}
            </Text>
          </TouchableOpacity>

          {/* Profile */}

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
              className={`
                mt-1
                text-sm
                ${
                  currentRoute === 'ProfilePage'
                    ? 'text-[#3260C3] font-yekan-bold'
                    : 'text-[#616161]'
                }
              `}
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
