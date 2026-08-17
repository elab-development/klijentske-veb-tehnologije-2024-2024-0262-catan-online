import { createContext, useContext, useState, type ReactNode } from 'react';
import type { IUser } from '../models/User';
import { getCurrentUser, loginUser, logoutUser, registerUser } from '../services/authService';

interface AuthContextValue {
  user: IUser | null;
  login: (email: string, password: string) => void;
  register: (username: string, email: string, password: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(getCurrentUser());

  const login = (email: string, password: string) => {
    const loggedInUser = loginUser(email, password);
    setUser(loggedInUser);
  };

  const register = (username: string, email: string, password: string) => {
    registerUser(username, email, password);
  };

  const logout = () => {
    logoutUser();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth mora biti korišćen unutar AuthProvider-a.');
  }
  return context;
};