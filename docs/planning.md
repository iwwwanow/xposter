# План разработки xposter

## Фаза 0: Фундамент ✅
- [x] Проектирование архитектуры (гексагональная, ports & adapters)
- [x] Выбор стека: TypeScript, grammy, drizzle-orm + SQLite, node-cron
- [x] Скаффолдинг: package.json, tsconfig.json, config.ts, drizzle.config.ts
- [x] Схема БД: таблицы `publications`, `accounts`
- [x] Бойлерплейт всех модулей (`publication`, `social-media-account`, adapters)
- [x] GitHub Actions: сборка и push Docker-образа в ghcr.io

## Фаза 1: Управление аккаунтами
- [ ] `AccountRepository`: реализовать `save`, `findByUserAndPlatform`, `findByUser`, `delete`
- [ ] Шифрование/дешифрование credentials (ENCRYPTION_KEY, AES-256)
- [ ] `AccountService`: валидация credentials через API платформы перед сохранением
- [ ] Bot-хендлеры: `/connect` — пошаговый диалог выбора платформы и ввода данных
- [ ] Bot-хендлеры: `/accounts` — список подключённых аккаунтов
- [ ] Bot-хендлеры: `/disconnect` — отключение аккаунта

## Фаза 2: Публикация (без планировщика)
- [ ] `PublicationRepository`: реализовать `create`, `findById`, `findByUser`, `updateStatus`
- [ ] `TelegramAdapter`: `postText`, `postImage`, `postAudio`
- [ ] `InstagramAdapter`: `postImage`, `postStory`
- [ ] `TwitterAdapter`: `postText`, `postImage`
- [ ] Bot-хендлеры: `/post` — пошаговый диалог (контент → платформы → отправить)
- [ ] Запуск миграций при старте (`npm run db:migrate`)

## Фаза 3: Отложенные посты
- [ ] `PublicationRepository`: реализовать `findScheduledBefore`
- [ ] `PublicationScheduler`: опрос каждую минуту, запуск `dispatch` для просроченных
- [ ] Bot-хендлер `/post`: добавить шаг выбора времени отправки
- [ ] Bot-хендлер `/scheduled`: список запланированных постов с возможностью отмены

## Фаза 4: Истории (Stories)
- [ ] `InstagramAdapter.postStory`: реализовать
- [ ] `TelegramAdapter.postStory`: оценить возможности Bot API, возможно — user-level auth
- [ ] Bot-хендлер: тип контента "история" в `/post`-диалоге

## Фаза 5: Полировка
- [ ] Обработка ошибок: уведомление пользователя при сбое публикации
- [ ] Повторные попытки (`retry`) для временных ошибок API
- [ ] `/help` с описанием всех команд
- [ ] Локализация строк (вынести в константы)
