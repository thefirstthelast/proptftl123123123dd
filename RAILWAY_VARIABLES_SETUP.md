# Настройка переменных окружения в Railway для Nova

## КРИТИЧЕСКИ ВАЖНО

Переменные `NOVA_USERNAME` и `NOVA_PASSWORD` **ОБЯЗАТЕЛЬНО** должны быть добавлены в Railway **ДО** начала сборки Docker образа.

## Пошаговая инструкция:

### Шаг 1: Откройте Railway Dashboard
1. Зайдите на [railway.app](https://railway.app)
2. Войдите в аккаунт
3. Выберите ваш проект
4. Выберите сервис с бэкендом (Laravel)

### Шаг 2: Добавьте переменные окружения
1. Нажмите на сервис
2. Перейдите в **Settings** → **Variables** (или просто **Variables** в верхней панели)
3. Нажмите **"+ New Variable"** или **"Add Variable"**

### Шаг 3: Добавьте первую переменную
- **Key (Имя):** `NOVA_USERNAME`
- **Value (Значение):** `maksstepenko@gmail.com`
- Нажмите **"Add"** или **"Save"**

### Шаг 4: Добавьте вторую переменную
- **Key (Имя):** `NOVA_PASSWORD`
- **Value (Значение):** `Hibmyk-jyjby0-duvvyq`
- Нажмите **"Add"** или **"Save"**

### Шаг 5: Проверьте список переменных
После добавления вы должны увидеть:
```
NOVA_USERNAME = maksstepenko@gmail.com
NOVA_PASSWORD = ••••••••••••••• (скрыто)
```

### Шаг 6: Пересоберите проект
После добавления переменных:
1. Railway может автоматически пересобрать проект
2. Или вручную: **Deployments** → последний деплой → три точки (⋮) → **Redeploy**

## Важно:

⚠️ **Переменные должны быть добавлены ДО сборки!**

Если вы добавите переменные ПОСЛЕ того, как сборка началась, они не будут доступны как build args.

## Проверка:

После добавления переменных и пересборки, проверьте логи:

1. Railway → Deployments → последний деплой → **View Logs**
2. Ищите строки:
   ```
   === Debug: Checking Nova credentials ===
   NOVA_USERNAME is set: YES
   NOVA_PASSWORD is set: YES
   === Setting up Nova authentication from environment variables ===
   ✓ Nova authentication configured successfully
   ```

Если видите:
```
NOVA_USERNAME is set: NO
NOVA_PASSWORD is set: NO
```

Это значит, что переменные не передаются. Проверьте:
1. ✅ Переменные добавлены в Railway
2. ✅ Переменные добавлены ПЕРЕД началом сборки
3. ✅ Переменные названы правильно (NOVA_USERNAME, NOVA_PASSWORD)

## Альтернатива: Использовать Railway Secrets

Если обычные переменные не работают, попробуйте использовать Railway Secrets:
1. Settings → Secrets
2. Добавьте секреты с теми же именами
3. Railway может автоматически передавать секреты как build args

