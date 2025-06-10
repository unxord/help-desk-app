import { createBrowserRouter } from 'react-router-dom';
import Layout from './components/Layout';
import LoginWrapper from './components/LoginWrapper';
import TicketsPage from './pages/TicketsPage';
import TicketDetailsWrapper from './components/TicketDetailsWrapper';
import DashboardPage from './pages/DashboardPage';
import SettingsPage from './pages/SettingsPage';
import ProtectedRoute from '../src/components/ProtectedRoute';

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginWrapper />
  },
  {
    path: '/',
    element: <ProtectedRoute><Layout /></ProtectedRoute>,
    children: [
      {
        path: 'dashboard',
        element: <DashboardPage />
      },
      {
        path: 'tickets',
        element: <TicketsPage />
      },
      {
        path: 'tickets/:id',
        element: <TicketDetailsWrapper />
      },
      {
        path: 'settings',
        element: <SettingsPage />
      }
    ]
  }
]); 