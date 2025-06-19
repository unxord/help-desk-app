export type TicketPriority = 'low' | 'medium' | 'high';
export type TicketStatus = 'open' | 'in_progress' | 'resolved' | 'closed';

export interface Comment {
  id: string;
  ticketId: string;
  content: string;
  createdAt: string;
  createdBy: {
    id: string;
    name: string;
  };
  fileUrl?: string;
  fileName?: string;
}

export interface Ticket {
  id: string;
  title: string;
  description: string;
  status: TicketStatus;
  priority: TicketPriority;
  createdAt: string;
  updatedAt: string;
  assignedTo?: string;
  createdBy: string;
  comments?: Comment[];
} 