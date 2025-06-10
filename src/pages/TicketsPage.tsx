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
  Tooltip,
  TablePagination
} from '@mui/material';
import {
  Add as AddIcon,
  Visibility as VisibilityIcon,
  Edit as EditIcon
} from '@mui/icons-material';
import type { Ticket } from '../types/ticket';
import TicketForm from '../components/TicketForm';
import TicketFilters from '../components/TicketFilters';
import type { TicketFilters as ITicketFilters } from '../components/TicketFilters';
import { formatDate } from '../utils/format';
import { getPriorityColor, getStatusColor } from '../utils/getColor';
import { mockTickets } from '../utils/mock';
import { statusTranslations, priorityTranslations } from '../utils/translations';

export default function TicketsPage() {
  const [tickets, setTickets] = useState<Ticket[]>(mockTickets);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | undefined>();
  const [filters, setFilters] = useState<ITicketFilters>({
    search: '',
    status: 'all',
    priority: 'all'
  });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
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

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedTickets = useMemo(() => {
    const startIndex = page * rowsPerPage;
    return filteredTickets.slice(startIndex, startIndex + rowsPerPage);
  }, [filteredTickets, page, rowsPerPage]);

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

  const handleOpenForm = (ticket?: Ticket) => {
    setSelectedTicket(ticket);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setSelectedTicket(undefined);
    setIsFormOpen(false);
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
            {paginatedTickets.map((ticket) => (
              <TableRow key={ticket.id}>
                <TableCell>{ticket.id}</TableCell>
                <TableCell>{ticket.title}</TableCell>
                <TableCell>
                  <Chip
                    label={statusTranslations[ticket.status]}
                    color={getStatusColor(ticket.status)}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Chip
                    label={priorityTranslations[ticket.priority]}
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
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredTickets.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Строк на странице:"
          labelDisplayedRows={({ from, to, count }) => `${from}-${to} из ${count}`}
        />
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