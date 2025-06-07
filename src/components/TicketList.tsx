import { 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  Chip,
  IconButton,
  TablePagination
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { useState } from 'react';
import type { Ticket, TicketStatus, TicketPriority } from '../types/ticket';

interface TicketListProps {
  tickets: Ticket[];
  onEdit: (ticket: Ticket) => void;
  onDelete: (ticketId: string) => void;
}

const getStatusColor = (status: TicketStatus): string => {
  const colors: Record<TicketStatus, string> = {
    open: 'info',
    in_progress: 'warning',
    resolved: 'success',
    closed: 'default'
  };
  return colors[status];
};

const getPriorityColor = (priority: TicketPriority): string => {
  const colors: Record<TicketPriority, string> = {
    low: 'info',
    medium: 'warning',
    high: 'error'
  };
  return colors[priority];
};

export default function TicketList({ tickets, onEdit, onDelete }: TicketListProps) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Заголовок</TableCell>
              <TableCell>Статус</TableCell>
              <TableCell>Приоритет</TableCell>
              <TableCell>Назначен</TableCell>
              <TableCell>Создан</TableCell>
              <TableCell>Действия</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tickets
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((ticket) => (
                <TableRow key={ticket.id}>
                  <TableCell>{ticket.id}</TableCell>
                  <TableCell>{ticket.title}</TableCell>
                  <TableCell>
                    <Chip 
                      label={ticket.status.replace('_', ' ')} 
                      color={getStatusColor(ticket.status) as any}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={ticket.priority} 
                      color={getPriorityColor(ticket.priority) as any}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{ticket.assignedTo || 'Не назначен'}</TableCell>
                  <TableCell>{new Date(ticket.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <IconButton size="small" onClick={() => onEdit(ticket)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton size="small" onClick={() => onDelete(ticket.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={tickets.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
} 