# Исправление ошибки отсутствия PHP расширения zip на Railway

## Проблема

При деплое бэкенда на Railway получаете ошибку:
```
openspout/openspout v4.28.5 requires ext-zip * -> it is missing from your system.
```

## Решение

Я создал `Dockerfile` в папке `backend/`, который установит все необходимые PHP расширения, включая `zip`.

### Что было сделано:

1. ✅ Создан `backend/Dockerfile` - устанавливает PHP 8.2 с расширением zip
2. ✅ Создан `backend/.dockerignore` - исключает ненужные файлы из образа

### Что нужно сделать:

1. **Закоммитьте файлы:**
   ```bash
   git add backend/Dockerfile backend/.dockerignore
   git commit -m "Add Dockerfile with zip extension for Railway"
   git push
   ```

2. **На Railway:**
   - Railway автоматически обнаружит Dockerfile
   - При следующем деплое расширение zip будет установлено
   - Деплой должен пройти успешно

### Альтернативное решение (если Dockerfile не работает)

Если Railway не использует Dockerfile, можно добавить в `composer.json`:

```json
{
  "config": {
    "platform": {
      "php": "8.2"
    },
    "platform-check": false
  }
}
```

И использовать флаг при установке:
```bash
composer install --ignore-platform-req=ext-zip
```

Но это **не рекомендуется**, так как пакеты могут не работать без zip.

### Проверка после деплоя

После успешного деплоя проверьте:

1. ✅ Деплой прошел без ошибок
2. ✅ API работает: `https://your-app.railway.app/api/auth/user`
3. ✅ Nova доступна: `https://your-app.railway.app/nova`

### Если проблема осталась

1. **Проверьте логи Railway:**
   - Railway Dashboard → Deployments → View Logs
   - Ищите ошибки установки расширений

2. **Проверьте, что Dockerfile используется:**
   - Railway → Settings → Deploy
   - Убедитесь, что Railway использует Dockerfile (должно быть автоматически)

3. **Попробуйте явно указать Dockerfile:**
   - В настройках Railway можно указать путь к Dockerfile
   - Или переименуйте в `Dockerfile.railway`

### Дополнительные расширения

Если в будущем понадобятся другие PHP расширения, добавьте их в Dockerfile:

```dockerfile
RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd zip \
    && docker-php-ext-enable zip
```

Добавьте нужное расширение в список, например:
- `gd` - для работы с изображениями
- `pdo_mysql` - для MySQL
- `mbstring` - для работы со строками
- и т.д.

