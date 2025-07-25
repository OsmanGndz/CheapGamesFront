import React, { createContext, useContext, useState, useEffect } from "react";
import {jwtDecode} from "jwt-decode";


interface DecodedToken {
  exp: number;
  [key: string]: any;
}

interface UserContextType {
  token: string | null;
  Login: (token:string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<string | null>(null);

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
    const stroredToken = localStorage.getItem("token");
    if (stroredToken) {
      const parsedToken: string = JSON.parse(stroredToken);
      checkTokenExpiration(parsedToken);
      setToken(parsedToken);
    }
  }, []);

  const Login = (token: string) => {
    localStorage.setItem("token", JSON.stringify(token));
    checkTokenExpiration(token);
    setToken(token);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  const value: UserContextType = {
    token,
    Login,
    logout,
    isAuthenticated: !!token,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

// Hook
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within a UserProvider");
  return context;
};
