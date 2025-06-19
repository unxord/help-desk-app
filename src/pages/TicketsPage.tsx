import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Button
} from '@mui/material';
import {
  Add as AddIcon
} from '@mui/icons-material';
import type { Ticket } from '../types/ticket';
import TicketForm from '../components/TicketForm';
import TicketFilters from '../components/TicketFilters';
import TicketsList from '../components/TicketsList';
import AdaptivePagination from '../components/AdaptivePagination';
import type { TicketFilters as ITicketFilters } from '../components/TicketFilters';
import { mockTickets } from '../utils/mock';

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

  const handleViewTicket = (ticketId: string) => {
    navigate(`/tickets/${ticketId}`);
  };

  const handleEditTicketFromList = (ticketId: string) => {
    navigate(`/tickets/${ticketId}`, { state: { isEditing: true } });
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: { xs: 'stretch', sm: 'center' }, mb: 3, gap: 2, flexDirection: { xs: 'column', sm: 'row' },  }}>
        <Typography variant="h5" component="h1">
          Список заявок
        </Typography>
        <Button
          sx={{ ml: { xs: 0, sm: 'auto' } }}
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenForm()}
        >
          Создать тикет
        </Button>
      </Box>

      <TicketFilters onFiltersChange={setFilters} />

      <Box sx={{ mt: 3 }}>
        <TicketsList
          tickets={paginatedTickets}
          onViewTicket={handleViewTicket}
          onEditTicket={handleEditTicketFromList}
        />
        
        <AdaptivePagination
          count={filteredTickets.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Строк на странице:"
          labelDisplayedRows={({ from, to, count }) => `${from}-${to} из ${count}`}
        />
      </Box>

      <TicketForm
        open={isFormOpen}
        onClose={handleCloseForm}
        onSubmit={selectedTicket ? handleEditTicket : handleCreateTicket}
        ticket={selectedTicket}
      />
    </Box>
  );
} 