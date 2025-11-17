# ✅ Креденшиалы Nova проверены и готовы к использованию!

## Проверка завершена успешно

Креденшиалы правильные и работают. Теперь нужно добавить их в Railway.

## Шаг 1: Добавьте переменные в Railway

1. Зайдите в [Railway Dashboard](https://railway.app/dashboard)
2. Выберите ваш проект
3. Найдите сервис с бэкендом (Laravel)
4. Перейдите в **Settings** → **Variables**
5. Добавьте следующие переменные (по одной):

### Переменная 1:
- **Name:** `NOVA_USERNAME`
- **Value:** `maksstepenko@gmail.com`

### Переменная 2:
- **Name:** `NOVA_PASSWORD`
- **Value:** `Hibmyk-jyjby0-duvvyq`

### Переменная 3:
- **Name:** `NOVA_LICENSE_KEY`
- **Value:** `1XWBgpHKrgUbrWEs4i2dtHPRO3stnWSl0xSNgZOiLAoIUMlKJi`

## Шаг 2: Проверьте другие переменные

Убедитесь, что также установлены:

```env
APP_NAME=Propozly
APP_ENV=production
APP_DEBUG=false

# База данных
DB_CONNECTION=sqlite
# Или если используете MySQL:
# DB_CONNECTION=mysql
# DATABASE_URL=... (Railway создаст автоматически)

# Настройки для фронтенда
FRONTEND_URL=https://proptftl123123123dd.vercel.app
CORS_ALLOWED_ORIGINS=https://proptftl123123123dd.vercel.app
SANCTUM_STATEFUL_DOMAINS=proptftl123123123dd.vercel.app
SESSION_SAME_SITE=none
SESSION_SECURE_COOKIE=true
SESSION_DOMAIN=
```

## Шаг 3: Пересоберите проект

После добавления переменных:

1. Railway автоматически начнет новый деплой
2. Или вручную: **Deployments** → **Redeploy**

## Шаг 4: Проверьте логи

После деплоя проверьте логи:
1. **Deployments** → последний деплой → **View Logs**
2. Ищите строку: `Created auth.json from environment variables`
3. Если видите эту строку - креденшиалы работают!

## Если что-то не работает

### Ошибка "Authentication required"
- Проверьте, что переменные добавлены правильно
- Убедитесь, что нет лишних пробелов
- Проверьте, что значения скопированы полностью

### Ошибка "Invalid license"
- Проверьте `NOVA_LICENSE_KEY`
- Убедитесь, что лицензия привязана к правильному домену

## Безопасность

⚠️ **ВАЖНО:**
- Файл `RAILWAY_NOVA_VARIABLES.txt` добавлен в `.gitignore`
- Не коммитьте креденшиалы в git
- После настройки можно удалить `RAILWAY_NOVA_VARIABLES.txt`

---

**Готово!** После добавления переменных деплой должен пройти успешно.

