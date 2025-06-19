import { useState, useRef } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Avatar,
  Divider,
  CircularProgress
} from '@mui/material';
import { Send as SendIcon } from '@mui/icons-material';
import type { Comment } from '../types/ticket';
import { useAuth } from '../contexts/AuthContext';
import { formatDate } from '../utils/format';

interface CommentSectionProps {
  comments: Comment[];
  onAddComment: (content: string) => Promise<void>;
  isLoading?: boolean;
}

export default function CommentSection({ comments, onAddComment, isLoading = false }: CommentSectionProps) {
  const [newComment, setNewComment] = useState('');
  const [attachedFile, setAttachedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { user } = useAuth();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!newComment.trim() && !attachedFile) return;

    await onAddComment(newComment.trim());
    setNewComment('');
    setAttachedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // Обработка нажатия клавиш для отправки по Enter
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      if (newComment.trim() && !isLoading) {
        handleSubmit(event as any);
      }
    }
  };

  // Обработка выбора файла
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 1024 * 1024) {
        alert('Файл не должен превышать 1 МБ');
        return;
      }
      setAttachedFile(file);
    }
  };

  // Обработка вставки файла через Ctrl+V
  const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
    const items = e.clipboardData.items;
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (item.kind === 'file') {
        const file = item.getAsFile();
        if (file) {
          if (file.size > 1024 * 1024) {
            alert('Файл не должен превышать 1 МБ');
            return;
          }
          setAttachedFile(file);
        }
      }
    }
  };

  // Удаление прикрепленного файла
  const handleRemoveFile = () => {
    setAttachedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" gutterBottom sx={{ ml: 3}}>
        Комментарии
      </Typography>

      {/* Список комментариев */}
      <Box sx={{ mb: 4 }}>
        {comments.length === 0 ? (
          <Typography color="text.secondary" sx={{ py: 2, ml: 3 }}>
            Пока нет комментариев
          </Typography>
        ) : (
          comments.map((comment, index) => (
            <Paper
              key={comment.id}
              sx={{
                p: 2,
                mb: 2,
                backgroundColor: comment.createdBy.id === user?.id ? 'action.hover' : 'background.paper'
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                <Avatar sx={{ bgcolor: 'primary.main' }}>
                  {comment.createdBy.name.charAt(0)}
                </Avatar>
                <Box sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="subtitle2">
                      {comment.createdBy.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {formatDate(comment.createdAt)}
                    </Typography>
                  </Box>
                  <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>
                    {comment.content}
                  </Typography>
                </Box>
              </Box>
            </Paper>
          ))
        )}
      </Box>

      {/* Форма добавления комментария */}
      <Paper sx={{ p: 2 }}>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            multiline
            rows={3}
            placeholder="Напишите комментарий..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            disabled={isLoading}
            sx={{ mb: 2 }}
            onKeyDown={handleKeyDown}
            onPaste={handlePaste}
          />
          {/* Кнопка и отображение файла */}
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, flexWrap: 'wrap' }}>
            <input
              type="file"
              style={{ display: 'none' }}
              ref={fileInputRef}
              onChange={handleFileChange}
              disabled={isLoading}
            />
            <Button
              variant="contained"
              size="small"
              onClick={() => fileInputRef.current?.click()}
              disabled={isLoading}
              sx={{ mr: 2 }}
            >
              Прикрепить файл
            </Button>
            <Button
              type="submit"
              variant="contained"
              size="small"
              endIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : <SendIcon />}
              disabled={(!newComment.trim() && !attachedFile) || isLoading}
              sx={{ ml: 'auto' }}
            >
              Отправить
            </Button>
          </Box>
          {attachedFile && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="body2">{attachedFile.name}</Typography>
                <Button size="small" color="error" onClick={handleRemoveFile}>Удалить</Button>
              </Box>
            )}
        </form>
      </Paper>
    </Box>
  );
} 