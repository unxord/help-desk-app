import {
  Paper,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  IconButton,
  InputAdornment,
} from '@mui/material';
import type { SelectChangeEvent } from '@mui/material';
import { Search as SearchIcon, Clear as ClearIcon } from '@mui/icons-material';
import type { TicketStatus, TicketPriority } from '../types/ticket';
import { useState, useEffect } from 'react';

export interface TicketFilters {
  search: string;
  status: TicketStatus | 'all';
  priority: TicketPriority | 'all';
}

interface TicketFiltersProps {
  onFiltersChange: (filters: TicketFilters) => void;
}

export default function TicketFilters({ onFiltersChange }: TicketFiltersProps) {
  const [filters, setFilters] = useState<TicketFilters>({
    search: '',
    status: 'all',
    priority: 'all'
  });

  useEffect(() => {
    onFiltersChange(filters);
  }, [filters, onFiltersChange]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, search: event.target.value });
  };

  const handleStatusChange = (event: SelectChangeEvent) => {
    setFilters({ ...filters, status: event.target.value as TicketStatus | 'all' });
  };

  const handlePriorityChange = (event: SelectChangeEvent) => {
    setFilters({ ...filters, priority: event.target.value as TicketPriority | 'all' });
  };

  const handleClearSearch = () => {
    setFilters({ ...filters, search: '' });
  };

  const handleClearFilters = () => {
    setFilters({
      search: '',
      status: 'all',
      priority: 'all'
    });
  };

  return (
    <Paper sx={{ p: 2, mb: 2 }}>
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <TextField
          label="Поиск"
          value={filters.search}
          onChange={handleSearchChange}
          sx={{ flexGrow: 1, minWidth: '200px' }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            endAdornment: filters.search && (
              <InputAdornment position="end">
                <IconButton size="small" onClick={handleClearSearch}>
                  <ClearIcon />
                </IconButton>
              </InputAdornment>
            )
          }}
        />
        <FormControl sx={{ minWidth: '150px' }}>
          <InputLabel>Статус</InputLabel>
          <Select
            value={filters.status}
            label="Статус"
            onChange={handleStatusChange}
          >
            <MenuItem value="all">Все</MenuItem>
            <MenuItem value="open">Открыт</MenuItem>
            <MenuItem value="in_progress">В работе</MenuItem>
            <MenuItem value="resolved">Решен</MenuItem>
            <MenuItem value="closed">Закрыт</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: '150px' }}>
          <InputLabel>Приоритет</InputLabel>
          <Select
            value={filters.priority}
            label="Приоритет"
            onChange={handlePriorityChange}
          >
            <MenuItem value="all">Все</MenuItem>
            <MenuItem value="low">Низкий</MenuItem>
            <MenuItem value="medium">Средний</MenuItem>
            <MenuItem value="high">Высокий</MenuItem>
          </Select>
        </FormControl>
        {(filters.status !== 'all' || filters.priority !== 'all' || filters.search) && (
          <IconButton onClick={handleClearFilters} sx={{ alignSelf: 'center' }}>
            <ClearIcon />
          </IconButton>
        )}
      </Box>
    </Paper>
  );
} 