# Настройка аутентификации Nova для Railway

## Проблема

При деплое на Railway получаете ошибку:
```
Missing or incorrect username / password combination
Failed to download laravel/nova
```

Это происходит потому, что Laravel Nova требует аутентификацию для скачивания пакета.

## Решение

### Вариант 1: Использовать Build Arguments (рекомендуется)

1. **В Railway Dashboard:**
   - Откройте ваш сервис
   - Settings → Variables
   - Добавьте переменные:
     - `NOVA_USERNAME` - ваш email для Nova
     - `NOVA_PASSWORD` - ваш пароль для Nova

2. **Railway автоматически передаст их как build args** при сборке Dockerfile

3. **Dockerfile уже настроен** для использования этих переменных

### Вариант 2: Создать auth.json локально

Если у вас уже есть `auth.json` в папке `backend/`:

1. Убедитесь, что файл существует:
   ```json
   {
       "http-basic": {
           "nova.laravel.com": {
               "username": "your-email@example.com",
               "password": "your-password"
           }
       }
   }
   ```

2. Dockerfile автоматически скопирует его при `COPY . .`

3. **ВАЖНО:** Не коммитьте `auth.json` в git! Добавьте в `.gitignore`:
   ```
   auth.json
   ```

### Вариант 3: Использовать переменные окружения в Railway

Railway может автоматически передавать переменные окружения как build args, если они названы правильно.

## Настройка в Railway

### Шаг 1: Получите credentials Nova

1. Зайдите на [nova.laravel.com](https://nova.laravel.com)
2. Войдите в аккаунт
3. Скопируйте email и пароль

### Шаг 2: Добавьте в Railway

1. Railway Dashboard → ваш сервис
2. **Settings** → **Variables**
3. Добавьте:
   ```
   NOVA_USERNAME=your-email@example.com
   NOVA_PASSWORD=your-password
   ```

### Шаг 3: Пересоберите

Railway автоматически пересоберет проект с новыми переменными.

## Альтернативное решение: Использовать уже установленный Nova

Если Nova уже установлена локально, можно скопировать папку `vendor/laravel/nova`:

1. **НЕ рекомендуется**, но можно:
   - Скопировать `backend/vendor/laravel/nova` в репозиторий
   - Добавить в `.gitignore` все остальное из `vendor/`
   - Но это нарушает best practices

2. **Лучше использовать правильную аутентификацию**

## Проверка

После настройки credentials:

1. ✅ Railway должен успешно скачать Nova
2. ✅ Деплой должен пройти без ошибок
3. ✅ Проверьте логи: Railway → Deployments → View Logs

## Безопасность

⚠️ **ВАЖНО:**
- Никогда не коммитьте `auth.json` в git
- Используйте переменные окружения Railway для credentials
- Railway автоматически скрывает значения переменных в логах

## Если проблема осталась

1. **Проверьте credentials:**
   - Убедитесь, что email и пароль правильные
   - Попробуйте войти на nova.laravel.com с этими credentials

2. **Проверьте переменные в Railway:**
   - Settings → Variables
   - Убедитесь, что `NOVA_USERNAME` и `NOVA_PASSWORD` установлены

3. **Проверьте логи:**
   - Railway → Deployments → View Logs
   - Ищите ошибки аутентификации

4. **Попробуйте создать auth.json вручную:**
   ```bash
   cd backend
   composer config --auth http-basic.nova.laravel.com your-email@example.com your-password
   ```
   Это создаст `auth.json` локально, но не коммитьте его!

