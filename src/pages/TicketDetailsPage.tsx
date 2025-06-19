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
import { formatDate } from '../utils/format';
import { getPriorityColor, getStatusColor } from '../utils/getColor';
import { statusTranslations, priorityTranslations } from '../utils/translations';

interface TicketDetailsPageProps {
  ticket: Ticket;
  onBack: () => void;
  onEdit: (ticketData: Omit<Ticket, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onAddComment: (content: string, file?: File | null) => Promise<void>;
  onAssign?: (ticketId: string, assignedTo: string) => void;
  isEditing?: boolean;
  onEditingChange?: (isEditing: boolean) => void;
}

export default function TicketDetailsPage({
  ticket,
  onBack,
  onEdit,
  onAddComment,
  onAssign,
  isEditing = false,
  onEditingChange
}: TicketDetailsPageProps) {
  const [isAddingComment, setIsAddingComment] = useState(false);
  const { user } = useAuth();

  const handleEdit = (ticketData: Omit<Ticket, 'id' | 'createdAt' | 'updatedAt'>) => {
    onEdit(ticketData);
    onEditingChange?.(false);
  };
  
  return (
    <Box>
      {/* Верхняя панель */}
      <Box sx={{ display: 'flex', alignItems: { xs: 'stretch', sm: 'center' }, mb: 3, gap: 2, flexDirection: { xs: 'column', sm: 'row' },  }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexGrow: 1 }}>
          <IconButton onClick={onBack}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h5" component="h1">
            Тикет #{ticket.id}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'stretch', gap: 1, flexGrow: 0 }}>
          {!ticket.assignedTo && (
            <Button
              variant="outlined"
              color="success"
              fullWidth
              onClick={() => {
                if (onAssign && user) {
                  onAssign(ticket.id, user.name || user.email || 'Неизвестный пользователь');
                }
              }}
            >
              Взять в работу
            </Button>
          )}
          <Button
            variant="outlined"
            fullWidth
            startIcon={<EditIcon />}
            onClick={() => onEditingChange?.(true)}
          >
            Редактировать
          </Button>
        </Box>
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
                variant="outlined"
                label={statusTranslations[ticket.status]}
                color={getStatusColor(ticket.status)}
                size="small"
              />
            </Box>
            <Box>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Приоритет
              </Typography>
              <Chip
                variant="outlined"
                label={priorityTranslations[ticket.priority]}
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