# Настройка проекта на Railway

## Текущая ситуация

Вы задеплоили всю папку на Railway. Railway, скорее всего, определил Laravel (из-за `backend/composer.json`) и деплоит только **бэкенд**.

## Как найти URL бэкенда на Railway

1. Зайдите в [Railway Dashboard](https://railway.app/dashboard)
2. Выберите ваш проект
3. Найдите сервис (Service) - там должен быть Laravel бэкенд
4. Нажмите на сервис → вкладка **"Settings"**
5. Найдите секцию **"Networking"** или **"Domains"**
6. Там будет URL типа: `https://your-app.railway.app`

Или:
- Нажмите на сервис → вкладка **"Deployments"**
- Найдите последний успешный деплой
- Там будет показан URL

## Админка Nova

Админка будет доступна по адресу:
```
https://your-railway-url.railway.app/nova
```

Замените `your-railway-url.railway.app` на реальный URL из Railway Dashboard.

## Создание пользователя для Nova

### Вариант 1: Через Railway CLI

```bash
# Установите Railway CLI (если еще не установлен)
npm i -g @railway/cli

# Войдите
railway login

# Подключитесь к проекту
railway link

# Запустите команду создания пользователя
railway run php artisan nova:user
```

### Вариант 2: Через Railway Dashboard

1. Зайдите в ваш сервис на Railway
2. Откройте вкладку **"Deployments"**
3. Найдите последний деплой
4. Нажмите на три точки (⋮) → **"View Logs"**
5. Или используйте **"Shell"** (если доступно)

### Вариант 3: Через переменные окружения

Если у вас уже есть пользователь в базе данных, просто войдите с его данными.

## Настройка переменных окружения на Railway

В Railway → ваш сервис → **"Variables"** добавьте:

```env
APP_NAME=Propozly
APP_ENV=production
APP_KEY=base64:... (если еще не установлен, сгенерируйте через railway run php artisan key:generate)
APP_DEBUG=false
APP_URL=https://your-railway-url.railway.app

# База данных (Railway автоматически создаст DATABASE_URL, если добавите MySQL/PostgreSQL)
# Или используйте SQLite:
DB_CONNECTION=sqlite

# Настройки для фронтенда на Vercel
FRONTEND_URL=https://proptftl123123123dd.vercel.app
CORS_ALLOWED_ORIGINS=https://proptftl123123123dd.vercel.app
SANCTUM_STATEFUL_DOMAINS=proptftl123123123dd.vercel.app
SESSION_SAME_SITE=none
SESSION_SECURE_COOKIE=true
SESSION_DOMAIN=

# Nova
NOVA_LICENSE_KEY=your-nova-license-key
```

## Настройка базы данных на Railway

1. В Railway Dashboard → ваш проект
2. Нажмите **"New"** → **"Database"** → **"Add MySQL"** (или PostgreSQL)
3. Railway автоматически создаст переменную `DATABASE_URL`
4. Обновите `.env` или переменные окружения:
   ```env
   DB_CONNECTION=mysql
   # Railway автоматически подставит остальные параметры из DATABASE_URL
   ```

Или используйте SQLite (проще для начала):
```env
DB_CONNECTION=sqlite
```

## Запуск миграций

После настройки базы данных запустите миграции:

```bash
railway run php artisan migrate --force
```

Или добавьте в `railway.json` или настройте build command в Railway.

## Фронтенд на Vercel

Поскольку Railway деплоит только бэкенд, фронтенд нужно задеплоить на Vercel:

1. Зайдите на [Vercel](https://vercel.com)
2. Подключите тот же GitHub репозиторий
3. Настройки:
   - **Root Directory:** `/` (корень проекта)
   - **Build Command:** `npm run build`
   - **Output Directory:** `.output/public`
4. **Environment Variables:**
   ```
   NUXT_PUBLIC_API_BASE=https://your-railway-url.railway.app
   ```
   (замените на реальный URL из Railway)

## Альтернатива: Два сервиса на Railway

Если хотите деплоить и фронтенд, и бэкенд на Railway:

### Сервис 1: Бэкенд (Laravel)
- Root Directory: `backend`
- Build Command: `composer install --optimize-autoloader --no-dev && php artisan config:cache`
- Start Command: `php artisan serve --host=0.0.0.0 --port=$PORT`

### Сервис 2: Фронтенд (Nuxt)
- Root Directory: `/` (корень)
- Build Command: `npm install && npm run build`
- Start Command: `node .output/server/index.mjs`

Но проще использовать Vercel для фронтенда.

## Проверка работы

1. ✅ Бэкенд работает: `https://your-railway-url.railway.app/api/auth/user`
2. ✅ Nova доступна: `https://your-railway-url.railway.app/nova`
3. ✅ Фронтенд на Vercel подключается к бэкенду
4. ✅ Регистрация и логин работают

## Частые проблемы

### Ошибка 404 на /nova
- Убедитесь, что Nova установлена: `railway run composer show laravel/nova`
- Проверьте, что провайдеры зарегистрированы

### Ошибка "This domain is not authorized"
- Проверьте `NOVA_LICENSE_KEY` в переменных окружения
- Убедитесь, что лицензия привязана к правильному домену

### База данных не работает
- Проверьте, что база данных создана в Railway
- Убедитесь, что `DATABASE_URL` установлен (или используйте SQLite)
- Запустите миграции: `railway run php artisan migrate --force`

### CORS ошибки
- Убедитесь, что `FRONTEND_URL` и `CORS_ALLOWED_ORIGINS` содержат правильный URL Vercel
- Проверьте `SESSION_SAME_SITE=none` и `SESSION_SECURE_COOKIE=true`

