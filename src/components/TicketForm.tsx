import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box
} from '@mui/material';
import type { SelectChangeEvent } from '@mui/material';
import type { Ticket, TicketStatus, TicketPriority } from '../types/ticket';
import { useState, useEffect } from 'react';

interface TicketFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (ticket: Omit<Ticket, 'id' | 'createdAt' | 'updatedAt'>) => void;
  ticket?: Ticket;
}

export default function TicketForm({ open, onClose, onSubmit, ticket }: TicketFormProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'open' as TicketStatus,
    priority: 'medium' as TicketPriority,
    assignedTo: '',
    createdBy: 'current_user'
  });

  useEffect(() => {
    if (ticket) {
      setFormData({
        title: ticket.title,
        description: ticket.description,
        status: ticket.status,
        priority: ticket.priority,
        assignedTo: ticket.assignedTo || '',
        createdBy: ticket.createdBy
      });
    }
  }, [ticket]);

  const handleTextChange = (field: 'title' | 'description' | 'assignedTo') => (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [field]: event.target.value
    });
  };

  const handleSelectChange = (field: 'status' | 'priority') => (
    event: SelectChangeEvent
  ) => {
    setFormData({
      ...formData,
      [field]: event.target.value
    });
  };

  const handleClear = () => {
    onClose();
    setFormData({
      title: '',
      description: '',
      status: 'open' as TicketStatus,
      priority: 'medium' as TicketPriority,
      assignedTo: '',
      createdBy: 'current_user'
    });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    handleClear();
    onSubmit(formData);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle>
          {ticket ? 'Редактировать тикет' : 'Создать новый тикет'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            <TextField
              label="Заголовок"
              value={formData.title}
              onChange={handleTextChange('title')}
              required
              fullWidth
            />
            <TextField
              label="Описание"
              value={formData.description}
              onChange={handleTextChange('description')}
              multiline
              rows={4}
              required
              fullWidth
            />
            <FormControl fullWidth>
              <InputLabel>Статус</InputLabel>
              <Select
                value={formData.status}
                label="Статус"
                onChange={handleSelectChange('status')}
              >
                <MenuItem value="open">Открыт</MenuItem>
                <MenuItem value="in_progress">В работе</MenuItem>
                <MenuItem value="resolved">Решен</MenuItem>
                <MenuItem value="closed">Закрыт</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Приоритет</InputLabel>
              <Select
                value={formData.priority}
                label="Приоритет"
                onChange={handleSelectChange('priority')}
              >
                <MenuItem value="low">Низкий</MenuItem>
                <MenuItem value="medium">Средний</MenuItem>
                <MenuItem value="high">Высокий</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Назначить"
              value={formData.assignedTo}
              onChange={handleTextChange('assignedTo')}
              fullWidth
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ padding: 3, pt: 0 }}>
          <Button onClick={handleClear}>Отмена</Button>
          <Button type="submit" variant="contained" color="primary">
            {ticket ? 'Сохранить' : 'Создать'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
} 