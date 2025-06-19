# Help Desk App

[![Node.js Version](https://img.shields.io/badge/node-v20.19.2-blue.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-19.1.0-61DAFB?logo=react&logoColor=white)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Material UI](https://img.shields.io/badge/Material%20UI-7.0.2-0081CB?logo=mui&logoColor=white)](https://mui.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 📝 Описание

**Help Desk** — это Pet-проект, макет современной системы поддержки пользователей (Help Desk). Приложение реализует интерфейс для работы с заявками, комментариями и настройками, но на текущем этапе не содержит функционирующей Backend-части. В дальнейшем может быть расширен полноценным сервером и интеграцией с реальными API.

## 👀 Демо

Демо-версия приложения доступна по адресу: [help-desk-app-one.vercel.app](https://help-desk-app-one.vercel.app)

## ✨ Возможности

- Аутентификация (макет, с использованием тестовых пользователей)
- Просмотр панели управления с метриками заявок (на мок-данных)
- Список тикетов с фильтрацией по статусу и приоритету
- Просмотр и редактирование деталей тикета
- Добавление комментариев и вложений к тикетам
- Управление настройками профиля и системы (имитация)
- Адаптивный дизайн для мобильных и десктопных устройств

> ⚠️ **Внимание:** Все данные заявок и пользователей берутся из исходных файлов проекта:
> - Моковые данные пользователей для авторизации: [`src/contexts/AuthContext.tsx`](src/contexts/AuthContext.tsx)
> - Моковые данные тикетов: [`src/utils/mock.ts`](src/utils/mock.ts)<br/><br/>
> Серверная часть отсутствует, данные не сохраняются между сессиями.

## 🛠 Технологический стек

- **React 19** — библиотека для построения пользовательских интерфейсов
- **TypeScript** — статическая типизация
- **Vite** — современный инструмент сборки и разработки
- **Material UI (MUI)** — компонентная библиотека для стилизации интерфейса
- **React Router DOM** — маршрутизация
- **ESLint** — анализатор кода для поддержания качества
- **@emotion/react, @emotion/styled** — стилизация компонентов

## 📋 Требования

- Node.js v20.19.2 (рекомендуется)
- npm или yarn

## 🚀 Установка и запуск

1. **Клонируйте репозиторий:**
   ```bash
   git clone <URL-репозитория>
   cd help-desk-app
   ```

2. **Установите зависимости:**
   ```bash
   npm install
   # или
   yarn install
   ```

3. **Запустите приложение в режиме разработки:**
   ```bash
   npm run dev
   # или
   yarn dev
   ```

4. **Сборка для продакшена:**
   ```bash
   npm run build
   # или
   yarn build
   ```

5. **Просмотр собранного приложения:**
   ```bash
   npm run preview
   # или
   yarn preview
   ```

## 📁 Структура проекта

```
help-desk-app/
│
├── public/                # Статические файлы
│   └── favicon.png        # Иконка приложения
│
├── src/
│   ├── components/        # Переиспользуемые UI-компоненты
│   │   ├── CommentSection.tsx      # Компонент комментариев
│   │   ├── Layout.tsx              # Основновные слои
│   │   ├── LoginWrapper.tsx        # Обертка для авторизации
│   │   ├── ProtectedRoute.tsx      # Защищенные маршруты
│   │   ├── TicketDetailsWrapper.tsx # Обертка деталей тикета
│   │   ├── TicketFilters.tsx       # Фильтры тикетов
│   │   └── TicketForm.tsx          # Форма создания/редактирования тикета
│   ├── contexts/          # React-контексты
│   │   └── AuthContext.tsx         # Контекст аутентификации
│   ├── pages/             # Страницы приложения
│   │   ├── DashboardPage.tsx       # Панель управления
│   │   ├── LoginPage.tsx           # Страница входа
│   │   ├── SettingsPage.tsx        # Настройки
│   │   ├── TicketDetailsPage.tsx   # Детали тикета
│   │   └── TicketsPage.tsx         # Список тикетов
│   ├── theme/             # Темизация
│   │   └── theme.ts               # Конфигурация темы
│   ├── types/             # Типы TypeScript
│   │   ├── auth.ts                # Типы аутентификации
│   │   └── ticket.ts              # Типы тикетов
│   ├── utils/             # Вспомогательные функции
│   │   ├── format.ts              # Функции форматирования
│   │   ├── getColor.ts            # Утилиты для цветов
│   │   ├── mock.ts                # Мок-данные
│   │   └── translations.ts        # Переводы
│   ├── App.tsx            # Корневой компонент приложения
│   ├── App.css            # Стили приложения
│   ├── index.css          # Глобальные стили
│   ├── main.tsx           # Точка входа
│   ├── routes.tsx         # Описание маршрутов
│   └── version.ts         # Версия приложения
│
├── .gitignore             # Исключения Git
├── index.html             # HTML-шаблон
├── package.json           # Описание зависимостей и скриптов
├── package-lock.json      # Блокировка версий зависимостей
├── vite.config.ts         # Конфигурация Vite
├── tsconfig.json          # Основная конфигурация TypeScript
├── tsconfig.app.json      # Конфигурация TypeScript для приложения
└── tsconfig.node.json     # Конфигурация TypeScript для Node.js
```

## 💡 Пример использования

- Войдите в систему (используя тестовые данные).
- Просматривайте и фильтруйте тикеты по статусу и приоритету.
- Открывайте детали тикета, добавляйте комментарии и файлы.
- Управляйте настройками профиля и системы.

## 🤝 Вклад в проект

1. Форкните репозиторий
2. Создайте ветку для ваших изменений: `git checkout -b feature/amazing-feature`
3. Зафиксируйте изменения: `git commit -m 'Add amazing feature'`
4. Отправьте изменения: `git push origin feature/amazing-feature`
5. Создайте Pull Request с подробным описанием изменений

## 🔮 Перспективы развития

- Реализация полноценной серверной-части (REST API, аутентификация, хранение данных)
- Интеграция с внешними сервисами
- Реальные уведомления и рассылки
- Ролевая модель пользователей
- Тестирование и деплой

## 📄 Лицензия

Этот проект распространяется под лицензией MIT. Подробности смотрите в файле [LICENSE](LICENSE).