# Чеклист для деплоя

## Перед деплоем

- [ ] Убедитесь, что все изменения закоммичены в Git
- [ ] Проверьте, что `npm run build` проходит без ошибок
- [ ] Проверьте, что `php artisan test` проходит
- [ ] Создайте `.env` файлы для продакшена

## Переменные окружения для Backend (.env)

```env
APP_NAME=Propozly
APP_ENV=production
APP_KEY=base64:... (сгенерируйте через php artisan key:generate)
APP_DEBUG=false
APP_URL=https://api.yourdomain.com

LOG_CHANNEL=stack
LOG_LEVEL=error

DB_CONNECTION=mysql  # или sqlite для начала
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=propozly
DB_USERNAME=your_user
DB_PASSWORD=your_password

BROADCAST_DRIVER=log
CACHE_DRIVER=file
FILESYSTEM_DISK=local
QUEUE_CONNECTION=sync
SESSION_DRIVER=database
SESSION_LIFETIME=120

FRONTEND_URL=https://yourdomain.com
SANCTUM_STATEFUL_DOMAINS=yourdomain.com
CORS_ALLOWED_ORIGINS=https://yourdomain.com

SESSION_DOMAIN=.yourdomain.com
SESSION_SECURE_COOKIE=true
SESSION_SAME_SITE=lax
```

## Переменные окружения для Frontend

```env
NUXT_PUBLIC_API_BASE=https://api.yourdomain.com
```

## После деплоя проверьте

- [ ] Frontend открывается: `https://yourdomain.com`
- [ ] API отвечает: `https://api.yourdomain.com/api/auth/user`
- [ ] Nova открывается: `https://api.yourdomain.com/nova`
- [ ] Регистрация работает
- [ ] Логин работает
- [ ] Logout работает
- [ ] Cookies устанавливаются (проверьте в DevTools)
- [ ] CORS не блокирует запросы

## Полезные команды для отладки

```bash
# Backend логи (Railway/Render)
# Смотрите в Dashboard → Logs

# Frontend логи (Vercel)
# Смотрите в Dashboard → Functions → Logs

# Локальная проверка продакшен билда
npm run build
npm run preview

# Проверка API
curl https://api.yourdomain.com/api/auth/user
```

## Частые проблемы

### 419 ошибка при логине/регистрации
- Проверьте, что `FRONTEND_URL` и `SANCTUM_STATEFUL_DOMAINS` совпадают с реальным доменом фронтенда
- Убедитесь, что фронтенд и бэкенд на одном домене или правильно настроен CORS
- Проверьте, что cookies не блокируются браузером

### CORS ошибки
- Проверьте `CORS_ALLOWED_ORIGINS` в бэкенде
- Убедитесь, что `supports_credentials: true` в CORS конфиге

### База данных не работает
- Проверьте подключение к БД
- Убедитесь, что миграции запущены: `php artisan migrate --force`
- Проверьте права доступа к БД

### Nova не открывается
- Убедитесь, что создан пользователь: `php artisan nova:user`
- Проверьте, что сессии работают (SESSION_DRIVER)

