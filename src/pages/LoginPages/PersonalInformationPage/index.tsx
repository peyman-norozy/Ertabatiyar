import React from 'react';
import { Image, View } from 'react-native';
import { logo } from '@/shared/assets/images';
import { Input } from '@/shared/ui';

const PersonalInformationPage = () => {
  return (
    <View className={'flex-1 items-center mt-[48px]'}>
      <View>
        <Image source={logo} className={'w-[124px] h-[117px]'} />
      </View>
      <View className={'mt-[56px] w-full'}>
        <View className={'w-full'}>
          <Input label="نام کامل" placeholder="پیمان ..." />
        </View>
        <View></View>
      </View>
    </View>
  );
};

export default PersonalInformationPage;
