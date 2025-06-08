import { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Card,
  CardContent,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  Divider
} from '@mui/material';
import {
  PriorityHigh as HighPriorityIcon,
  AccessTime as PendingIcon,
  CheckCircle as ResolvedIcon,
  Person as AssignedIcon
} from '@mui/icons-material';
import type { Ticket } from '../types/ticket';

// Моковые данные для демонстрации
const mockTickets: Ticket[] = [
  {
    id: '1',
    title: 'Проблема с авторизацией',
    description: 'Не удается войти в систему после обновления пароля',
    status: 'open',
    priority: 'high',
    createdAt: '2024-03-20T10:00:00Z',
    updatedAt: '2024-03-20T10:00:00Z',
    createdBy: 'user1'
  },
  {
    id: '2',
    title: 'Ошибка при загрузке файлов',
    description: 'При попытке загрузить файл более 5MB возникает ошибка',
    status: 'in_progress',
    priority: 'medium',
    createdAt: '2024-03-19T15:30:00Z',
    updatedAt: '2024-03-19T16:45:00Z',
    createdBy: 'user2',
    assignedTo: 'support1'
  }
];

interface TicketMetrics {
  total: number;
  open: number;
  inProgress: number;
  resolved: number;
  highPriority: number;
}

interface StatCardProps {
  title: string;
  value: number;
  total: number;
  icon: React.ReactNode;
  color: string;
}

function StatCard({ title, value, total, icon, color }: StatCardProps) {
  const percentage = (value / total) * 100;

  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Box sx={{ 
            backgroundColor: `${color}15`,
            borderRadius: '50%',
            p: 1,
            mr: 2,
            display: 'flex',
            '& svg': { color }
          }}>
            {icon}
          </Box>
          <Typography variant="h6" component="div">
            {title}
          </Typography>
        </Box>
        <Typography variant="h4" component="div" gutterBottom>
          {value}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
          <Box sx={{ flexGrow: 1, mr: 1 }}>
            <LinearProgress
              variant="determinate"
              value={percentage}
              sx={{
                backgroundColor: `${color}15`,
                '& .MuiLinearProgress-bar': {
                  backgroundColor: color
                }
              }}
            />
          </Box>
          <Typography variant="body2" color="text.secondary">
            {percentage.toFixed(0)}%
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}

export default function DashboardPage() {
  const [tickets] = useState<Ticket[]>(mockTickets);
  const [metrics, setMetrics] = useState<TicketMetrics>({
    total: 0,
    open: 0,
    inProgress: 0,
    resolved: 0,
    highPriority: 0
  });

  useEffect(() => {
    // Вычисляем метрики на основе тикетов
    const newMetrics: TicketMetrics = {
      total: tickets.length,
      open: tickets.filter(t => t.status === 'open').length,
      inProgress: tickets.filter(t => t.status === 'in_progress').length,
      resolved: tickets.filter(t => t.status === 'resolved').length,
      highPriority: tickets.filter(t => t.priority === 'high').length
    };
    setMetrics(newMetrics);
  }, [tickets]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Box>
      {/* Статистика */}
      <Box 
        sx={{ 
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(4, 1fr)'
          },
          gap: 3,
          mb: 4
        }}
      >
        <StatCard
          title="Высокий приоритет"
          value={metrics.highPriority}
          total={metrics.total}
          icon={<HighPriorityIcon />}
          color="#f44336"
        />
        <StatCard
          title="Ожидают"
          value={metrics.open}
          total={metrics.total}
          icon={<PendingIcon />}
          color="#ff9800"
        />
        <StatCard
          title="В работе"
          value={metrics.inProgress}
          total={metrics.total}
          icon={<AssignedIcon />}
          color="#2196f3"
        />
        <StatCard
          title="Решено"
          value={metrics.resolved}
          total={metrics.total}
          icon={<ResolvedIcon />}
          color="#4caf50"
        />
      </Box>

      {/* Последние тикеты */}
      <Paper sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Последние тикеты
        </Typography>
        <List>
          {tickets.map((ticket, index) => (
            <Box key={ticket.id}>
              <ListItem>
                <ListItemText
                  primary={ticket.title}
                  secondary={
                    <Box component="span" sx={{ display: 'flex', justifyContent: 'space-between', mt: 0.5 }}>
                      <Typography variant="body2" component="span">
                        {ticket.status.replace('_', ' ')}
                      </Typography>
                      <Typography variant="body2" component="span" color="text.secondary">
                        {formatDate(ticket.createdAt)}
                      </Typography>
                    </Box>
                  }
                />
              </ListItem>
              {index < tickets.length - 1 && <Divider />}
            </Box>
          ))}
        </List>
      </Paper>
    </Box>
  );
} 