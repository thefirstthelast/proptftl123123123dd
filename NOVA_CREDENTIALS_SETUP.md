# Настройка креденшиалов Nova для Railway

## Проблема

Railway не может установить Laravel Nova из-за неправильных креденшиалов.

## Решение

### Шаг 1: Проверьте креденшиалы локально

1. Перейдите в папку `backend`:
   ```bash
   cd backend
   ```

2. Запустите скрипт проверки (замените на ваши реальные креденшиалы):
   ```bash
   NOVA_USERNAME=your-email@example.com NOVA_PASSWORD=your-password php check-nova-credentials.php
   ```

3. Если скрипт показывает ✅ - креденшиалы правильные
4. Если показывает ❌ - проверьте email и пароль

### Шаг 2: Добавьте переменные в Railway

1. Зайдите в Railway Dashboard → ваш сервис
2. Перейдите в **Settings** → **Variables**
3. Добавьте две переменные:

   ```
   NOVA_USERNAME=your-email@example.com
   NOVA_PASSWORD=your-password
   ```

   **ВАЖНО:** Замените на ваши реальные креденшиалы!

4. Также добавьте (если есть лицензионный ключ):
   ```
   NOVA_LICENSE_KEY=your-license-key
   ```

### Шаг 3: Пересоберите проект

После добавления переменных Railway автоматически пересоберет проект, или:
1. Зайдите в **Deployments**
2. Нажмите **Redeploy**

## Альтернативный способ: Проверка через Composer

Если скрипт не работает, попробуйте напрямую:

```bash
cd backend

# Установите переменные
export NOVA_USERNAME=your-email@example.com
export NOVA_PASSWORD=your-password

# Попробуйте обновить Composer
composer update laravel/nova --no-interaction

# Или попробуйте установить заново
composer require laravel/nova --no-interaction
```

Если команда выполняется без ошибок - креденшиалы правильные.

## Где взять креденшиалы Nova?

1. Зайдите на [nova.laravel.com](https://nova.laravel.com)
2. Войдите в свой аккаунт
3. Перейдите в настройки аккаунта
4. Там должны быть ваши креденшиалы для Composer

Или:
- **NOVA_USERNAME** - это email, который вы используете для входа в Nova
- **NOVA_PASSWORD** - это пароль от аккаунта Nova (не лицензионный ключ!)

## Проверка после настройки

После добавления переменных в Railway проверьте логи деплоя:
1. Railway Dashboard → Deployments
2. Выберите последний деплой
3. View Logs
4. Ищите строки типа:
   - ✅ `Created auth.json from environment variables` - успешно
   - ❌ `Authentication required` - неправильные креденшиалы

## Безопасность

⚠️ **НИКОГДА не коммитьте креденшиалы в git!**
- `auth.json` уже в `.gitignore`
- Используйте только переменные окружения
- Не делитесь креденшиалами публично

