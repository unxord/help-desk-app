import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
  Divider,
  Chip,
  TableCell
} from '@mui/material';
import {
  PriorityHigh as HighPriorityIcon,
  AccessTime as PendingIcon,
  CheckCircle as ResolvedIcon,
  Person as AssignedIcon
} from '@mui/icons-material';
import type { Ticket } from '../types/ticket';
import { formatDate } from '../utils/format';
import { getPriorityColor, getStatusColor } from '../utils/getColor';
import { mockTickets } from '../utils/mock';
import { statusTranslations, priorityTranslations } from '../utils/translations';

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
  const navigate = useNavigate();

  useEffect(() => {
    // Фильтруем активные заявки (открытые и в работе)
    const activeTickets = tickets.filter(t => t.status === 'open' || t.status === 'in_progress');
    
    // Вычисляем метрики на основе тикетов
    const newMetrics: TicketMetrics = {
      total: activeTickets.length, // Общее количество активных заявок
      open: tickets.filter(t => t.status === 'open').length,
      inProgress: tickets.filter(t => t.status === 'in_progress').length,
      resolved: tickets.filter(t => t.status === 'resolved').length, // Все решенные заявки
      highPriority: activeTickets.filter(t => t.priority === 'high').length // Высокий приоритет среди активных
    };
    setMetrics(newMetrics);
  }, [tickets]);

  // Фильтруем активные заявки для отображения в списке
  const activeTickets = tickets.filter(t => t.status === 'open' || t.status === 'in_progress');

  const handleTicketClick = (ticketId: string) => {
    navigate(`/tickets/${ticketId}`);
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
          total={tickets.length} // Общее количество всех заявок для метрики "Решено"
          icon={<ResolvedIcon />}
          color="#4caf50"
        />
      </Box>

      {/* Последние тикеты */}
      <Paper sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Последние открытые заявки
        </Typography>
        <List>
          {activeTickets.map((ticket, index) => (
            <Box key={ticket.id}>
              <ListItem
                onClick={() => handleTicketClick(ticket.id)}
                sx={{
                  cursor: 'pointer',
                  '&:hover': {
                    backgroundColor: 'action.hover'
                  }
                }}
              >
                <ListItemText
                  primary={ticket.title}
                  secondary={
                    <Typography component="span" variant="body2">
                      <Box component="span" sx={{ display: 'flex', justifyContent: 'start', mt: 0.5, gap: 1 }}>
                        <Chip
                          variant="outlined"
                          label={statusTranslations[ticket.status]}
                          color={getStatusColor(ticket.status)}
                          size="small"
                        />
                        <Chip
                          variant="outlined"
                          label={priorityTranslations[ticket.priority]}
                          color={getPriorityColor(ticket.priority)}
                          size="small"
                        />
                        <Typography variant="body2" component="span" color="text.secondary" sx={{ marginLeft: 'auto' }}>
                          {formatDate(ticket.createdAt)}
                        </Typography>
                      </Box>
                    </Typography>
                  }
                />
              </ListItem>
              {index < activeTickets.length - 1 && <Divider />}
            </Box>
          ))}
        </List>
      </Paper>
    </Box>
  );
} 