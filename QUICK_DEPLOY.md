# Быстрый деплой (15 минут)

## Самый простой способ: Railway + Vercel

### 1. Backend на Railway (5 минут)

1. Зайдите на https://railway.app
2. Войдите через GitHub
3. Нажмите "New Project" → "Deploy from GitHub repo"
4. Выберите ваш репозиторий
5. В настройках проекта:
   - **Root Directory**: `backend`
   - **Build Command**: `composer install --optimize-autoloader --no-dev`
   - **Start Command**: `php artisan serve --host=0.0.0.0 --port=$PORT`
6. Добавьте переменные окружения:
   ```
   APP_ENV=production
   APP_DEBUG=false
   APP_KEY=base64:... (сгенерируйте через php artisan key:generate)
   DB_CONNECTION=sqlite (или настройте PostgreSQL через Railway)
   FRONTEND_URL=https://your-frontend.vercel.app
   SANCTUM_STATEFUL_DOMAINS=your-frontend.vercel.app
   ```
7. Запустите миграции: в Railway → Deployments → View Logs → Run Command → `php artisan migrate --force`
8. Скопируйте URL вашего бэкенда (например: `https://your-app.railway.app`)

### 2. Frontend на Vercel (5 минут)

1. Зайдите на https://vercel.com
2. Войдите через GitHub
3. Нажмите "Add New Project"
4. Импортируйте ваш репозиторий
5. Настройки:
   - **Framework Preset**: Nuxt.js
   - **Root Directory**: `/` (корень)
   - **Build Command**: `npm run build`
   - **Output Directory**: `.output/public`
6. Добавьте переменную окружения:
   ```
   NUXT_PUBLIC_API_BASE=https://your-app.railway.app
   ```
7. Нажмите "Deploy"

### 3. Обновите CORS и Sanctum настройки

В Railway, обновите переменные:
```
FRONTEND_URL=https://your-frontend.vercel.app
SANCTUM_STATEFUL_DOMAINS=your-frontend.vercel.app
```

Перезапустите деплой в Railway.

### 4. Готово! 

- Frontend: `https://your-frontend.vercel.app`
- Backend API: `https://your-app.railway.app`
- Nova: `https://your-app.railway.app/nova`

---

## Альтернатива: Render.com (всё в одном месте)

### Backend на Render

1. Зайдите на https://render.com
2. New → Web Service
3. Подключите GitHub репозиторий
4. Настройки:
   - **Name**: `propozly-backend`
   - **Root Directory**: `backend`
   - **Environment**: `PHP`
   - **Build Command**: `composer install --optimize-autoloader --no-dev`
   - **Start Command**: `php artisan serve --host=0.0.0.0 --port=$PORT`
5. Добавьте переменные окружения (как в Railway)
6. Создайте PostgreSQL базу через Render Dashboard
7. Обновите `DB_*` переменные

### Frontend на Render

1. New → Static Site
2. Подключите тот же репозиторий
3. Настройки:
   - **Root Directory**: `/`
   - **Build Command**: `npm run build`
   - **Publish Directory**: `.output/public`
4. Добавьте `NUXT_PUBLIC_API_BASE` с URL вашего бэкенда

---

## Проверка после деплоя

1. Откройте фронтенд URL
2. Попробуйте зарегистрироваться
3. Проверьте логин/выход
4. Откройте Nova: `https://your-backend-url.com/nova`

## Проблемы?

- **CORS ошибки**: Проверьте `FRONTEND_URL` и `SANCTUM_STATEFUL_DOMAINS` в бэкенде
- **419 ошибка**: Убедитесь, что фронтенд и бэкенд на одном домене или правильно настроен CORS
- **База данных**: Для продакшена лучше использовать PostgreSQL (Render предоставляет бесплатно)

