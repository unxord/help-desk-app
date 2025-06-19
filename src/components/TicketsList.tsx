import { useTheme, useMediaQuery } from '@mui/material';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Tooltip,
  Card,
  CardContent,
  CardActions,
  Divider,
  Button
} from '@mui/material';
import {
  Visibility as VisibilityIcon,
  Edit as EditIcon
} from '@mui/icons-material';
import type { Ticket } from '../types/ticket';
import { formatDate } from '../utils/format';
import { getPriorityColor, getStatusColor } from '../utils/getColor';
import { statusTranslations, priorityTranslations } from '../utils/translations';

interface TicketsListProps {
  tickets: Ticket[];
  onViewTicket: (ticketId: string) => void;
  onEditTicket: (ticketId: string) => void;
}

export default function TicketsList({ tickets, onViewTicket, onEditTicket }: TicketsListProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  if (isMobile) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {tickets.map((ticket) => (
          <Card key={ticket.id} sx={{ width: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                <Typography variant="h6" component="h3" sx={{ fontWeight: 600 }}>
                  {ticket.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  #{ticket.id}
                </Typography>
              </Box>
              
              <Typography 
                variant="body2" 
                color="text.secondary" 
                sx={{ 
                  mb: 2,
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden'
                }}
              >
                {ticket.description}
              </Typography>

              <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
                <Chip
                  variant="outlined"
                  label={statusTranslations[ticket.status]}
                  color={getStatusColor(ticket.status)}
                  size="small"
                />
                <Chip
                  variant="outlined"
                  label={priorityTranslations[ticket.priority]}
                  color={getPriorityColor(ticket.priority)}
                  size="small"
                />
              </Box>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" color="text.secondary">
                    Создан:
                  </Typography>
                  <Typography variant="body2">
                    {formatDate(ticket.createdAt)}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" color="text.secondary">
                    Назначен:
                  </Typography>
                  <Typography variant="body2">
                    {ticket.assignedTo || '—'}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
            <CardActions sx={{ p: 0, mt: 2 }}>
              <Box sx={{ 
                display: 'flex', 
                width: '100%',
                '& .MuiButton-root': {
                  borderRadius: 0,
                  flex: 1
                },
                '& .MuiButton-root:first-of-type': {
                  borderTopLeftRadius: '4px',
                  borderBottomLeftRadius: '4px'
                },
                '& .MuiButton-root:last-of-type': {
                  borderTopRightRadius: '4px',
                  borderBottomRightRadius: '4px'
                }
              }}>
                <Button
                  sx={{ p: 1 }}
                  variant="outlined"
                  startIcon={<EditIcon />}
                  onClick={() => onEditTicket(ticket.id)}
                  size="small"
                >
                  Редактировать
                </Button>
                <Button
                  variant="contained"
                  startIcon={<VisibilityIcon />}
                  onClick={() => onViewTicket(ticket.id)}
                  size="small"
                >
                  Просмотреть
                </Button>
              </Box>
            </CardActions>
          </Card>
        ))}
      </Box>
    );
  }

  return (
    <TableContainer component={Paper}>
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
          {tickets.map((ticket) => (
            <TableRow key={ticket.id}>
              <TableCell>{ticket.id}</TableCell>
              <TableCell>{ticket.title}</TableCell>
              <TableCell>
                <Chip
                  variant="outlined"
                  label={statusTranslations[ticket.status]}
                  color={getStatusColor(ticket.status)}
                  size="small"
                />
              </TableCell>
              <TableCell>
                <Chip
                  variant="outlined"
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
                      onClick={() => onViewTicket(ticket.id)}
                    >
                      <VisibilityIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Редактировать">
                    <IconButton
                      size="small"
                      onClick={() => onEditTicket(ticket.id)}
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
  );
} 