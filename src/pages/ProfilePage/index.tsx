import { View } from 'react-native';
import { CustomBottomTab } from '@/shared/ui/bottomTab/ui';

export default function ProfilePage() {
  return (
    <View className={'flex-1'}>
      <View className={'p-5 flex-1 bg-white dark:bg-neutral-900'}></View>
      <CustomBottomTab />
    </View>
  );
}
