# Исправление ошибки 404 на /nova на Railway

## Проблема
При переходе на `https://proptftl123123123dd-production.up.railway.app/nova` получаете 404 ошибку.

## Возможные причины и решения

### 1. Проверьте, что бэкенд правильно задеплоен

**Проблема:** Если вы задеплоили всю папку (и фронтенд, и бэкенд) в один сервис, Railway может не знать, что запускать.

**Решение:**

1. В Railway Dashboard проверьте настройки сервиса:
   - **Root Directory** должен быть: `backend`
   - **Start Command** должен быть: `php artisan serve --host=0.0.0.0 --port=$PORT`

2. Или создайте отдельный сервис для бэкенда:
   - **New Service** → **GitHub Repo**
   - **Root Directory:** `backend`
   - Railway автоматически определит Laravel

### 2. Проверьте, что Nova установлена

Выполните через Railway CLI:

```bash
railway run composer show laravel/nova
```

Если Nova не установлена, установите:

```bash
railway run composer require laravel/nova
```

### 3. Проверьте логи Railway

В Railway Dashboard:
1. Выберите ваш сервис
2. **Deployments** → последний деплой → **View Logs**

Ищите ошибки типа:
- "Class not found"
- "Route not found"
- "Nova not found"

### 4. Проверьте переменные окружения

В Railway → Settings → Variables убедитесь, что есть:

```env
APP_KEY=base64:... (обязательно!)
APP_URL=https://proptftl123123123dd-production.up.railway.app
NOVA_LICENSE_KEY=your-license-key (если требуется)
```

### 5. Очистите кеш конфигурации

Выполните через Railway CLI:

```bash
railway run php artisan config:clear
railway run php artisan route:clear
railway run php artisan cache:clear
railway run php artisan config:cache
railway run php artisan route:cache
```

### 6. Проверьте, что маршруты Nova зарегистрированы

Выполните:

```bash
railway run php artisan route:list | grep nova
```

Должны увидеть маршруты типа:
- `GET /nova`
- `POST /nova/login`
- и т.д.

Если маршрутов нет, проверьте `backend/bootstrap/providers.php`:

```php
return [
    App\Providers\AppServiceProvider::class,
    App\Providers\NovaServiceProvider::class, // должен быть здесь
];
```

### 7. Проверьте конфигурацию веб-сервера на Railway

Railway использует встроенный PHP сервер. Убедитесь, что:

1. **Start Command** правильный:
   ```
   php artisan serve --host=0.0.0.0 --port=$PORT
   ```

2. Или используйте `public/index.php` напрямую (если настроен веб-сервер)

### 8. Проверьте файл public/index.php

Убедитесь, что файл `backend/public/index.php` существует и правильно настроен.

### 9. Проверьте права доступа

Убедитесь, что папки имеют правильные права:

```bash
railway run chmod -R 775 storage bootstrap/cache
```

### 10. Проверьте лицензию Nova (если требуется)

Если Nova требует лицензию для продакшена:

1. В Railway → Settings → Variables добавьте:
   ```
   NOVA_LICENSE_KEY=your-license-key
   ```

2. Или для разработки можно временно использовать:
   ```env
   APP_ENV=local
   ```
   (НЕ рекомендуется для продакшена!)

---

## Быстрая диагностика

Выполните эти команды через Railway CLI:

```bash
# 1. Проверьте, что Nova установлена
railway run composer show laravel/nova

# 2. Проверьте маршруты
railway run php artisan route:list | grep nova

# 3. Проверьте конфигурацию
railway run php artisan config:show nova

# 4. Очистите кеш
railway run php artisan optimize:clear

# 5. Пересоберите кеш
railway run php artisan config:cache
railway run php artisan route:cache
```

---

## Альтернативное решение: проверьте структуру деплоя

Если вы задеплоили всю папку (и фронтенд, и бэкенд) в один сервис:

### Вариант A: Создайте отдельный сервис для бэкенда

1. В Railway Dashboard → ваш проект
2. **New Service** → **GitHub Repo**
3. Выберите тот же репозиторий
4. **Root Directory:** `backend`
5. Railway автоматически определит Laravel
6. Получите новый URL для бэкенда

### Вариант B: Настройте правильный Start Command

Если хотите оставить всё в одном сервисе:

1. Railway → Settings → **Deploy**
2. **Root Directory:** `backend`
3. **Start Command:** `php artisan serve --host=0.0.0.0 --port=$PORT`

---

## Проверка после исправления

1. ✅ Проверьте API: `https://proptftl123123123dd-production.up.railway.app/api/auth/user`
   - Должна быть ошибка 401 (Unauthorized) - это нормально

2. ✅ Проверьте Nova: `https://proptftl123123123dd-production.up.railway.app/nova`
   - Должна открыться страница входа

3. ✅ Проверьте логи: Railway → Deployments → View Logs
   - Не должно быть ошибок

---

## Если ничего не помогает

1. **Проверьте, что это действительно бэкенд:**
   - Откройте: `https://proptftl123123123dd-production.up.railway.app/api/auth/user`
   - Если получаете 404 или другую ошибку (не 401), значит это не бэкенд

2. **Создайте новый сервис специально для бэкенда:**
   - Root Directory: `backend`
   - Это гарантирует, что Railway правильно определит Laravel

3. **Проверьте, что файлы загружены:**
   - Убедитесь, что папка `backend` существует в репозитории
   - Проверьте, что `backend/composer.json` содержит `laravel/nova`

---

## Полезные команды для отладки

```bash
# Войти в Railway
railway login

# Подключиться к проекту
railway link

# Посмотреть логи
railway logs

# Выполнить команду
railway run php artisan route:list
railway run composer show laravel/nova
railway run php artisan config:show nova

# Очистить кеш
railway run php artisan optimize:clear

# Пересобрать кеш
railway run php artisan config:cache
railway run php artisan route:cache
```

