import { Image, View } from 'react-native';
import { CustomSwitch, Text } from '@/shared/ui';
import { useZonesContext } from '@/context/ZonesContext';
import { getStorage } from '@/utils/storage';
import { useSms } from '@/context/SmsContext';
import { useAuth } from '@/context/AuthContext';
import { useTranslation } from 'react-i18next';
import { useThemeMode } from '@/hook/useThemeMode';

const CallMode = () => {
  const { call, updateZone, reload } = useZonesContext();

  const { sendSms, loading } = useSms();

  const { logout } = useAuth();

  const { isDark } = useThemeMode();

  const { t } = useTranslation();

  // ============================================
  // Device response:
  //
  // C:1 -> Call ON
  // C:0 -> Call OFF
  //
  // call.CALL contains the parsed value.
  // ============================================

  const isOn = call.CALL === '1' || call.CALL === 'ON';

  // ============================================
  // Change call mode
  // ============================================

  const callSwitchHandler = async (currentValue: boolean) => {
    const devicePhoneNumber = await getStorage('devicePhoneNumber');

    const password = await getStorage('password');

    const newValue = !currentValue;

    try {
      const sms = await sendSms(
        devicePhoneNumber ?? '',

        // ======================================
        // DO NOT CHANGE THE COMMAND
        //
        // Existing device command:
        //
        // PASSWORD CALLON
        // PASSWORD CALLOFF
        // ======================================

        `${password} CALL${newValue ? 'ON' : 'OFF'}`,

        `call_function_${newValue ? 'enabled.' : 'disabled.'}`,

        ['access_denied', 'SETADMIN'],
      );

      console.log('Call mode SMS:', sms);

      // ========================================
      // Successful command response
      //
      // Existing response:
      //
      // call_function_enabled.
      // call_function_disabled.
      // ========================================

      if (sms.body === `call_function_${newValue ? 'enabled.' : 'disabled.'}`) {
        // Keep local state compatible with
        // the existing context structure.
        await updateZone('CALL', newValue ? '1' : '0');
      }
    } catch (e) {
      if (e === 'SETADMIN') {
        logout();
      }
    }
  };

  return (
    <View
      className="
        mx-4 mt-6 p-3 rounded-xl
        flex-row items-center justify-between
        bg-blue-100 dark:bg-neutral-800
        border border-blue-200 dark:border-neutral-700
      "
    >
      {/* Left side */}

      <View className="flex-row items-center gap-2">
        <Image
          source={require('../shared/assets/icons/calling.gif')}
          className="w-10 h-10"
          style={{
            opacity: 0.9,
          }}
        />

        <Text className="text-black dark:text-white text-base font-medium">
          {t('general.callMode')}
        </Text>
      </View>

      {/* Switch */}

      <CustomSwitch
        value={isOn}
        inactiveColor={isDark ? '#171717' : '#E5E7EB'}
        inactiveThumbColor="#4B5563"
        activeThumbColor={isDark ? '#000' : '#fff'}
        showText
        textColorOn="#FFFFFF"
        textColorOff={isDark ? '#fff' : '#6B7280'}
        size="xs"
        darkModeIcons={false}
        switchHandler={callSwitchHandler}
        disabled={loading}
        // loading={loading}
      />
    </View>
  );
};

export default CallMode;
