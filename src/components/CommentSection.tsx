import { useState } from 'react';
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
  const { user } = useAuth();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!newComment.trim()) return;

    await onAddComment(newComment.trim());
    setNewComment('');
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        Комментарии
      </Typography>

      {/* Список комментариев */}
      <Box sx={{ mb: 4 }}>
        {comments.length === 0 ? (
          <Typography color="text.secondary" sx={{ py: 2 }}>
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
          />
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              type="submit"
              variant="contained"
              endIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : <SendIcon />}
              disabled={!newComment.trim() || isLoading}
            >
              Отправить
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
} 