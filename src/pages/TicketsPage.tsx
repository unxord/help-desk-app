import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Paper,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Tooltip
} from '@mui/material';
import {
  Add as AddIcon,
  Visibility as VisibilityIcon,
  Edit as EditIcon
} from '@mui/icons-material';
import type { Ticket } from '../types/ticket';
import TicketList from '../components/TicketList';
import TicketForm from '../components/TicketForm';
import TicketFilters from '../components/TicketFilters';
import type { TicketFilters as ITicketFilters } from '../components/TicketFilters';

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

export default function TicketsPage() {
  const [tickets, setTickets] = useState<Ticket[]>(mockTickets);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | undefined>();
  const [filters, setFilters] = useState<ITicketFilters>({
    search: '',
    status: 'all',
    priority: 'all'
  });
  const navigate = useNavigate();

  const filteredTickets = useMemo(() => {
    return tickets.filter(ticket => {
      const searchMatch = filters.search.toLowerCase() === '' ||
        ticket.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        ticket.description.toLowerCase().includes(filters.search.toLowerCase());

      const statusMatch = filters.status === 'all' || ticket.status === filters.status;

      const priorityMatch = filters.priority === 'all' || ticket.priority === filters.priority;

      return searchMatch && statusMatch && priorityMatch;
    });
  }, [tickets, filters]);

  const handleCreateTicket = (ticketData: Omit<Ticket, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newTicket: Ticket = {
      ...ticketData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setTickets([...tickets, newTicket]);
    setIsFormOpen(false);
  };

  const handleEditTicket = (ticketData: Omit<Ticket, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (!selectedTicket) return;
    
    const updatedTicket: Ticket = {
      ...ticketData,
      id: selectedTicket.id,
      createdAt: selectedTicket.createdAt,
      updatedAt: new Date().toISOString()
    };

    setTickets(tickets.map(ticket => 
      ticket.id === selectedTicket.id ? updatedTicket : ticket
    ));
  };

  const handleDeleteTicket = (ticketId: string) => {
    setTickets(tickets.filter(ticket => ticket.id !== ticketId));
  };

  const handleOpenForm = (ticket?: Ticket) => {
    setSelectedTicket(ticket);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setSelectedTicket(undefined);
    setIsFormOpen(false);
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
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" component="h1">
          Список заявок
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenForm()}
        >
          Создать тикет
        </Button>
      </Box>

      <TicketFilters onFiltersChange={setFilters} />

      <TableContainer component={Paper} sx={{ mt: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Заголовок</TableCell>
              <TableCell>Статус</TableCell>
              <TableCell>Приоритет</TableCell>
              <TableCell>Создан</TableCell>
              <TableCell>Назначен</TableCell>
              <TableCell align="right">Действия</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredTickets.map((ticket) => (
              <TableRow key={ticket.id}>
                <TableCell>{ticket.id}</TableCell>
                <TableCell>{ticket.title}</TableCell>
                <TableCell>
                  <Chip
                    label={ticket.status.replace('_', ' ')}
                    color={getStatusColor(ticket.status)}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Chip
                    label={ticket.priority}
                    color={getPriorityColor(ticket.priority)}
                    size="small"
                  />
                </TableCell>
                <TableCell>{formatDate(ticket.createdAt)}</TableCell>
                <TableCell>{ticket.assignedTo || '—'}</TableCell>
                <TableCell align="right">
                  <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                    <Tooltip title="Просмотреть">
                      <IconButton
                        size="small"
                        onClick={() => navigate(`/tickets/${ticket.id}`)}
                      >
                        <VisibilityIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Редактировать">
                      <IconButton
                        size="small"
                        onClick={() => navigate(`/tickets/${ticket.id}`, { state: { isEditing: true } })}
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TicketForm
        open={isFormOpen}
        onClose={handleCloseForm}
        onSubmit={selectedTicket ? handleEditTicket : handleCreateTicket}
        ticket={selectedTicket}
      />
    </Box>
  );
} 