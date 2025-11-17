# Как зайти в админку Nova на Railway

## Если бэкенд задеплоен на Railway

### Шаг 1: Найдите URL бэкенда

1. Зайдите на [Railway Dashboard](https://railway.app/dashboard)
2. Выберите ваш проект
3. Найдите сервис с бэкендом (Laravel)
4. В разделе **"Settings"** → **"Networking"** или в **"Deployments"** найдите **Public Domain**
5. URL будет типа: `https://your-app.railway.app`

### Шаг 2: Откройте админку Nova

Админка доступна по адресу:
```
https://your-backend-url.railway.app/nova
```

Например, если ваш бэкенд на `https://propozly-api.railway.app`, то админка:
```
https://propozly-api.railway.app/nova
```

### Шаг 3: Создайте пользователя для входа

Если у вас еще нет пользователя для Nova, создайте его через Railway CLI:

#### Вариант A: Через Railway CLI (рекомендуется)

1. Установите Railway CLI:
   ```bash
   npm i -g @railway/cli
   ```

2. Войдите:
   ```bash
   railway login
   ```

3. Подключитесь к проекту:
   ```bash
   railway link
   ```
   Выберите ваш проект

4. Запустите команду создания пользователя:
   ```bash
   railway run php artisan nova:user
   ```
   
   Или если бэкенд в подпапке:
   ```bash
   cd backend
   railway run php artisan nova:user
   ```

#### Вариант B: Через веб-интерфейс Railway

1. В Railway Dashboard выберите ваш сервис с бэкендом
2. Перейдите в **"Deployments"**
3. Найдите последний деплой
4. Нажмите на **"View Logs"** или **"Shell"**
5. Если есть доступ к Shell, выполните:
   ```bash
   php artisan nova:user
   ```

#### Вариант C: Через Tinker (если есть доступ к базе)

Если у вас есть доступ к базе данных, можно создать пользователя через миграцию или seeder.

### Шаг 4: Войдите в админку

1. Откройте `https://your-backend-url.railway.app/nova`
2. Введите email и пароль созданного пользователя
3. Готово!

---

## Если фронтенд тоже на Railway

Если вы задеплоили и фронтенд, и бэкенд на Railway как отдельные сервисы:

### Структура проекта на Railway:

```
Ваш проект Railway
├── Сервис 1: Backend (Laravel)
│   └── URL: https://backend.railway.app
│   └── Root Directory: backend
│
└── Сервис 2: Frontend (Nuxt)
    └── URL: https://frontend.railway.app
    └── Root Directory: . (корень)
```

### Настройка переменных окружения:

**В сервисе Frontend:**
```
NUXT_PUBLIC_API_BASE=https://backend.railway.app
```

**В сервисе Backend:**
```
FRONTEND_URL=https://frontend.railway.app
CORS_ALLOWED_ORIGINS=https://frontend.railway.app
SANCTUM_STATEFUL_DOMAINS=frontend.railway.app
SESSION_SAME_SITE=none
SESSION_SECURE_COOKIE=true
```

---

## Если всё в одном сервисе (не рекомендуется)

Если вы задеплоили всё в один сервис, это может быть проблемой, потому что:
- Фронтенд (Nuxt) - Node.js приложение
- Бэкенд (Laravel) - PHP приложение
- Они должны работать отдельно

**Рекомендация:** Создайте два отдельных сервиса на Railway:
1. Один для бэкенда (Root Directory: `backend`)
2. Один для фронтенда (Root Directory: `.`)

---

## Проверка работы

### 1. Проверьте, что бэкенд работает:

Откройте в браузере:
```
https://your-backend-url.railway.app/api/auth/user
```

Должна быть ошибка 401 (Unauthorized) - это нормально, значит API работает.

### 2. Проверьте админку:

```
https://your-backend-url.railway.app/nova
```

Должна открыться страница входа в Nova.

### 3. Проверьте логи (если что-то не работает):

В Railway Dashboard:
- Выберите сервис с бэкендом
- **Deployments** → выберите деплой → **View Logs**

Или через CLI:
```bash
railway logs
```

---

## Частые проблемы

### Ошибка 404 на /nova

- Проверьте, что Nova установлена: `composer show laravel/nova`
- Проверьте логи: `railway logs`
- Убедитесь, что провайдеры зарегистрированы

### Ошибка "This domain is not authorized"

- Проверьте переменную `NOVA_LICENSE_KEY` в Railway → Settings → Variables
- Убедитесь, что лицензия Nova привязана к правильному домену

### Не могу создать пользователя

- Убедитесь, что база данных настроена и миграции запущены
- Проверьте подключение к БД в Railway → Settings → Variables
- Попробуйте запустить миграции: `railway run php artisan migrate`

### CORS ошибки

- Убедитесь, что `FRONTEND_URL` и `CORS_ALLOWED_ORIGINS` содержат правильный URL фронтенда
- Проверьте, что `SESSION_SAME_SITE=none` и `SESSION_SECURE_COOKIE=true`

---

## Быстрая команда для создания пользователя

Если у вас установлен Railway CLI:

```bash
# В корне проекта
railway link
railway run --service backend php artisan nova:user

# Или если бэкенд в подпапке backend
cd backend
railway run php artisan nova:user
```

---

## Полезные команды Railway CLI

```bash
# Войти в аккаунт
railway login

# Подключиться к проекту
railway link

# Посмотреть логи
railway logs

# Запустить команду в контейнере
railway run php artisan migrate
railway run php artisan nova:user
railway run composer install

# Открыть Shell
railway shell
```

