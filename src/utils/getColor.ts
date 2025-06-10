import type { Ticket } from '../types/ticket';

/**
 * Возвращает цвет для отображения статуса тикета
 * @param {Ticket['status']} status - Статус тикета
 * @returns {'info' | 'warning' | 'success' | 'default'} Цвет для отображения статуса
 * @example
 * getStatusColor('open') // returns 'info'
 * getStatusColor('in_progress') // returns 'warning'
 */
export const getStatusColor = (status: Ticket['status']) => {
    const colors = {
      open: 'info',
      in_progress: 'warning',
      resolved: 'success',
      closed: 'default'
    } as const;
    return colors[status];
  };

/**
 * Возвращает цвет для отображения приоритета тикета
 * @param {Ticket['priority']} priority - Приоритет тикета
 * @returns {'info' | 'warning' | 'error'} Цвет для отображения приоритета
 * @example
 * getPriorityColor('low') // returns 'info'
 * getPriorityColor('high') // returns 'error'
 */
export const getPriorityColor = (priority: Ticket['priority']) => {
    const colors = {
      low: 'info',
      medium: 'warning',
      high: 'error'
    } as const;
    return colors[priority];
  };