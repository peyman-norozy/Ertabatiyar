import React, { useState } from 'react';
import { Image, View } from 'react-native';
import { CustomSwitch, Text } from '@/shared/ui';

const CallMode = () => {
  const [notifications, setNotifications] = useState(false);

  return (
    <View
      className={
        'bg-[#C6DFF7] mx-4 mt-6 rounded-lg p-3 flex-row items-center justify-between'
      }
    >
      <View className={'flex-row items-center gap-2'}>
        <Image
          source={require('../shared/assets/icons/calling.gif')}
          className={'w-10 h-10'}
        />

        <Text className={'text-[#020202] text-base'} font={'font-yekan-medium'}>
          حالت تماس
        </Text>
      </View>
      <CustomSwitch
        value={notifications}
        onValueChange={setNotifications}
        activeColor="#3E9911"
        inactiveColor={'#E2E2E2'}
        inactiveThumbColor={'#414141'}
        activeThumbColor={'#FFFFFF'}
        showText={true}
        textColorOn={'#FFFFFF'}
        textColorOff={'#616161'}
        size={'xs'}
        darkModeIcons={false}
      />
    </View>
  );
};

export default CallMode;
