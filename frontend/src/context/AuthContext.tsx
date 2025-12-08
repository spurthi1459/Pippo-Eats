// frontend/src/context/AuthContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";

type User = { id: string; name?: string; email?: string } | null;

type AuthContextShape = {
  user: User;
  login: (user: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
};

const defaultAuth: AuthContextShape = {
  user: null,
  login: () => {},
  logout: () => {},
  isAuthenticated: false,
};

const AuthContext = createContext<AuthContextShape>(defaultAuth);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>(null);

  function login(u: User) {
    setUser(u);
  }

  function logout() {
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
