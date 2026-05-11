import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  TouchableOpacity,
  Animated,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  Home,
  Notification,
  Profile,
  Synchronization,
} from '@/shared/assets/icons';
import { Text } from '@/shared/ui';
import { useTranslation } from 'react-i18next';
import { RootDrawerParamList } from '@/shared/ui/header/model';
import { getStorage, setStorage } from '@/utils/storage';
import { useSms } from '@/hook/useSms';
import { useAuth } from '@/context/AuthContext';
import { parseDeviceSms } from '@/utils/parseDeviceSms';
import { useZonesContext } from '@/context/ZonesContext';

const COOLDOWN_KEY = 'syncCooldownUntil';

const CustomBottomTab: React.FC = () => {
  const { t } = useTranslation();
  const { sendSms, setAllowedNumber, loading, lastSms } = useSms();
  const { logout } = useAuth();
  const [cooldown, setCooldown] = useState(false);
  const { reload } = useZonesContext();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootDrawerParamList>>();
  const route = useRoute();

  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handleTabPress = (routeName: keyof RootDrawerParamList) => {
    if (route.name !== routeName) {
      navigation.navigate(routeName as any);
    }
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
        const now = Date.now();
        const cooldownUntil = now + 2 * 60 * 1000;

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

      if (saved) {
        const remaining = Number(saved) - Date.now();

        if (remaining > 0) {
          setCooldown(true);

          setTimeout(() => {
            setCooldown(false);
          }, remaining);
        } else {
          setCooldown(false);
        }
      }
    };

    checkCooldown();
  }, []);
  console.log(cooldown, 'ueueueyryry');

  return (
    <View className="h-[80px] bg-white border rounded-t-[40px] border-gray-200 justify-center">
      <View className="absolute self-center -top-8 z-10 items-center">
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handleSync}
          disabled={loading || cooldown}
          className="bg-[#F9F9F9] rounded-full p-2"
        >
          <Animated.View
            style={{
              transform: [{ scale: scaleAnim }],
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.2,
              shadowRadius: 6,
              elevation: 6,
              opacity: loading || cooldown ? 0.5 : 1,
            }}
            className={`w-[50px] h-[50px] rounded-full ${
              cooldown ? 'bg-[#A2A2A2]' : ' bg-[#3260C3]'
            } items-center justify-center`}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Synchronization
                width={26}
                height={26}
                stroke={loading ? '#3E9911' : '#FFFFFF'}
              />
            )}
          </Animated.View>
        </TouchableOpacity>

        <Text
          className={`mt-2  text-sm ${
            loading ? 'text-[#3260C3] font-yekan-bold' : ' text-[#616161]'
          }`}
        >
          {t('customBottom.tabs.synchronization' as any)}
        </Text>
      </View>

      <View className="flex-row justify-between px-10">
        <TouchableOpacity
          onPress={() => handleTabPress('NotificationPage')}
          className="items-center"
        >
          <Notification
            width={24}
            height={24}
            stroke={route.name === 'NotificationPage' ? '#3260C3' : '#616161'}
          />
          <Text
            className={`mt-1 text-sm ${
              route.name === 'NotificationPage'
                ? 'text-[#3260C3] font-yekan-bold'
                : 'text-[#616161]'
            }`}
          >
            {t('customBottom.tabs.notificationTitle' as any)}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleTabPress('ProfilePage')}
          className="items-center"
        >
          <Profile
            width={24}
            height={24}
            stroke={route.name === 'ProfilePage' ? '#3260C3' : '#616161'}
          />
          <Text
            className={`mt-1 text-sm ${
              route.name === 'ProfilePage'
                ? 'text-[#3260C3] font-yekan-bold'
                : 'text-[#616161]'
            }`}
          >
            {t('customBottom.tabs.profileTitle' as any)}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomBottomTab;
