# Настройка для деплоя на Vercel

## Проблема
После деплоя на Vercel не работает регистрация и логин из-за проблем с CORS и cookies при cross-origin запросах.

## Решение

### 1. Настройка переменных окружения на Vercel

В настройках проекта Vercel (Settings → Environment Variables) добавьте:

```env
NUXT_PUBLIC_API_BASE=https://your-backend-domain.com
```

**Важно:** 
- Замените `https://your-backend-domain.com` на реальный URL вашего бэкенда
- Не добавляйте слэш в конце URL
- Пример: `https://api.propozly.com` или `https://your-app.railway.app`

### 2. Настройка переменных окружения на бэкенде

В `.env` файле бэкенда (или в настройках вашего хостинга бэкенда) добавьте/обновите:

```env
# URL фронтенда на Vercel (замените на ваш реальный домен)
FRONTEND_URL=https://your-app.vercel.app

# CORS - разрешенные домены (через запятую, если несколько)
CORS_ALLOWED_ORIGINS=https://your-app.vercel.app,https://yourdomain.com

# Sanctum stateful domains (через запятую)
SANCTUM_STATEFUL_DOMAINS=your-app.vercel.app,yourdomain.com

# Настройки сессий для cross-origin
SESSION_SAME_SITE=none
SESSION_SECURE_COOKIE=true
SESSION_DOMAIN=

# URL бэкенда
APP_URL=https://your-backend-domain.com
```

**Важно:**
- `SESSION_SAME_SITE=none` **обязательно** требует `SESSION_SECURE_COOKIE=true`
- `SESSION_DOMAIN` оставьте пустым (или установите в домен бэкенда, если фронтенд и бэкенд на поддоменах одного домена)
- Если у вас кастомный домен на Vercel, добавьте его в `CORS_ALLOWED_ORIGINS` и `SANCTUM_STATEFUL_DOMAINS`

### 3. Примеры конфигурации

#### Вариант A: Фронтенд на Vercel, бэкенд на Railway

**Vercel Environment Variables:**
```
NUXT_PUBLIC_API_BASE=https://propozly-api.railway.app
```

**Backend .env:**
```env
FRONTEND_URL=https://propozly.vercel.app
CORS_ALLOWED_ORIGINS=https://propozly.vercel.app
SANCTUM_STATEFUL_DOMAINS=propozly.vercel.app
SESSION_SAME_SITE=none
SESSION_SECURE_COOKIE=true
APP_URL=https://propozly-api.railway.app
```

#### Вариант B: Оба на кастомных доменах

**Vercel Environment Variables:**
```
NUXT_PUBLIC_API_BASE=https://api.propozly.com
```

**Backend .env:**
```env
FRONTEND_URL=https://propozly.com
CORS_ALLOWED_ORIGINS=https://propozly.com,https://www.propozly.com
SANCTUM_STATEFUL_DOMAINS=propozly.com,www.propozly.com
SESSION_SAME_SITE=none
SESSION_SECURE_COOKIE=true
APP_URL=https://api.propozly.com
```

### 4. После изменения переменных окружения

**На Vercel:**
1. Перейдите в Settings → Environment Variables
2. Добавьте/обновите переменные
3. Пересоберите проект (Redeploy)

**На бэкенде:**
1. Обновите `.env` файл
2. Очистите кеш конфигурации:
   ```bash
   php artisan config:clear
   php artisan config:cache
   ```
3. Перезапустите приложение (если нужно)

### 5. Проверка работы

1. Откройте DevTools → Network
2. Попробуйте зарегистрироваться или войти
3. Проверьте:
   - Запросы идут на правильный URL бэкенда
   - В ответах есть заголовки `Set-Cookie`
   - Cookies устанавливаются (Application → Cookies)
   - Нет ошибок CORS в консоли

### 6. Отладка проблем

#### Ошибка 419 (CSRF Token Mismatch)
- Убедитесь, что `SANCTUM_STATEFUL_DOMAINS` содержит домен фронтенда
- Проверьте, что запрос к `/sanctum/csrf-cookie` выполняется перед логином/регистрацией
- Убедитесь, что cookies не блокируются браузером

#### CORS ошибки
- Проверьте, что домен фронтенда в `CORS_ALLOWED_ORIGINS`
- Убедитесь, что `supports_credentials: true` в CORS конфиге (уже настроено)
- Проверьте, что запросы идут с `credentials: 'include'` (уже настроено в `useAuth.ts`)

#### Cookies не устанавливаются
- Проверьте `SESSION_SAME_SITE=none` и `SESSION_SECURE_COOKIE=true`
- Убедитесь, что бэкенд работает по HTTPS
- Проверьте, что домен фронтенда в `SANCTUM_STATEFUL_DOMAINS`
- В DevTools проверьте, что cookies не блокируются (может быть из-за настроек браузера)

### 7. Дополнительные настройки для продакшена

Если используете кастомный домен на Vercel, также добавьте его в настройки бэкенда:

```env
CORS_ALLOWED_ORIGINS=https://your-app.vercel.app,https://yourdomain.com
SANCTUM_STATEFUL_DOMAINS=your-app.vercel.app,yourdomain.com
```

Это позволит работать и на временном домене Vercel, и на кастомном домене.

