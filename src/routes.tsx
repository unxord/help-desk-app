import { createBrowserRouter, Navigate } from 'react-router-dom';
import LoginWrapper from './components/LoginWrapper';
import TicketsPage from './pages/TicketsPage';
import TicketDetailsWrapper from './components/TicketDetailsWrapper';
import Layout from './components/Layout';
import { useAuth } from './contexts/AuthContext';

// Компонент для защиты маршрутов
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/tickets" replace />
  },
  {
    path: '/login',
    element: <LoginWrapper />
  },
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: 'tickets',
        element: <TicketsPage />
      },
      {
        path: 'tickets/:id',
        element: <TicketDetailsWrapper />
      },
      {
        path: 'dashboard',
        element: <div>Панель управления (в разработке)</div>
      },
      {
        path: 'settings',
        element: <div>Настройки (в разработке)</div>
      }
    ]
  }
]); 