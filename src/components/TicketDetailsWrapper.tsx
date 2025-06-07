import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { CircularProgress, Box } from '@mui/material';
import TicketDetailsPage from '../pages/TicketDetailsPage';
import type { Ticket } from '../types/ticket';
import { useAuth } from '../contexts/AuthContext';

const mockFetchTicket = async (id: string): Promise<Ticket> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return {
    id,
    title: 'Тестовый тикет',
    description: 'Описание тестового тикета',
    status: 'open',
    priority: 'medium',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    createdBy: 'user1',
    comments: []
  };
};

const mockUpdateTicket = async (id: string, data: Partial<Ticket>): Promise<void> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  console.log('Updating ticket:', id, data);
};

const mockAddComment = async (ticketId: string, content: string): Promise<void> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  console.log('Adding comment to ticket:', ticketId, content);
};

export default function TicketDetailsWrapper() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    // Проверяем состояние редактирования из навигации
    setIsEditing(location.state?.isEditing || false);
  }, [location.state]);

  useEffect(() => {
    const loadTicket = async () => {
      if (!id) return;
      
      try {
        setIsLoading(true);
        const data = await mockFetchTicket(id);
        setTicket(data);
      } catch (error) {
        console.error('Error loading ticket:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadTicket();
  }, [id]);

  const handleBack = () => {
    navigate('/tickets');
  };

  const handleEdit = async (ticketData: Omit<Ticket, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (!ticket) return;
    
    try {
      await mockUpdateTicket(ticket.id, ticketData);
      setTicket(prev => prev ? { ...prev, ...ticketData } : null);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating ticket:', error);

    }
  };

  const handleAddComment = async (content: string) => {
    if (!ticket || !user) return;
    
    try {
      await mockAddComment(ticket.id, content);

      const newComment = {
        id: Date.now().toString(),
        ticketId: ticket.id,
        content,
        createdAt: new Date().toISOString(),
        createdBy: {
          id: user.id,
          name: user.name
        }
      };
      
      setTicket(prev => prev ? {
        ...prev,
        comments: [...(prev.comments || []), newComment]
      } : null);
    } catch (error) {
      console.error('Error adding comment:', error);

    }
  };

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!ticket) {
    return null;
  }

  return (
    <TicketDetailsPage
      ticket={ticket}
      onBack={handleBack}
      onEdit={handleEdit}
      onAddComment={handleAddComment}
      isEditing={isEditing}
      onEditingChange={setIsEditing}
    />
  );
} 