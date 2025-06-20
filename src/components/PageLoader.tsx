import { Box, CircularProgress, Typography } from '@mui/material';

interface PageLoaderProps {
  message?: string;
  size?: 'small' | 'medium' | 'large';
  fullHeight?: boolean;
}

export default function PageLoader({ 
  message = 'Загрузка...', 
  size = 'medium',
  fullHeight = true 
}: PageLoaderProps) {
  const getSize = () => {
    switch (size) {
      case 'small': return 24;
      case 'large': return 48;
      default: return 32;
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: fullHeight ? '100vh' : '200px',
        gap: 2,
      }}
    >
      <CircularProgress size={getSize()} />
      {message && (
        <Typography 
          variant={size === 'large' ? 'body1' : 'body2'} 
          color="text.secondary"
        >
          {message}
        </Typography>
      )}
    </Box>
  );
} 