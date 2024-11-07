import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

import { AuthService } from '../services/auth/AuthService';

interface IUser {
  id: string;
  userName: string;
  cargo: string;
}

interface IAuthContextData {
  logout: () => void;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<string | void>;
  user: IUser | null;
}

const AuthContext = createContext({} as IAuthContextData);

const LOCAL_STORAGE_KEY__ACCESS_TOKEN = 'APP_ACCESS_TOKEN';

interface IAuthProviderProps {
  children: React.ReactNode;
}
export const AuthProvider: React.FC<IAuthProviderProps> = ({ children }) => {
  const [accessToken, setAccessToken] = useState<string>();
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    const accessToken = localStorage.getItem(LOCAL_STORAGE_KEY__ACCESS_TOKEN);
    const userInfo = localStorage.getItem('APP_USER_INFO');

    if (accessToken) {
      setAccessToken(accessToken);
      if (userInfo) {
        setUser(JSON.parse(userInfo));
      }
    } else {
      setAccessToken(undefined);
    }
  }, []);


  const handleLogin = useCallback(async (UserName: string, Password: string) => {
    const result = await AuthService.auth(UserName, Password);
    if (result instanceof Error) {
      return result.message;
    } else {
      localStorage.setItem(LOCAL_STORAGE_KEY__ACCESS_TOKEN, result.token);
      localStorage.setItem('APP_USER_INFO', JSON.stringify(result.user));
      setAccessToken(result.token);
      setUser(result.user);
    }
  }, []);

  const handleLogout = useCallback(() => {
    localStorage.removeItem(LOCAL_STORAGE_KEY__ACCESS_TOKEN);
    setAccessToken(undefined);
    setUser(null);
  }, []);

  const isAuthenticated = useMemo(() => !!accessToken, [accessToken]);


  return (
    <AuthContext.Provider value={{ isAuthenticated, login: handleLogin, logout: handleLogout, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);