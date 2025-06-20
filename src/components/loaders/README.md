# Компоненты загрузки

Этот модуль содержит переиспользуемые компоненты для отображения состояний загрузки в приложении.

## Компоненты

### LoadingSpinner

Универсальный компонент для отображения индикатора загрузки с текстом.

**Пропсы:**
- `message?: string` - Текст сообщения (по умолчанию: "Загрузка...")
- `fullHeight?: boolean` - Использовать полную высоту экрана (по умолчанию: true)

**Пример использования:**
```tsx
import { LoadingSpinner } from './loaders';

// Простая загрузка
<LoadingSpinner />

// С кастомным сообщением
<LoadingSpinner message="Проверка авторизации..." />

// Без полной высоты экрана
<LoadingSpinner message="Загрузка данных..." fullHeight={false} />
```

### PageLoader

Компонент для загрузки страниц с настраиваемым размером индикатора.

**Пропсы:**
- `message?: string` - Текст сообщения (по умолчанию: "Загрузка...")
- `size?: 'small' | 'medium' | 'large'` - Размер индикатора (по умолчанию: "medium")
- `fullHeight?: boolean` - Использовать полную высоту экрана (по умолчанию: true)

**Пример использования:**
```tsx
import { PageLoader } from './loaders';

// Средний размер (по умолчанию)
<PageLoader message="Загрузка тикета..." />

// Большой размер для важных операций
<PageLoader message="Сохранение изменений..." size="large" />

// Маленький размер без полной высоты
<PageLoader message="Обновление..." size="small" fullHeight={false} />
```

## Использование в приложении

### Авторизация
- `LoadingSpinner` используется при инициализации приложения для проверки сохраненной авторизации
- `LoginPage` показывает встроенный индикатор загрузки в кнопке входа

### Загрузка данных
- `PageLoader` используется в `TicketDetailsWrapper` при загрузке деталей тикета
- Компоненты могут быть легко добавлены в другие части приложения

### Рекомендации
- Используйте `LoadingSpinner` для общих состояний загрузки
- Используйте `PageLoader` для загрузки контента страниц
- Настройте `fullHeight={false}` для загрузки в контейнерах
- Предоставляйте информативные сообщения пользователю 