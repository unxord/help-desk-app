import { useState, useRef } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Avatar,
  Divider,
  CircularProgress,
  Dialog,
  DialogContent
} from '@mui/material';
import { Send as SendIcon } from '@mui/icons-material';
import type { Comment } from '../types/ticket';
import { useAuth } from '../contexts/AuthContext';
import { formatDate } from '../utils/format';

interface CommentSectionProps {
  comments: Comment[];
  onAddComment: (content: string, file?: File | null) => Promise<void>;
  isLoading?: boolean;
}

export default function CommentSection({ comments, onAddComment, isLoading = false }: CommentSectionProps) {
  const [newComment, setNewComment] = useState('');
  const [attachedFile, setAttachedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { user } = useAuth();

  // Состояние для модального просмотра изображения
  const [openImage, setOpenImage] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!newComment.trim() && !attachedFile) return;

    await onAddComment(newComment.trim(), attachedFile);
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
                  {/* Превью файла, если есть */}
                  {comment.fileUrl && (
                    <Box sx={{ mt: 1 }}>
                      {comment.fileUrl.match(/^data:image\//) ? (
                        <img
                          src={comment.fileUrl}
                          alt={comment.fileName || 'file'}
                          style={{ maxWidth: 200, maxHeight: 200, borderRadius: 8, cursor: 'pointer' }}
                          onClick={() => setOpenImage(comment.fileUrl!)}
                        />
                      ) : (
                        <a href={comment.fileUrl} target="_blank" rel="noopener noreferrer">{comment.fileName || 'Скачать файл'}</a>
                      )}
                    </Box>
                  )}
                </Box>
              </Box>
            </Paper>
          ))
        )}
      </Box>

      {/* Модальное окно для просмотра изображения */}
      <Dialog open={!!openImage} onClose={() => setOpenImage(null)} fullScreen PaperProps={{ sx: { backgroundColor: 'rgba(0,0,0,0.85)' } }}>
        <DialogContent
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100vw',
            height: '100vh',
            p: 0,
            background: 'transparent',
          }}
          onClick={() => setOpenImage(null)}
        >
          {openImage && (
            <img
              src={openImage}
              alt="Просмотр изображения"
              style={{
                maxWidth: '90vw',
                maxHeight: '90vh',
                width: 'auto',
                height: 'auto',
                boxShadow: '0 0 24px 0 rgba(0,0,0,0.5)',
                borderRadius: 8,
                background: '#fff',
                cursor: 'pointer',
              }}
              onClick={e => {
                e.stopPropagation();
                setOpenImage(null);
              }}
            />
          )}
        </DialogContent>
      </Dialog>

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
                <Typography variant="body2">
                  {(() => {
                    const name = attachedFile.name;
                    const lastDot = name.lastIndexOf('.');
                    const ext = lastDot !== -1 ? name.slice(lastDot) : '';
                    const base = lastDot !== -1 ? name.slice(0, lastDot) : name;
                    return base.length > 15
                      ? `${base.slice(0, 15)}..${ext}`
                      : name;
                  })()}
                </Typography>
                <Button size="small" color="error" onClick={handleRemoveFile}>Удалить</Button>
              </Box>
            )}
        </form>
      </Paper>
    </Box>
  );
} 