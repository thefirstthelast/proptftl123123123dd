# Быстрая инструкция по деплою

## Шаг 1: Деплой бэкенда на Railway

1. Зайдите на [railway.app](https://railway.app) и войдите
2. Нажмите **"New Project"** → **"Deploy from GitHub repo"**
3. Выберите ваш репозиторий
4. **ВАЖНО:** В настройках проекта:
   - **Root Directory:** `backend`
   - Railway автоматически определит Laravel
5. Добавьте переменные окружения (Settings → Variables):

```env
APP_NAME=Propozly
APP_ENV=production
APP_DEBUG=false

# Сгенерируйте ключ после первого деплоя:
# railway run php artisan key:generate

# База данных (Railway создаст автоматически, если добавите MySQL/PostgreSQL)
DB_CONNECTION=sqlite
# Или после добавления БД:
# DB_CONNECTION=mysql

# Настройки для фронтенда
FRONTEND_URL=https://proptftl123123123dd.vercel.app
CORS_ALLOWED_ORIGINS=https://proptftl123123123dd.vercel.app
SANCTUM_STATEFUL_DOMAINS=proptftl123123123dd.vercel.app
SESSION_SAME_SITE=none
SESSION_SECURE_COOKIE=true
SESSION_DOMAIN=

# Nova (если есть лицензия)
NOVA_LICENSE_KEY=your-license-key
```

6. Добавьте базу данных:
   - **New** → **Database** → **Add MySQL** (или PostgreSQL)
   - Railway автоматически создаст `DATABASE_URL`
   - Обновите `DB_CONNECTION=mysql` в переменных

7. Запустите миграции:
   ```bash
   railway run php artisan migrate --force
   ```

8. Получите URL бэкенда:
   - Settings → Networking → Domain
   - Или в Deployments → последний деплой
   - URL типа: `https://your-app.railway.app`

---

## Шаг 2: Деплой фронтенда на Vercel

1. Зайдите на [vercel.com](https://vercel.com) и войдите
2. Нажмите **"Add New Project"**
3. Импортируйте ваш GitHub репозиторий
4. Настройки проекта:
   - **Framework Preset:** Nuxt.js (определится автоматически)
   - **Root Directory:** `/` (корень проекта)
   - **Build Command:** `npm run build` (уже указано)
   - **Output Directory:** `.output/public` (уже указано)
5. **Environment Variables:**
   ```
   NUXT_PUBLIC_API_BASE=https://your-railway-url.railway.app
   ```
   Замените на реальный URL из Railway!
6. Нажмите **"Deploy"**

---

## Шаг 3: Настройка бэкенда после получения URL Vercel

После деплоя на Vercel вы получите URL фронтенда. Обновите переменные на Railway:

1. Зайдите в Railway → ваш сервис → Variables
2. Обновите:
   ```env
   FRONTEND_URL=https://your-vercel-url.vercel.app
   CORS_ALLOWED_ORIGINS=https://your-vercel-url.vercel.app
   SANCTUM_STATEFUL_DOMAINS=your-vercel-url.vercel.app
   ```
3. Railway автоматически пересоберет проект

---

## Шаг 4: Создание пользователя для Nova

```bash
# Установите Railway CLI
npm i -g @railway/cli

# Войдите и подключитесь
railway login
railway link

# Создайте пользователя
railway run php artisan nova:user
```

---

## Шаг 5: Проверка

1. ✅ Фронтенд: `https://your-vercel-url.vercel.app`
2. ✅ Бэкенд API: `https://your-railway-url.railway.app/api/auth/user`
3. ✅ Админка Nova: `https://your-railway-url.railway.app/nova`
4. ✅ Регистрация и логин работают

---

## Быстрые команды

### Railway CLI
```bash
# Установка
npm i -g @railway/cli

# Вход
railway login

# Подключение к проекту
railway link

# Просмотр логов
railway logs

# Запуск команды
railway run php artisan migrate
railway run php artisan nova:user
railway run php artisan key:generate
```

### Vercel CLI
```bash
# Установка
npm i -g vercel

# Вход
vercel login

# Деплой
vercel --prod

# Просмотр логов
vercel logs
```

---

## Если что-то не работает

### Бэкенд не запускается
- Проверьте логи: Railway → Deployments → View Logs
- Убедитесь, что `APP_KEY` установлен: `railway run php artisan key:generate`
- Проверьте переменные окружения

### Фронтенд не подключается к бэкенду
- Проверьте `NUXT_PUBLIC_API_BASE` в Vercel
- Убедитесь, что URL бэкенда правильный
- Проверьте CORS настройки на бэкенде

### Ошибка 419 при регистрации/логине
- Проверьте `FRONTEND_URL` и `SANCTUM_STATEFUL_DOMAINS` на Railway
- Убедитесь, что `SESSION_SAME_SITE=none` и `SESSION_SECURE_COOKIE=true`
- Проверьте, что домен Vercel добавлен в `CORS_ALLOWED_ORIGINS`

