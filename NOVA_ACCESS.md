# Как зайти в админку (Laravel Nova)

## Важно понимать

**Админка (Nova) находится на бэкенде, а не на фронтенде!**

- **Фронтенд на Vercel:** `https://proptftl123123123dd.vercel.app/` - это пользовательская часть
- **Админка на бэкенде:** `https://your-backend-url.com/nova` - это административная панель

## Шаг 1: Определите URL вашего бэкенда

Админка доступна по адресу: `https://your-backend-url.com/nova`

Где `your-backend-url.com` - это URL вашего Laravel бэкенда.

### Примеры:
- Если бэкенд на Railway: `https://propozly-api.railway.app/nova`
- Если бэкенд на отдельном домене: `https://api.yourdomain.com/nova`
- Если бэкенд локально: `http://localhost:8000/nova`

## Шаг 2: Создайте пользователя для входа в Nova

Если у вас еще нет пользователя для входа в админку, создайте его:

### На сервере (SSH):
```bash
cd /path/to/backend
php artisan nova:user
```

Команда попросит ввести:
- Email
- Имя
- Пароль

### Или создайте через Tinker:
```bash
php artisan tinker
```

Затем в консоли:
```php
$user = \App\Models\User::create([
    'name' => 'Admin',
    'email' => 'admin@example.com',
    'password' => bcrypt('your-secure-password'),
]);
```

## Шаг 3: Войдите в админку

1. Откройте в браузере: `https://your-backend-url.com/nova`
2. Введите email и пароль созданного пользователя
3. Готово! Вы в админке

## Проверка доступа

В файле `backend/app/Providers/NovaServiceProvider.php` настроен доступ:

```php
Gate::define('viewNova', function (User $user) {
    // Разрешаем доступ всем пользователям
    return true;
});
```

Это означает, что **любой зарегистрированный пользователь** может зайти в Nova.

Если хотите ограничить доступ только определенным пользователям, измените на:

```php
Gate::define('viewNova', function (User $user) {
    return in_array($user->email, [
        'admin@example.com',
        'another-admin@example.com',
    ]);
});
```

## Частые проблемы

### Ошибка 404 при переходе на /nova
- Убедитесь, что бэкенд запущен и доступен
- Проверьте, что Nova установлена: `composer show laravel/nova`
- Проверьте, что провайдеры зарегистрированы в `bootstrap/providers.php`

### Ошибка "This domain is not authorized"
- Проверьте переменную `NOVA_LICENSE_KEY` в `.env` бэкенда
- Убедитесь, что лицензия Nova привязана к правильному домену

### Не могу войти / Неправильный пароль
- Убедитесь, что пользователь создан: `php artisan nova:user`
- Проверьте, что пароль правильный
- Попробуйте сбросить пароль через Tinker:
  ```php
  $user = \App\Models\User::where('email', 'admin@example.com')->first();
  $user->password = bcrypt('new-password');
  $user->save();
  ```

### CORS ошибки
- Убедитесь, что домен фронтенда добавлен в `CORS_ALLOWED_ORIGINS` (но это для API, не для Nova)
- Nova работает на бэкенде, поэтому CORS не должен быть проблемой

## Где находится бэкенд?

Если вы не знаете URL бэкенда, проверьте:

1. **Railway / Fly.io / Render:**
   - Зайдите в Dashboard вашего хостинга
   - Найдите URL приложения
   - Добавьте `/nova` в конец

2. **VPS сервер:**
   - Если настроен через Nginx, проверьте конфигурацию
   - Обычно это `https://api.yourdomain.com` или `https://yourdomain.com/api`

3. **Локально:**
   - `http://localhost:8000/nova`

4. **Проверьте переменные окружения:**
   - В Vercel: `NUXT_PUBLIC_API_BASE` - это и есть URL бэкенда
   - Добавьте `/nova` в конец этого URL

## Пример

Если в Vercel у вас установлено:
```
NUXT_PUBLIC_API_BASE=https://propozly-api.railway.app
```

То админка будет доступна по адресу:
```
https://propozly-api.railway.app/nova
```

