# Деплой на Railway без Docker

## Преимущества использования Nixpacks (без Docker):

1. ✅ **Автоматическое определение** - Railway сам определит, что это PHP/Laravel приложение
2. ✅ **Меньше конфигурации** - не нужен Dockerfile
3. ✅ **Автоматическая установка зависимостей** - Railway сам установит Composer зависимости
4. ✅ **Проще настройка переменных** - переменные окружения доступны во время сборки

## Как переключиться на Nixpacks:

### Шаг 1: Удалить Dockerfile и railway.json

```bash
# Удалить Dockerfile (или переместить в другое место)
rm backend/Dockerfile

# Удалить railway.json (или переместить)
rm railway.json
```

### Шаг 2: Настроить Root Directory в Railway

1. Railway Dashboard → ваш сервис → Settings → Deploy
2. Установите **Root Directory** = `backend`
3. Убедитесь, что **Build Command** пустой (Railway определит автоматически)

### Шаг 3: Добавить переменные окружения

Railway автоматически передаст переменные окружения во время сборки:

1. Settings → Variables
2. Добавьте:
   - `NOVA_USERNAME=maksstepenko@gmail.com`
   - `NOVA_PASSWORD=Hibmyk-jyjby0-duvvyq`
   - `NOVA_LICENSE_KEY=00sX6AGG430KPNXvNOauAyenHBp87SQ4GiVj1ZFkBVTvCFtIt9`

### Шаг 4: Создать auth.json через build hook (опционально)

Если Railway не передает переменные во время `composer install`, можно создать `auth.json` через build hook:

1. Settings → Deploy → Build Command (оставить пустым)
2. Или добавить в `composer.json` scripts:

```json
{
  "scripts": {
    "post-install-cmd": [
      "@php -r \"if (getenv('NOVA_USERNAME') && getenv('NOVA_PASSWORD')) { file_put_contents('auth.json', json_encode(['http-basic' => ['nova.laravel.com' => ['username' => getenv('NOVA_USERNAME'), 'password' => getenv('NOVA_PASSWORD')]]], JSON_PRETTY_PRINT)); }\""
    ]
  }
}
```

Но лучше использовать переменные окружения напрямую через Composer.

## Альтернатива: Использовать Composer с переменными окружения

Railway передаст переменные окружения, и Composer может использовать их напрямую, если настроить через `composer config` в build hook.

## Проверка

После удаления Dockerfile:
1. Railway автоматически определит PHP приложение
2. Использует Nixpacks для сборки
3. Установит зависимости через Composer
4. Запустит приложение

## Если не работает

Если Nixpacks не работает с Nova, можно вернуться к Docker, но тогда нужно будет правильно настроить передачу переменных как build args.

