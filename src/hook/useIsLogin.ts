import { useAuth } from '@/context/AuthContext';
import { getStorage } from '@/utils/storage';
import { useEffect, useState } from 'react';

export const useIsLogin = () => {
  const { login } = useAuth();
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [devicePhoneNumber, setDevicePhoneNumber] = useState('');
  const [userPhoneNumber, setUserPhoneNumber] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    (async () => {
      const device = await getStorage('devicePhoneNumber');
      const userPhone = await getStorage('userPhoneNumber');
      const userPassword = await getStorage('password');
      if (device && userPhone && userPassword) {
        login();
      } else {
        setDevicePhoneNumber(device as string);
        setUserPhoneNumber(userPhone as string);
        setPassword(userPassword as string);
      }
    })();
  }, [isLogin]);

  return {
    devicePhoneNumber,
    userPhoneNumber,
    password,
    setPassword,
    setUserPhoneNumber,
    isLogin,
    setIsLogin,
  };
};
