# Исправление проблемы с Docker на Railway

## Проблема

Railway может не передавать переменные окружения как build args автоматически при сборке Dockerfile. Это приводит к ошибке при установке Laravel Nova.

## Решение

### Шаг 1: Обновлен Dockerfile

Dockerfile теперь поддерживает оба варианта:
- Переменные как ARG (build arguments)
- Переменные как ENV (environment variables)

### Шаг 2: Настройка Railway для передачи Build Args

Railway может требовать явного указания build args. Есть несколько способов:

#### Вариант 1: Через Railway CLI (рекомендуется)

Если у вас установлен Railway CLI:

```bash
railway variables set NOVA_USERNAME=maksstepenko@gmail.com
railway variables set NOVA_PASSWORD=Hibmyk-jyjby0-duvvyq
```

#### Вариант 2: Через Railway Dashboard

1. **Откройте Railway Dashboard:**
   - Зайдите на [railway.app](https://railway.app)
   - Выберите ваш проект и сервис с бэкендом

2. **Добавьте переменные:**
   - Settings → Variables
   - Добавьте `NOVA_USERNAME` и `NOVA_PASSWORD`

3. **Проверьте настройки Build:**
   - Settings → Build
   - Убедитесь, что Railway использует Dockerfile
   - Проверьте, есть ли опция "Pass environment variables as build args"
   - Если есть - включите её

#### Вариант 3: Использовать railway.json или railway.toml

Создайте файл `railway.json` в корне проекта (или в папке `backend/`):

```json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "DOCKERFILE",
    "dockerfilePath": "backend/Dockerfile",
    "buildArgs": {
      "NOVA_USERNAME": "${NOVA_USERNAME}",
      "NOVA_PASSWORD": "${NOVA_PASSWORD}"
    }
  }
}
```

Или `railway.toml`:

```toml
[build]
builder = "DOCKERFILE"
dockerfilePath = "backend/Dockerfile"

[build.buildArgs]
NOVA_USERNAME = "${NOVA_USERNAME}"
NOVA_PASSWORD = "${NOVA_PASSWORD}"
```

### Шаг 3: Проверка Root Directory

Убедитесь, что в Railway настроен правильный Root Directory:

1. Railway Dashboard → ваш сервис
2. Settings → Deploy
3. **Root Directory:** должен быть `backend` (если Dockerfile в папке backend)

### Шаг 4: Пересборка

После настройки переменных:

1. Railway автоматически пересоберет проект
2. Или вручную: Deployments → три точки (⋮) → Redeploy

## Проверка

После деплоя проверьте логи:

1. Railway → Deployments → последний деплой → View Logs
2. Ищите строки:
   - `=== Setting up Nova authentication ===`
   - `✓ Found Nova credentials, setting up auth...`
   - `✓ Nova authentication configured successfully`

Если видите ошибку:
```
✗ ERROR: Nova credentials not found!
```

Это значит, что Railway не передает переменные. Попробуйте:

1. Проверить, что переменные добавлены в Railway
2. Использовать railway.json/railway.toml (см. Вариант 3)
3. Попробовать использовать Railway Secrets вместо обычных переменных

## Альтернативное решение: Использовать auth.json

Если Railway все еще не передает переменные, можно временно использовать auth.json:

1. **Создайте auth.json локально:**
   ```bash
   cd backend
   composer config --auth http-basic.nova.laravel.com maksstepenko@gmail.com Hibmyk-jyjby0-duvvyq
   ```

2. **Добавьте в .gitignore (если еще не добавлен):**
   ```
   auth.json
   ```

3. **НО:** Railway может не видеть auth.json, если он в .gitignore. В этом случае:
   - Временно закоммитьте auth.json (не рекомендуется для безопасности)
   - Или используйте другой подход

## Дополнительные настройки Railway

### Проверка настроек Deploy

1. Settings → Deploy
2. Убедитесь, что:
   - **Source:** GitHub/GitLab (или другой)
   - **Branch:** правильная ветка (обычно `main` или `master`)
   - **Root Directory:** `backend`
   - **Dockerfile Path:** `Dockerfile` (или `backend/Dockerfile` если Root Directory не установлен)

### Проверка переменных окружения

Убедитесь, что все необходимые переменные добавлены:

- `NOVA_USERNAME` - email для Nova
- `NOVA_PASSWORD` - пароль для Nova
- `NOVA_LICENSE_KEY` - ключ лицензии Nova
- `APP_KEY` - Laravel application key
- `APP_ENV` - environment (production)
- `DB_*` - переменные для базы данных (если используется)

## Если проблема осталась

1. **Проверьте логи Railway:**
   - Ищите конкретные ошибки
   - Проверьте, на каком этапе падает сборка

2. **Попробуйте собрать локально:**
   ```bash
   cd backend
   docker build --build-arg NOVA_USERNAME=maksstepenko@gmail.com --build-arg NOVA_PASSWORD=Hibmyk-jyjby0-duvvyq -t test-build .
   ```

3. **Свяжитесь с поддержкой Railway:**
   - Если проблема специфична для Railway
   - Или создайте issue в их документации

