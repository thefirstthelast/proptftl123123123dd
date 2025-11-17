# Настройка аутентификации Nova для Railway

## Проблема

При деплое на Railway получаете ошибку:
```
Missing or incorrect username / password combination
Failed to download laravel/nova
```

Это происходит потому, что Laravel Nova требует аутентификацию для скачивания пакета.

## Решение

**Dockerfile настроен ТОЛЬКО на использование переменных окружения Railway.**

Данные для аутентификации Nova должны быть переданы через Railway Variables (`NOVA_USERNAME` и `NOVA_PASSWORD`).

## Настройка в Railway

### Шаг 1: Получите credentials Nova

1. Зайдите на [nova.laravel.com](https://nova.laravel.com)
2. Войдите в аккаунт
3. Скопируйте email и пароль

### Шаг 2: Добавьте переменные в Railway

1. Railway Dashboard → ваш сервис
2. **Settings** → **Variables**
3. Добавьте переменные:
   ```
   NOVA_USERNAME=your-email@example.com
   NOVA_PASSWORD=your-password
   ```

### Шаг 3: Пересоберите

Railway автоматически пересоберет проект с новыми переменными.

**Важно:** Railway автоматически передает переменные окружения как build args при сборке Dockerfile.

## Как это работает

1. Railway передает переменные `NOVA_USERNAME` и `NOVA_PASSWORD` как build args в Dockerfile
2. Dockerfile преобразует их в ENV переменные
3. Composer использует эти переменные для аутентификации при скачивании Nova

## Проверка

После настройки credentials:

1. ✅ Railway должен успешно скачать Nova
2. ✅ Деплой должен пройти без ошибок
3. ✅ Проверьте логи: Railway → Deployments → View Logs

В логах вы должны увидеть:
```
=== Setting up Nova authentication from environment variables ===
✓ Nova authentication configured successfully
```

## Безопасность

⚠️ **ВАЖНО:**
- Используйте ТОЛЬКО переменные окружения Railway для credentials
- Railway автоматически скрывает значения переменных в логах
- Никогда не коммитьте credentials в код

## Если проблема осталась

1. **Проверьте credentials:**
   - Убедитесь, что email и пароль правильные
   - Попробуйте войти на nova.laravel.com с этими credentials

2. **Проверьте переменные в Railway:**
   - Settings → Variables
   - Убедитесь, что `NOVA_USERNAME` и `NOVA_PASSWORD` установлены
   - Проверьте, что значения правильные (без лишних пробелов)

3. **Проверьте логи Railway:**
   - Railway → Deployments → View Logs
   - Ищите ошибки аутентификации
   - Проверьте, что переменные передаются (в логах будет видно, установлены ли они)

4. **Проверьте настройки деплоя:**
   - Settings → Deploy
   - Убедитесь, что Root Directory = `backend`
   - Убедитесь, что Railway использует Dockerfile

5. **Проверьте, что переменные передаются как build args:**
   - Railway должен автоматически передавать переменные окружения как build args
   - Если не работает, проверьте настройки Railway для "Pass environment variables as build args"
