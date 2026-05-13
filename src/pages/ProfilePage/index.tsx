import { useEffect, useState } from 'react';
import { View, TextInput, Button, Alert, NativeModules } from 'react-native';
import { CustomBottomTab } from '@/shared/ui/bottomTab/ui';
import { Text } from '@/shared/ui';
import { useTranslation } from 'react-i18next';

const { SmsModule } = NativeModules;

export default function ProfilePage() {
  const { t } = useTranslation();
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
      .catch((err: { message: string | undefined; }) => {
        Alert.alert('❌ خطا', err.message);
      });
  };

  return (
    <View className={'flex-1'}>
      <View className={'p-5 flex-1 bg-red-500'}>
        <Text>
          {t('general.currentNumber')} {savedNumber || t('general.notSet')}
        </Text>
        <TextInput
          value={number}
          onChangeText={setNumber}
          placeholder={t('general.saveNumberPlaceholder')}
          style={{
            borderWidth: 1,
            borderColor: '#ccc',
            padding: 10,
            marginVertical: 10,
            borderRadius: 8,
          }}
          keyboardType="phone-pad"
        />
        <Button title={t('general.saveNumber')} onPress={saveNumber} />
      </View>
      <CustomBottomTab />
    </View>
  );
}
