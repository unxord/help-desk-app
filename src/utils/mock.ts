import type { Ticket } from '../types/ticket';

/**
 * Тестовые данные заявок для разработки и демонстрации.
 * Содержит примеры заявок с различными статусами и приоритетами.
 * 
 * Примеры включают:
 * - Заявки в разных статусах (открытые, в работе, решенные)
 * - Заявки с разными приоритетами
 * - Заявки с назначенными и без назначенных исполнителей
 */
export const mockTickets: Ticket[] = [
  {
    id: '1',
    title: 'Проблема с авторизацией',
    description: '',
    status: 'open',
    priority: 'high',
    createdAt: '2024-03-20T10:00:00Z',
    updatedAt: '2024-03-20T10:00:00Z',
    createdBy: 'user1'
  },
  {
    id: '2',
    title: 'Ошибка при загрузке файлов',
    description: '',
    status: 'in_progress',
    priority: 'medium',
    createdAt: '2024-03-19T16:45:00Z',
    updatedAt: '2024-03-19T16:45:00Z',
    createdBy: 'user2',
    assignedTo: 'it.support'
  },
  {
    id: '3',
    title: 'Сбой при проведении документа перемещения сырья',
    description: '',
    status: 'resolved',
    priority: 'low',
    createdAt: '2024-03-18T12:43:00Z',
    updatedAt: '2024-03-18T12:43:00Z',
    createdBy: 'user2',
    assignedTo: 'Администратор'
  },
  {
    id: '4',
    title: 'Принтер в экспедиции жует бумагу',
    description: '',
    status: 'resolved',
    priority: 'low',
    createdAt: '2024-03-19T20:14:00Z',
    updatedAt: '2024-03-19T20:14:00Z',
    createdBy: 'user2',
    assignedTo: 'Администратор'
  }
];