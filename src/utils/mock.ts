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
    id: '21',
    title: 'Не работает сканер в бухгалтерии',
    description: 'Сканер Canon CanoScan LiDE 400 не отвечает на команды, горит красный индикатор',
    status: 'resolved',
    priority: 'medium',
    createdAt: '2024-03-21T14:30:00',
    updatedAt: '2024-03-21T14:30:00',
    createdBy: 'user3'
  },
  {
    id: '20',
    title: 'Медленная работа 1С:Предприятие',
    description: 'Программа 1С работает очень медленно, открытие документов занимает 2-3 минуты',
    status: 'open',
    priority: 'medium',
    createdAt: '2024-03-21T11:15:00',
    updatedAt: '2024-03-21T11:15:00',
    createdBy: 'user4',
    assignedTo: 'it.support'
  },
  {
    id: '19',
    title: 'Не подключается к корпоративной сети',
    description: 'Ноутбук не может подключиться к Wi-Fi сети офиса, показывает ошибку "Не удается подключиться к этой сети"',
    status: 'in_progress',
    priority: 'high',
    createdAt: '2024-03-21T09:45:00',
    updatedAt: '2024-03-21T09:45:00',
    createdBy: 'user5'
  },
  {
    id: '18',
    title: 'Проблема с печатью в Excel',
    description: 'При печати таблиц Excel страницы обрезаются, не помещается весь контент',
    status: 'resolved',
    priority: 'low',
    createdAt: '2024-03-20T16:20:00',
    updatedAt: '2024-03-20T16:20:00',
    createdBy: 'user6',
    assignedTo: 'Администратор'
  },
  {
    id: '17',
    title: 'Не открывается Outlook',
    description: 'При запуске Outlook появляется ошибка "Не удается запустить Microsoft Outlook"',
    status: 'in_progress',
    priority: 'high',
    createdAt: '2024-03-20T13:10:00',
    updatedAt: '2024-03-20T13:10:00',
    createdBy: 'user7',
    assignedTo: 'it.support'
  },
  {
    id: '16',
    title: 'Проблема с доступом к общим папкам',
    description: 'Не могу получить доступ к папке "Общие документы", пишет "Отказано в доступе"',
    status: 'in_progress',
    priority: 'medium',
    createdAt: '2024-03-20T10:25:00',
    updatedAt: '2024-03-20T10:25:00',
    createdBy: 'user8'
  },
  {
    id: '15',
    title: 'Не работает веб-камера на совещаниях',
    description: 'В Zoom и Teams не работает встроенная веб-камера ноутбука, показывает черный экран',
    status: 'resolved',
    priority: 'medium',
    createdAt: '2024-03-19T15:40:00',
    updatedAt: '2024-03-19T15:40:00',
    createdBy: 'user9',
    assignedTo: 'Администратор'
  },
  {
    id: '14',
    title: 'Проблема с установкой обновлений Windows',
    description: 'Windows не может установить обновления, показывает ошибку 0x80070057',
    status: 'resolved',
    priority: 'low',
    createdAt: '2024-03-19T12:05:00',
    updatedAt: '2024-03-19T12:05:00',
    createdBy: 'user10',
    assignedTo: 'it.support'
  },
  {
    id: '13',
    title: 'Не работает факс в приемной',
    description: 'Факс Panasonic KX-FT988 не принимает входящие звонки, не отвечает на кнопки',
    status: 'open',
    priority: 'medium',
    createdAt: '2024-03-19T08:30:00',
    updatedAt: '2024-03-19T08:30:00',
    createdBy: 'user11'
  },
  {
    id: '12',
    title: 'Проблема с синхронизацией в Google Drive',
    description: 'Файлы не синхронизируются с Google Drive, показывает "Ошибка синхронизации"',
    status: 'resolved',
    priority: 'low',
    createdAt: '2024-03-18T17:15:00',
    updatedAt: '2024-03-18T17:15:00',
    createdBy: 'user12',
    assignedTo: 'Администратор'
  },
  {
    id: '11',
    title: 'Не работает USB-порт',
    description: 'USB-порт на рабочем столе не распознает подключенные устройства (мышь, клавиатура)',
    status: 'resolved',
    priority: 'high',
    createdAt: '2024-03-18T14:50:00',
    updatedAt: '2024-03-18T14:50:00',
    createdBy: 'user13',
    assignedTo: 'it.support'
  },
  {
    id: '10',
    title: 'Проблема с доступом к корпоративному сайту',
    description: 'Не могу зайти на внутренний сайт компании, пишет "Сервер недоступен"',
    status: 'resolved',
    priority: 'high',
    createdAt: '2024-03-18T11:20:00',
    updatedAt: '2024-03-18T11:20:00',
    createdBy: 'user14'
  },
  {
    id: '9',
    title: 'Не работает звук в наушниках',
    description: 'Подключенные наушники не воспроизводят звук, хотя система их видит',
    status: 'resolved',
    priority: 'low',
    createdAt: '2024-03-17T16:35:00',
    updatedAt: '2024-03-17T16:35:00',
    createdBy: 'user15',
    assignedTo: 'Администратор'
  },
  {
    id: '8',
    title: 'Проблема с резервным копированием',
    description: 'Автоматическое резервное копирование не выполняется, показывает ошибку "Недостаточно места"',
    status: 'resolved',
    priority: 'medium',
    createdAt: '2024-03-17T13:45:00',
    updatedAt: '2024-03-17T13:45:00',
    createdBy: 'user16',
    assignedTo: 'it.support'
  },
  {
    id: '7',
    title: 'Не работает проектор в конференц-зале',
    description: 'Проектор Epson не включается, индикатор питания не горит',
    status: 'resolved',
    priority: 'high',
    createdAt: '2024-03-17T10:10:00',
    updatedAt: '2024-03-17T10:10:00',
    createdBy: 'user17'
  },
  {
    id: '6',
    title: 'Проблема с установкой принтера',
    description: 'Не могу установить новый принтер HP LaserJet Pro, драйвер не устанавливается',
    status: 'resolved',
    priority: 'medium',
    createdAt: '2024-03-16T18:25:00',
    updatedAt: '2024-03-16T18:25:00',
    createdBy: 'user18',
    assignedTo: 'Администратор'
  },
  {
    id: '5',
    title: 'Не работает интернет на рабочем месте',
    description: 'Нет подключения к интернету, значок сети показывает красный крестик',
    status: 'resolved',
    priority: 'high',
    createdAt: '2024-03-16T15:30:00',
    updatedAt: '2024-03-16T15:30:00',
    createdBy: 'user19'
  },
  {
    id: '4',
    title: 'Проблема с авторизацией',
    description: 'Ошибка авторизации в системе №123',
    status: 'resolved',
    priority: 'high',
    createdAt: '2024-03-20T10:00:00',
    updatedAt: '2024-03-20T10:00:00',
    createdBy: 'user1'
  },
  {
    id: '3',
    title: 'Ошибка при загрузке файлов',
    description: 'Не могу загрузить файлы, не отображаются в списке',
    status: 'resolved',
    priority: 'medium',
    createdAt: '2024-03-19T16:45:00',
    updatedAt: '2024-03-19T16:45:00',
    createdBy: 'user2',
    assignedTo: 'it.support'
  },
  {
    id: '2',
    title: 'Сбой при проведении документа перемещения сырья',
    description: 'Сообщение "Недостаточно прав"',
    status: 'resolved',
    priority: 'low',
    createdAt: '2024-03-18T12:43:00',
    updatedAt: '2024-03-18T12:43:00',
    createdBy: 'user2',
    assignedTo: 'Администратор'
  },
  {
    id: '1',
    title: 'Принтер в экспедиции жует бумагу',
    description: 'Жует бумагу каждые 5 минут, принтер Riso FW-1710',
    status: 'resolved',
    priority: 'low',
    createdAt: '2024-03-17T20:14:00',
    updatedAt: '2024-03-17T20:14:00',
    createdBy: 'user2',
    assignedTo: 'Администратор'
  }
];