export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'support' | 'user';
  avatar?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface AuthContextType extends Omit<AuthState, 'error' | 'isLoading'> {
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  error?: string | null;
  isLoading?: boolean;
} 