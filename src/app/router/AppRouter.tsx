import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { linking } from '@/shared';
import { AuthNavigator } from '@/app/router/AuthNavigator.tsx';
import { AppDrawer } from '@/app/router/AppDrawer.tsx';
import { AuthProvider, useAuth } from '@/context/AuthContext.tsx';
import { AppLoadingScreen } from '@/shared/ui';
import { useEffect, useState } from 'react';
import { checkLanguage } from '@/utils/checkLanguage';

const Stack = createNativeStackNavigator();

export const AppRouter = () => {
  return (
    <AuthProvider>
      <InnerAppRouter />
    </AuthProvider>
  );
};

const InnerAppRouter = () => {
  const { isLoggedIn } = useAuth();

  const [loading, setLoading] = useState(true);
  const [hasLang, setHasLang] = useState(false);

  useEffect(() => {
    if (isLoggedIn === false) {
      checkLanguage().then(Lang => {
        setHasLang(Lang);
        setLoading(false);
      });
    }
  }, [isLoggedIn]);

  if (!isLoggedIn && loading) {
    return <AppLoadingScreen />;
  }

  return (
    <GestureHandlerRootView className={'flex-1'}>
      <NavigationContainer linking={linking}>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          {isLoggedIn ? (
            <Stack.Screen name="App" component={AppDrawer} />
          ) : (
            <Stack.Screen name="Auth">
              {props => <AuthNavigator {...props} hasLang={hasLang} />}
            </Stack.Screen>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};
