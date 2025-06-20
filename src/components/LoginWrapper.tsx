import { useNavigate, Navigate } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import { LoadingSpinner } from './loaders';
import { useAuth } from '../contexts/AuthContext';
import type { LoginCredentials } from '../types/auth';

export default function LoginWrapper() {
  const navigate = useNavigate();
  const { login, isAuthenticated, isInitialized, isLoading, error } = useAuth();

  // Показываем загрузку, пока система инициализируется
  if (!isInitialized) {
    return <LoadingSpinner message="Проверка авторизации..." />;
  }

  // Если пользователь уже авторизован, перенаправляем на главную страницу
  if (isAuthenticated) {
    return <Navigate to="/tickets" replace />;
  }

  const handleLogin = async (credentials: LoginCredentials) => {
    try {
      await login(credentials);
      navigate('/tickets');
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return <LoginPage onLogin={handleLogin} isLoading={isLoading} error={error} />;
} 