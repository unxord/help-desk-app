import { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Switch,
  FormControlLabel,
  Divider,
  TextField,
  Button,
  Alert,
  Snackbar,
  List,
  ListItem,
  ListItemText,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from '@mui/material';
import type { SelectChangeEvent } from '@mui/material';
import { Save as SaveIcon } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

interface Settings {
  emailNotifications: boolean;
  desktopNotifications: boolean;
  autoAssignment: boolean;
  defaultPriority: 'low' | 'medium' | 'high';
  defaultAssignee: string;
  ticketsPerPage: number;
  language: 'ru' | 'en';
}

const defaultSettings: Settings = {
  emailNotifications: false,
  desktopNotifications: true,
  autoAssignment: true,
  defaultPriority: 'low',
  defaultAssignee: '',
  ticketsPerPage: 5,
  language: 'ru'
};

export default function SettingsPage() {
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const theme = useTheme();

  const handleSwitchChange = (field: keyof Settings) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSettings(prev => ({
      ...prev,
      [field]: event.target.checked
    }));
  };

  const handleTextChange = (field: keyof Settings) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSettings(prev => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  const handleSelectChange = (field: keyof Settings) => (
    event: SelectChangeEvent<string>
  ) => {
    setSettings(prev => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Имитация сохранения настроек
      await new Promise(resolve => setTimeout(resolve, 1000));
      setShowSuccess(true);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Box>
      <Paper sx={{ p: 3 }}>
        <List>
          {/* Уведомления */}
          <ListItem>
            <ListItemText
              primary="Уведомления"
              secondary="Настройки оповещений системы"
            />
          </ListItem>
          <ListItem>
            <Box sx={{ pl: 2, display: 'flex', flexWrap: 'wrap' }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.desktopNotifications}
                    onChange={handleSwitchChange('desktopNotifications')}
                  />
                }
                label="Уведомления в браузере"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.emailNotifications}
                    onChange={handleSwitchChange('emailNotifications')}
                  />
                }
                label="Email уведомления"
                sx={{ pl: { md: 4, xs: 0 } }}
              />
            </Box>
          </ListItem>

          <Divider sx={{ my: 2 }} />

          {/* Тикеты */}
          <ListItem>
            <ListItemText
              primary="Тикеты"
              secondary="Настройки работы с заявками"
            />
          </ListItem>
          <ListItem>
            <Box sx={{ pl: 2, width: '100%', display: 'grid', gap: 2 }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.autoAssignment}
                    onChange={handleSwitchChange('autoAssignment')}
                  />
                }
                label="Автоматическое назначение тикетов"
              />
              
              <FormControl fullWidth>
                <InputLabel id="default-priority-label">Приоритет по умолчанию</InputLabel>
                <Select
                  labelId="default-priority-label"
                  value={settings.defaultPriority}
                  label="Приоритет по умолчанию"
                  onChange={handleSelectChange('defaultPriority')}
                >
                  <MenuItem value="low">Низкий</MenuItem>
                  <MenuItem value="medium">Средний</MenuItem>
                  <MenuItem value="high">Высокий</MenuItem>
                </Select>
              </FormControl>

              <TextField
                fullWidth
                label="Назначать по умолчанию"
                value={settings.defaultAssignee}
                onChange={handleTextChange('defaultAssignee')}
                placeholder="Email сотрудника"
              />

              <TextField
                type="number"
                fullWidth
                label="Тикетов на странице"
                value={settings.ticketsPerPage}
                onChange={handleTextChange('ticketsPerPage')}
                inputProps={{ min: 5, max: 50 }}
              />
            </Box>
          </ListItem>

          <Divider sx={{ my: 2 }} />

          {/* Интерфейс */}
          <ListItem>
            <ListItemText
              primary="Интерфейс"
              secondary="Настройки языка приложения"
            />
          </ListItem>
          <ListItem>
            <Box sx={{ pl: 2, width: '100%' }}>
              <FormControl fullWidth>
                <InputLabel id="language-label">Перевод</InputLabel>
                <Select
                  labelId="language-label"
                  value={settings.language}
                  label="Перевод"
                  onChange={handleSelectChange('language')}
                >
                  <MenuItem value="ru">Русский</MenuItem>
                  <MenuItem value="en">English</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </ListItem>
        </List>

        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            variant="contained"
            startIcon={<SaveIcon />}
            onClick={handleSave}
            disabled={isSaving}
          >
            {isSaving ? 'Сохранение...' : 'Сохранить настройки'}
          </Button>
        </Box>
      </Paper>

      <Snackbar
        open={showSuccess}
        autoHideDuration={3000}
        onClose={() => setShowSuccess(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="success" sx={{ width: '100%', mb: 2 }}>
          Настройки успешно сохранены
        </Alert>
      </Snackbar>
    </Box>
  );
} 