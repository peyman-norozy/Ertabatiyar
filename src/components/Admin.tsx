import React from 'react';
import { Image, View } from 'react-native';
import { Text } from '@/shared/ui';
import { Add } from '@/shared/assets/icons';

const Admin = () => {
  return (
    <View
      className={
        'bg-white border border-[#EFEFEF] mx-4 mt-6 rounded-lg p-3 flex mb-5'
      }
    >
      <Text
        className={'text-[#020202] text-base text-start'}
        font={'font-yekan-medium'}
      >
        ادمین
      </Text>
      <Text
        className={'text-[#616161] text-sm mt-3'}
        font={'font-yekan-medium'}
      >
        لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ
      </Text>
      <Text
        className={'text-[#616161] text-sm mt-2'}
        font={'font-yekan-medium'}
      >
        لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ
      </Text>
      <View className={'flex justify-center items-center mt-8'}>
        <Add width={58} height={58} />
      </View>
    </View>
  );
};

export default Admin;
