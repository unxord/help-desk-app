import { useNavigate } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import { useAuth } from '../contexts/AuthContext';
import type { LoginCredentials } from '../types/auth';

export default function LoginWrapper() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (credentials: LoginCredentials) => {
    try {
      await login(credentials);
      navigate('/tickets');
    } catch (error) {
      console.error('Login error:', error);

    }
  };

  return <LoginPage onLogin={handleLogin} />;
} 