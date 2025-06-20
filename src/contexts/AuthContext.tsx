import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { User, LoginCredentials, AuthState } from '../types/auth';

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  isInitialized: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

// Ключ для localStorage
const AUTH_STORAGE_KEY = 'helpdesk_auth';

const mockUsers = [
  {
    id: '1',
    email: 'admin@example.com',
    password: 'admin123',
    name: 'Администратор',
    role: 'admin'
  },
  {
    id: '2',
    email: 'support@example.com',
    password: 'support123',
    name: 'Специалист поддержки',
    role: 'support'
  },
  {
    id: '3',
    email: 'user@example.com',
    password: 'user123',
    name: 'Пользователь',
    role: 'user'
  }
];

// Функция для загрузки состояния из localStorage
const loadAuthFromStorage = (): AuthState => {
  try {
    const stored = localStorage.getItem(AUTH_STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return {
        user: parsed.user,
        isAuthenticated: parsed.isAuthenticated,
        isLoading: false,
        error: null
      };
    }
  } catch (error) {
    console.warn('Ошибка при загрузке авторизации из localStorage:', error);
  }
  
  return {
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: null
  };
};

// Функция для сохранения состояния в localStorage
const saveAuthToStorage = (authState: AuthState) => {
  try {
    const dataToSave = {
      user: authState.user,
      isAuthenticated: authState.isAuthenticated
    };
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(dataToSave));
  } catch (error) {
    console.warn('Ошибка при сохранении авторизации в localStorage:', error);
  }
};

// Функция для очистки localStorage
const clearAuthFromStorage = () => {
  try {
    localStorage.removeItem(AUTH_STORAGE_KEY);
  } catch (error) {
    console.warn('Ошибка при очистке авторизации из localStorage:', error);
  }
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>(() => loadAuthFromStorage());
  const [isInitialized, setIsInitialized] = useState(false);

  // Инициализация при загрузке приложения
  useEffect(() => {
    // Имитируем небольшую задержку для проверки авторизации
    const timer = setTimeout(() => {
      setIsInitialized(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const login = useCallback(async (credentials: LoginCredentials) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      const user = mockUsers.find(u => u.email === credentials.email);

      if (!user || user.password !== credentials.password) {
        throw new Error('Неверный email или пароль');
      }

      const { password, ...userWithoutPassword } = user;
      
      const newState = {
        user: userWithoutPassword as User,
        isAuthenticated: true,
        isLoading: false,
        error: null
      };
      
      setState(newState);
      saveAuthToStorage(newState);
    } catch (error) {
      const errorState = {
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Произошла ошибка при входе'
      };
      setState(errorState);
      clearAuthFromStorage();
    }
  }, []);

  const logout = useCallback(() => {
    const logoutState = {
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null
    };
    setState(logoutState);
    clearAuthFromStorage();
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, login, logout, isInitialized }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth должен использоваться внутри AuthProvider');
  }
  return context;
} 