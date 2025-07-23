import React, { createContext, useContext, useState, useEffect } from "react";
import {jwtDecode} from "jwt-decode";

interface User {
  id: number;
  email: string;
  name: string;
  surname: string;
  token: string;
}

interface DecodedToken {
  exp: number;
  [key: string]: any;
}

interface UserContextType {
  user: User | null;
  Login: (userData: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);

  // Token süresini kontrol et ve süresi dolmuşsa logout yap
  const checkTokenExpiration = (token: string) => {
    try {
      const decoded: DecodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;

      if (decoded.exp < currentTime) {
        logout();
      } else {
        // Token'ın süresi dolduğunda otomatik logout için zamanlayıcı kur
        const timeUntilExpiration = (decoded.exp - currentTime) * 1000;
        setTimeout(() => logout(), timeUntilExpiration);
      }
    } catch (error) {
      console.error("Token çözümleme hatası:", error);
      logout();
    }
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser: User = JSON.parse(storedUser);
      checkTokenExpiration(parsedUser.token);
      setUser(parsedUser);
    }
  }, []);

  const Login = (userData: User) => {
    localStorage.setItem("user", JSON.stringify(userData));
    checkTokenExpiration(userData.token);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  const value: UserContextType = {
    user,
    Login,
    logout,
    isAuthenticated: !!user,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

// Hook
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within a UserProvider");
  return context;
};
