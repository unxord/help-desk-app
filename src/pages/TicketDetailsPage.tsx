import { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Chip,
  Button,
  IconButton,
  Divider,
  Grid
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  Edit as EditIcon
} from '@mui/icons-material';
import type { Ticket, Comment } from '../types/ticket';
import { useAuth } from '../contexts/AuthContext';
import CommentSection from '../components/CommentSection';
import TicketForm from '../components/TicketForm';

interface TicketDetailsPageProps {
  ticket: Ticket;
  onBack: () => void;
  onEdit: (ticketData: Omit<Ticket, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onAddComment: (content: string) => Promise<void>;
  isEditing?: boolean;
  onEditingChange?: (isEditing: boolean) => void;
}

export default function TicketDetailsPage({
  ticket,
  onBack,
  onEdit,
  onAddComment,
  isEditing = false,
  onEditingChange
}: TicketDetailsPageProps) {
  const [isAddingComment, setIsAddingComment] = useState(false);
  const { user } = useAuth();

  const handleEdit = (ticketData: Omit<Ticket, 'id' | 'createdAt' | 'updatedAt'>) => {
    onEdit(ticketData);
    onEditingChange?.(false);
  };

  const getStatusColor = (status: Ticket['status']) => {
    const colors = {
      open: 'info',
      in_progress: 'warning',
      resolved: 'success',
      closed: 'default'
    } as const;
    return colors[status];
  };

  const getPriorityColor = (priority: Ticket['priority']) => {
    const colors = {
      low: 'info',
      medium: 'warning',
      high: 'error'
    } as const;
    return colors[priority];
  };

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
      {/* Верхняя панель */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, gap: 2 }}>
        <IconButton onClick={onBack}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h5" component="h1" sx={{ flexGrow: 1 }}>
          Тикет #{ticket.id}
        </Typography>
        <Button
          variant="outlined"
          startIcon={<EditIcon />}
          onClick={() => onEditingChange?.(true)}
        >
          Редактировать
        </Button>
      </Box>

      {/* Основная информация о тикете */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'grid', gap: 3 }}>
          <Typography variant="h6">{ticket.title}</Typography>
          <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
            {ticket.description}
          </Typography>
          <Divider />
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(4, 1fr)' }, gap: 3 }}>
            <Box>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Статус
              </Typography>
              <Chip
                label={ticket.status.replace('_', ' ')}
                color={getStatusColor(ticket.status)}
                size="small"
              />
            </Box>
            <Box>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Приоритет
              </Typography>
              <Chip
                label={ticket.priority}
                color={getPriorityColor(ticket.priority)}
                size="small"
              />
            </Box>
            <Box>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Создан
              </Typography>
              <Typography variant="body2">
                {formatDate(ticket.createdAt)}
              </Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Назначен
              </Typography>
              <Typography variant="body2">
                {ticket.assignedTo || 'Не назначен'}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Paper>

      {/* Секция комментариев */}
      <CommentSection
        comments={ticket.comments || []}
        onAddComment={onAddComment}
        isLoading={isAddingComment}
      />

      {/* Модальное окно редактирования */}
      <TicketForm
        open={isEditing}
        onClose={() => onEditingChange?.(false)}
        onSubmit={handleEdit}
        ticket={ticket}
      />
    </Box>
  );
} 