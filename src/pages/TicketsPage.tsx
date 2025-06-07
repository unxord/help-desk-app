import { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import type { Ticket } from '../types/ticket';
import TicketList from '../components/TicketList';
import TicketForm from '../components/TicketForm';

const mockTickets: Ticket[] = [
  {
    id: '1',
    title: 'Проблема с принтером',
    description: 'Принтер не печатает документы',
    status: 'open',
    priority: 'high',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    createdBy: 'user1'
  },
  {
    id: '2',
    title: 'Не работает почта',
    description: 'Не приходят письма на корпоративную почту',
    status: 'in_progress',
    priority: 'medium',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    assignedTo: 'tech_support1',
    createdBy: 'user2'
  }
];

export default function TicketsPage() {
  const [tickets, setTickets] = useState<Ticket[]>(mockTickets);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | undefined>();

  const handleCreateTicket = (ticketData: Omit<Ticket, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newTicket: Ticket = {
      ...ticketData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setTickets([...tickets, newTicket]);
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

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Тикеты
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => handleOpenForm()}
        >
          Создать тикет
        </Button>
      </Box>

      <TicketList
        tickets={tickets}
        onEdit={handleOpenForm}
        onDelete={handleDeleteTicket}
      />

      <TicketForm
        open={isFormOpen}
        onClose={handleCloseForm}
        onSubmit={selectedTicket ? handleEditTicket : handleCreateTicket}
        ticket={selectedTicket}
      />
    </Box>
  );
} 