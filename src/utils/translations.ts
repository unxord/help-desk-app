/**
 * Словарь переводов для статусов заявок.
 * Используется для отображения статусов на русском языке в интерфейсе.
 */
export const statusTranslations = {
  open: 'Открыт',
  in_progress: 'В работе',
  resolved: 'Решен',
  closed: 'Закрыт'
} as const;

/**
 * Словарь переводов для приоритетов заявок.
 * Используется для отображения приоритетов на русском языке в интерфейсе.
 */
export const priorityTranslations = {
  low: 'Низкий',
  medium: 'Средний',
  high: 'Высокий'
} as const;

/** Тип, содержащий все возможные ключи статусов */
export type StatusTranslationKey = keyof typeof statusTranslations;
/** Тип, содержащий все возможные ключи приоритетов */
export type PriorityTranslationKey = keyof typeof priorityTranslations; 