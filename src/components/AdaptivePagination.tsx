import { useTheme, useMediaQuery } from '@mui/material';
import {
  Box,
  TablePagination,
  Pagination,
  Typography,
  Select,
  MenuItem,
  FormControl
} from '@mui/material';
import type { SelectChangeEvent } from '@mui/material';

interface AdaptivePaginationProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (event: unknown, newPage: number) => void;
  onRowsPerPageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  rowsPerPageOptions?: number[];
  labelRowsPerPage?: string;
  labelDisplayedRows?: (params: { from: number; to: number; count: number }) => string;
}

export default function AdaptivePagination({
  count,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
  rowsPerPageOptions = [5, 10, 25],
  labelRowsPerPage = "Строк на странице:",
  labelDisplayedRows = ({ from, to, count }) => `${from}-${to} из ${count}`
}: AdaptivePaginationProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handlePaginationChange = (event: React.ChangeEvent<unknown>, value: number) => {
    onPageChange(event, value - 1);
  };

  const handleRowsPerPageChange = (event: SelectChangeEvent<number>) => {
    const syntheticEvent = {
      target: {
        value: event.target.value.toString()
      }
    } as React.ChangeEvent<HTMLInputElement>;
    onRowsPerPageChange(syntheticEvent);
  };

  if (isMobile) {
    const totalPages = Math.ceil(count / rowsPerPage);
    const from = page * rowsPerPage + 1;
    const to = Math.min((page + 1) * rowsPerPage, count);

    return (
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: 2, 
        alignItems: 'center',
        py: 2,
        borderTop: 1,
        borderColor: 'divider'
      }}>
        <Typography variant="body2" color="text.secondary">
          {labelDisplayedRows({ from, to, count })}
        </Typography>
        
        <Pagination
          count={totalPages}
          page={page + 1}
          onChange={handlePaginationChange}
          size="small"
          showFirstButton
          showLastButton
        />
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="body2" color="text.secondary">
            {labelRowsPerPage}
          </Typography>
          <FormControl size="small" sx={{ minWidth: 80 }}>
            <Select
              value={rowsPerPage}
              onChange={handleRowsPerPageChange}
              displayEmpty
            >
              {rowsPerPageOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Box>
    );
  }

  return (
    <TablePagination
      rowsPerPageOptions={rowsPerPageOptions}
      component="div"
      count={count}
      rowsPerPage={rowsPerPage}
      page={page}
      onPageChange={onPageChange}
      onRowsPerPageChange={onRowsPerPageChange}
      labelRowsPerPage={labelRowsPerPage}
      labelDisplayedRows={labelDisplayedRows}
    />
  );
} 