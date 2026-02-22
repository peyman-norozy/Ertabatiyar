import React, { useState } from 'react';
import { Pressable, View } from 'react-native';
import { CustomSwitch, Text } from '@/shared/ui';
import { ArrowLeft, Setting, Signal } from '@/shared/assets/icons';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp, RootDrawerParamList } from '@/shared/ui/header/model';

const SensorsCard = () => {
  const [notifications, setNotifications] = useState(false);
  const navigation = useNavigation<NavigationProp>();

  return (
    <View>
      <View className={'flex-row-reverse justify-between'}>
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
        <Signal
          width={24}
          height={24}
          stroke={notifications ? '#3E9911' : '#616161'}
          fill="none"
        />
      </View>
      <Pressable
        onPress={() =>
          navigation.navigate('ZoneSettingsPage' as keyof RootDrawerParamList)
        }
      >
        <View>
          <Text
            className={'text-[#020202] mt-4 text-sm'}
            font={'font-yekan-medium'}
          >
            عنوان ۱
          </Text>
        </View>
        <View className={'mt-4 flex-row items-center gap-1'}>
          <Setting width={15} height={15} />
          <Text className={'text-[#616161] text-sm'} font={'font-yekan-medium'}>
            واکنش اضطراری
          </Text>
          <ArrowLeft width={14} height={14} />
        </View>
      </Pressable>
    </View>
  );
};

export default SensorsCard;
