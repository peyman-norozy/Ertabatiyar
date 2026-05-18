import { clearStorage, getStorage } from '@/utils/storage';
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';

type AuthContextType = {
  isLoggedIn: boolean | null;
  login: () => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    checkLogin();
  }, []);

  const checkLogin = async () => {
    try {
      const devicePhone = await getStorage('devicePhoneNumber');
      const otp = await getStorage('otp');
      const password = await getStorage('password');

      setIsLoggedIn(!!devicePhone && !!otp && !!password);
    } catch (e) {
      setIsLoggedIn(false);
    }
  };

  const login = () => setIsLoggedIn(true);

  const logout = async () => {
    setIsLoggedIn(false);
    await clearStorage();
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
