import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import toast from 'react-hot-toast';
import apiClient from '../api/apiClient';

interface User {
  id: string;
  username: string;
  email: string;
  savedMovies: string[];
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check for existing token and validate it
    const token = localStorage.getItem('token');
    if (token) {
      checkAuth(token);
    }
  }, []);

  const checkAuth = async (_token: string) => {
    try {
      const response = await apiClient.get('/auth/me');
      setUser(response.data);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Auth check error:', error);
      localStorage.removeItem('token');
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  const login = async (email: string, password: string) => {
    const loadingToast = toast.loading('Logging in...');
    try {
      const response = await apiClient.post('/auth/login', {
        email,
        password
      });

      const { token, user } = response.data;
      localStorage.setItem('token', token);
      setUser(user);
      setIsAuthenticated(true);
      toast.success(`Welcome back, ${user.username}!`, {
        id: loadingToast,
      });
    } catch (error: any) {
      const message = error.response?.data?.message || 'Login failed';
      toast.error(message, {
        id: loadingToast,
      });
      throw error;
    }
  };

  const register = async (username: string, email: string, password: string) => {
    const loadingToast = toast.loading('Creating your account...');
    try {
      const response = await apiClient.post('/auth/register', {
        username,
        email,
        password
      });

      const { token, user } = response.data;
      localStorage.setItem('token', token);
      setUser(user);
      setIsAuthenticated(true);
      toast.success('Account created successfully!', {
        id: loadingToast,
      });
    } catch (error: any) {
      const message = error.response?.data?.message || 'Registration failed';
      toast.error(message, {
        id: loadingToast,
      });
      throw error;
    }
  };

  const logout = async () => {
    try {
      await apiClient.post('/auth/logout');
      localStorage.removeItem('token');
      setUser(null);
      setIsAuthenticated(false);
      toast.success('Logged out successfully');
    } catch (error) {
      console.error('Logout error:', error);
      // Still clear local state even if server request fails
      localStorage.removeItem('token');
      setUser(null);
      setIsAuthenticated(false);
      toast.error('Error logging out');
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 