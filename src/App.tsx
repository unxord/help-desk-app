import { Box, Container, AppBar, Toolbar, Typography, IconButton, Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Menu as MenuIcon, Dashboard, Help, Settings } from '@mui/icons-material';
import { useState } from 'react';
import TicketsPage from './pages/TicketsPage';

function App() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={toggleDrawer}
            sx={{ marginRight: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Help Desk
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="temporary"
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer}
        sx={{
          width: 240,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 240,
            boxSizing: 'border-box',
          },
        }}
      >
        <Toolbar />
        <List>
          <ListItem>
            <ListItemIcon>
              <Dashboard />
            </ListItemIcon>
            <ListItemText primary="Панель управления" />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <Help />
            </ListItemIcon>
            <ListItemText primary="Тикеты" />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <Settings />
            </ListItemIcon>
            <ListItemText primary="Настройки" />
          </ListItem>
        </List>
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: '100%',
          minHeight: '100vh',
          backgroundColor: 'background.default',
        }}
      >
        <Toolbar />
        <Container maxWidth="lg">
          <TicketsPage />
        </Container>
      </Box>
    </Box>
  );
}

export default App;
