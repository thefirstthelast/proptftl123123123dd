# Текущий деплой - Информация

## Бэкенд (Railway)
**URL:** `https://proptftl123123123dd-production.up.railway.app`

**Админка Nova:** `https://proptftl123123123dd-production.up.railway.app/nova`

## Фронтенд (Vercel)
**URL:** `https://proptftl123123123dd.vercel.app`

---

## Что нужно сделать сейчас

### 1. Обновить переменные окружения на Railway

Зайдите в Railway Dashboard → ваш сервис → **Variables** и добавьте/обновите:

```env
APP_NAME=Propozly
APP_ENV=production
APP_DEBUG=false

# Если еще не установлен, сгенерируйте:
# railway run php artisan key:generate

DB_CONNECTION=sqlite
# Или mysql, если добавили базу данных

# ВАЖНО: Обновите с URL фронтенда Vercel
FRONTEND_URL=https://proptftl123123123dd.vercel.app
CORS_ALLOWED_ORIGINS=https://proptftl123123123dd.vercel.app
SANCTUM_STATEFUL_DOMAINS=proptftl123123123dd.vercel.app
SESSION_SAME_SITE=none
SESSION_SECURE_COOKIE=true
SESSION_DOMAIN=

# Nova (если есть лицензия)
NOVA_LICENSE_KEY=your-license-key
```

### 2. Обновить переменные окружения на Vercel

Зайдите в Vercel Dashboard → ваш проект → **Settings** → **Environment Variables** и добавьте:

```
NUXT_PUBLIC_API_BASE=https://proptftl123123123dd-production.up.railway.app
```

**ВАЖНО:** После добавления переменной сделайте **Redeploy** на Vercel!

### 3. Создать пользователя для Nova

```bash
# Установите Railway CLI (если еще не установлен)
npm i -g @railway/cli

# Войдите и подключитесь
railway login
railway link

# Создайте пользователя
railway run php artisan nova:user
```

### 4. Запустить миграции (если еще не запущены)

```bash
railway run php artisan migrate --force
```

---

## Проверка работы

1. ✅ **Бэкенд API:** `https://proptftl123123123dd-production.up.railway.app/api/auth/user`
   - Должна быть ошибка 401 (Unauthorized) - это нормально, значит API работает

2. ✅ **Админка Nova:** `https://proptftl123123123dd-production.up.railway.app/nova`
   - Войдите с созданным пользователем

3. ✅ **Фронтенд:** `https://proptftl123123123dd.vercel.app`
   - Проверьте, что регистрация и логин работают

---

## Быстрые команды Railway

```bash
# Просмотр логов
railway logs

# Запуск команды
railway run php artisan migrate
railway run php artisan nova:user
railway run php artisan key:generate

# Просмотр переменных
railway variables
```

---

## Если что-то не работает

### Ошибка 419 при регистрации/логине
- Проверьте, что `FRONTEND_URL` и `SANCTUM_STATEFUL_DOMAINS` содержат правильный URL Vercel
- Убедитесь, что `SESSION_SAME_SITE=none` и `SESSION_SECURE_COOKIE=true`
- Проверьте, что `NUXT_PUBLIC_API_BASE` установлен на Vercel

### CORS ошибки
- Проверьте `CORS_ALLOWED_ORIGINS` на Railway
- Убедитесь, что URL фронтенда правильный

### Админка не открывается
- Проверьте, что пользователь создан: `railway run php artisan nova:user`
- Проверьте логи: `railway logs`

