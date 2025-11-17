# Как задеплоить бэкенд (Laravel)

## Важно понимать

**Vercel деплоит только фронтенд (Nuxt), но не может запускать PHP/Laravel!**

Бэкенд нужно деплоить отдельно на платформе, которая поддерживает PHP:
- Railway
- Fly.io
- Render
- VPS сервер
- Heroku (платный)

---

## Вариант 1: Railway (самый простой, рекомендую)

### Шаг 1: Подготовка

1. Зарегистрируйтесь на [Railway.app](https://railway.app)
2. Подключите GitHub репозиторий

### Шаг 2: Создание проекта

1. В Railway нажмите **"New Project"**
2. Выберите **"Deploy from GitHub repo"**
3. Выберите ваш репозиторий
4. **ВАЖНО:** В настройках проекта укажите:
   - **Root Directory:** `backend`
   - Railway автоматически определит, что это Laravel

### Шаг 3: Настройка переменных окружения

В Railway → Settings → Variables добавьте:

```env
APP_NAME=Propozly
APP_ENV=production
APP_KEY=base64:... (сгенерируйте через php artisan key:generate)
APP_DEBUG=false
APP_URL=https://your-app.railway.app

DB_CONNECTION=sqlite
# Или для MySQL:
# DB_CONNECTION=mysql
# DB_HOST=your-db-host
# DB_PORT=3306
# DB_DATABASE=your-db
# DB_USERNAME=your-user
# DB_PASSWORD=your-password

FRONTEND_URL=https://proptftl123123123dd.vercel.app
CORS_ALLOWED_ORIGINS=https://proptftl123123123dd.vercel.app
SANCTUM_STATEFUL_DOMAINS=proptftl123123123dd.vercel.app
SESSION_SAME_SITE=none
SESSION_SECURE_COOKIE=true
SESSION_DOMAIN=

NOVA_LICENSE_KEY=your-nova-license-key
```

### Шаг 4: Настройка базы данных

В Railway:
1. Нажмите **"New"** → **"Database"** → **"Add MySQL"** (или PostgreSQL)
2. Railway автоматически создаст переменные `DATABASE_URL`
3. Или используйте SQLite (проще для начала)

### Шаг 5: Запуск миграций

В Railway → Deployments → найдите ваш деплой → View Logs

Или добавьте в `backend/composer.json` в секцию `scripts`:

```json
"deploy": [
    "php artisan migrate --force",
    "php artisan config:cache",
    "php artisan route:cache"
]
```

### Шаг 6: Получите URL бэкенда

После деплоя Railway даст вам URL типа:
```
https://your-app.railway.app
```

Это и есть URL вашего бэкенда!

### Шаг 7: Обновите переменные на Vercel

В Vercel → Settings → Environment Variables:
```
NUXT_PUBLIC_API_BASE=https://your-app.railway.app
```

И пересоберите проект (Redeploy).

---

## Вариант 2: Fly.io

### Установка CLI

```bash
curl -L https://fly.io/install.sh | sh
fly auth login
```

### Деплой

```bash
cd backend
fly launch
```

Следуйте инструкциям. Fly.io автоматически создаст `fly.toml`.

### Настройка переменных

```bash
fly secrets set APP_KEY=your-key
fly secrets set FRONTEND_URL=https://proptftl123123123dd.vercel.app
# и т.д.
```

---

## Вариант 3: Render

1. Зарегистрируйтесь на [Render.com](https://render.com)
2. **New** → **Web Service**
3. Подключите GitHub репозиторий
4. Настройки:
   - **Root Directory:** `backend`
   - **Build Command:** `composer install --optimize-autoloader --no-dev && php artisan config:cache`
   - **Start Command:** `php artisan serve --host=0.0.0.0 --port=$PORT`
5. Добавьте переменные окружения
6. Получите URL типа: `https://your-app.onrender.com`

---

## После деплоя бэкенда

### 1. Проверьте, что бэкенд работает

Откройте в браузере:
```
https://your-backend-url.com/api/auth/user
```

Должна быть ошибка 401 (Unauthorized) - это нормально, значит API работает.

### 2. Зайдите в админку Nova

```
https://your-backend-url.com/nova
```

### 3. Создайте пользователя для Nova

Если у вас есть доступ к серверу через SSH или CLI:

```bash
php artisan nova:user
```

Или через Railway/Fly.io CLI:
```bash
railway run php artisan nova:user
# или
fly ssh console -C "php artisan nova:user"
```

### 4. Обновите переменные на Vercel

В Vercel добавьте:
```
NUXT_PUBLIC_API_BASE=https://your-backend-url.com
```

И сделайте редеплой.

---

## Проверка работы

1. ✅ Бэкенд отвечает: `https://your-backend-url.com/api/auth/user`
2. ✅ Nova доступна: `https://your-backend-url.com/nova`
3. ✅ Фронтенд подключается к бэкенду (проверьте в Network tab)
4. ✅ Регистрация и логин работают

---

## Частые проблемы

### Бэкенд не запускается
- Проверьте логи в Railway/Fly.io/Render
- Убедитесь, что `APP_KEY` установлен
- Проверьте, что база данных настроена

### Ошибка 500 на бэкенде
- Проверьте логи: `storage/logs/laravel.log`
- Убедитесь, что миграции запущены
- Проверьте права на папку `storage`

### CORS ошибки
- Убедитесь, что `FRONTEND_URL` и `CORS_ALLOWED_ORIGINS` содержат правильный URL фронтенда
- Проверьте, что `SESSION_SAME_SITE=none` и `SESSION_SECURE_COOKIE=true`

---

## Рекомендация

**Используйте Railway** - это самый простой способ для Laravel:
- Автоматически определяет Laravel
- Легко настроить базу данных
- Бесплатный план для начала
- Простой интерфейс

