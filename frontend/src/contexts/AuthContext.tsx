import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { User } from '@/types';
import * as store from '@/lib/store';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  signup: (name: string, email: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(store.getCurrentUser());

  const login = useCallback((email: string, password: string) => {
    const u = store.login(email, password);
    if (u) { setUser(u); return true; }
    return false;
  }, []);

  const signup = useCallback((name: string, email: string, password: string) => {
    const u = store.signup(name, email, password);
    if (u) { setUser(u); return true; }
    return false;
  }, []);

  const logout = useCallback(() => {
    store.logout();
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
