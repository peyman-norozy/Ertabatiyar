import { View } from 'react-native';
import { CustomSwitchTheme } from '@/shared/ui';
import { useThemeMode } from '@/hook/useThemeMode';

export default function ThemeSwitcher() {
  const { isDark, ready, setTheme } = useThemeMode();

  if (!ready) return null;

  return (
    <View>
      <CustomSwitchTheme value={isDark} switchHandler={setTheme} />
    </View>
  );
}
