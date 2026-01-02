// import React from 'react';
// import { Text, View } from 'react-native';
// import { CustomBottomTab } from '@/shared/ui/bottomTab/ui';
//
// const ProfilePage = () => {
//   return (
//     <View className="flex-1 justify-between">
//       <View className="flex-1 items-center justify-center">
//         <Text className="text-lg">صفحه پروفایل</Text>
//       </View>
//     </View>
//   );
// };
//
// export default ProfilePage;

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  NativeModules,
} from 'react-native';
import { CustomBottomTab } from '@/shared/ui/bottomTab/ui';

const { SmsModule } = NativeModules;

export default function ProfilePage() {
  const [number, setNumber] = useState('');
  const [savedNumber, setSavedNumber] = useState('');

  useEffect(() => {
    SmsModule.getAllowedNumber().then((num: string) => {
      if (num) setSavedNumber(num);
    });
  }, []);

  const saveNumber = () => {
    SmsModule.setAllowedNumber(number)
      .then((msg: string) => {
        Alert.alert('✅', msg);
        setSavedNumber(number);
        setNumber('');
      })
      .catch(err => {
        Alert.alert('❌ خطا', err.message);
      });
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>شماره فعلی مجاز: {savedNumber || 'تنظیم نشده'}</Text>
      <TextInput
        value={number}
        onChangeText={setNumber}
        placeholder="مثال: +989123456789"
        style={{
          borderWidth: 1,
          borderColor: '#ccc',
          padding: 10,
          marginVertical: 10,
          borderRadius: 8,
        }}
        keyboardType="phone-pad"
      />
      <Button title="ذخیره شماره" onPress={saveNumber} />
      <CustomBottomTab />
    </View>
  );
}
