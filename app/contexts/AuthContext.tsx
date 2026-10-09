
"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

interface AuthContextType {
  token: string | null;
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const tokenSalvo = sessionStorage.getItem("token");

    if (tokenSalvo) {
    // eslint-disable-next-line react-hooks/set-state-in-effect
      setToken(tokenSalvo);
    }
  }, []);

  function login(novoToken: string) {
    sessionStorage.setItem("token", novoToken);
    setToken(novoToken);
  }

  function logout() {
    sessionStorage.removeItem("token");
    setToken(null);
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        isAuthenticated: !!token,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth deve estar dentro de AuthProvider");
  }

  return context;
}
