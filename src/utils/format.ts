/**
 * Форматирует дату в формате "ЧЧ:ММ, ДД.ММ.ГГ"
 * @param dateString - строка с датой в формате ISO
 * @returns отформатированная дата
 */
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const time = date.toLocaleTimeString('ru-RU', {
    hour: '2-digit',
    minute: '2-digit'
  });
  const datePart = date.toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit'
  });
  return `${time}, ${datePart}`;
}; 