# Инструкция по деплою

## Вариант 1: VPS (DigitalOcean, Hetzner, AWS EC2)

### Требования к серверу:
- Ubuntu 22.04 LTS
- PHP 8.2+
- Node.js 22.21.0
- MySQL/PostgreSQL или SQLite (для начала)
- Nginx
- PM2 (для фронтенда)

### Шаги деплоя:

#### 1. Подготовка сервера

```bash
# Обновление системы
sudo apt update && sudo apt upgrade -y

# Установка PHP 8.2
sudo apt install -y software-properties-common
sudo add-apt-repository ppa:ondrej/php -y
sudo apt update
sudo apt install -y php8.2 php8.2-fpm php8.2-mysql php8.2-xml php8.2-mbstring php8.2-curl php8.2-zip php8.2-gd php8.2-sqlite3

# Установка Composer
curl -sS https://getcomposer.org/installer | php
sudo mv composer.phar /usr/local/bin/composer

# Установка Node.js 22.21.0
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs
sudo npm install -g pm2

# Установка Nginx
sudo apt install -y nginx

# Установка MySQL (опционально, можно использовать SQLite)
sudo apt install -y mysql-server
```

#### 2. Настройка бэкенда (Laravel)

```bash
# Клонирование проекта (или загрузка через git)
cd /var/www
sudo git clone <ваш-репозиторий> propozly
cd propozly/backend

# Установка зависимостей
composer install --optimize-autoloader --no-dev

# Настройка .env
cp .env.example .env
nano .env  # Отредактируйте настройки

# Ключевые переменные для .env:
APP_ENV=production
APP_DEBUG=false
APP_URL=https://api.yourdomain.com

DB_CONNECTION=mysql  # или sqlite
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=propozly
DB_USERNAME=your_user
DB_PASSWORD=your_password

FRONTEND_URL=https://yourdomain.com
SANCTUM_STATEFUL_DOMAINS=yourdomain.com

SESSION_DRIVER=database
SESSION_DOMAIN=.yourdomain.com
SESSION_SECURE_COOKIE=true

# Генерация ключа
php artisan key:generate

# Запуск миграций
php artisan migrate --force

# Оптимизация
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

#### 3. Настройка фронтенда (Nuxt)

```bash
cd /var/www/propozly

# Установка зависимостей
npm ci

# Сборка проекта
npm run build

# Настройка PM2
# Отредактируйте ecosystem.config.cjs:
# - PORT: 3311 (или другой порт)
# - NODE_ENV: production

# Запуск через PM2
pm2 start ecosystem.config.cjs --env production
pm2 save
pm2 startup  # Следуйте инструкциям для автозапуска
```

#### 4. Настройка Nginx

Создайте файл `/etc/nginx/sites-available/propozly`:

```nginx
# Frontend (Nuxt)
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;
    
    location / {
        proxy_pass http://127.0.0.1:3311;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}

# Backend (Laravel API)
server {
    listen 80;
    server_name api.yourdomain.com;
    root /var/www/propozly/backend/public;

    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-Content-Type-Options "nosniff";

    index index.php;

    charset utf-8;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location = /favicon.ico { access_log off; log_not_found off; }
    location = /robots.txt  { access_log off; log_not_found off; }

    error_page 404 /index.php;

    location ~ \.php$ {
        fastcgi_pass unix:/var/run/php/php8.2-fpm.sock;
        fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
        include fastcgi_params;
    }

    location ~ /\.(?!well-known).* {
        deny all;
    }
}
```

Активируйте конфигурацию:

```bash
sudo ln -s /etc/nginx/sites-available/propozly /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

#### 5. SSL сертификат (Let's Encrypt)

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com -d api.yourdomain.com
```

#### 6. Обновление переменных окружения фронтенда

В `nuxt.config.ts` или через переменные окружения:

```bash
# В .env или при сборке
NUXT_PUBLIC_API_BASE=https://api.yourdomain.com
```

Пересоберите фронтенд:

```bash
npm run build
pm2 restart propozly-new
```

---

## Вариант 2: Облачные платформы (быстрее)

### Backend: Railway / Fly.io / Render

1. **Railway** (https://railway.app):
   - Подключите GitHub репозиторий
   - Выберите папку `backend`
   - Railway автоматически определит Laravel
   - Добавьте переменные окружения из `.env`
   - Получите URL типа: `https://your-app.railway.app`

2. **Fly.io** (https://fly.io):
   ```bash
   cd backend
   fly launch
   # Следуйте инструкциям
   ```

### Frontend: Vercel / Netlify

1. **Vercel** (https://vercel.com):
   - Подключите GitHub репозиторий
   - Root Directory: `/` (корень проекта)
   - Build Command: `npm run build`
   - Output Directory: `.output/public`
   - Environment Variables:
     - `NUXT_PUBLIC_API_BASE`: URL вашего бэкенда

2. **Netlify**:
   - Аналогично Vercel
   - Build command: `npm run build`
   - Publish directory: `.output/public`

---

## Вариант 3: Docker (для продвинутых)

Создайте `docker-compose.yml` в корне проекта:

```yaml
version: '3.8'

services:
  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    ports:
      - "8000:8000"
    environment:
      - APP_ENV=production
      - DB_CONNECTION=mysql
      - DB_HOST=db
    depends_on:
      - db

  frontend:
    build:
      context: .
      dockerfile: Dockerfile.frontend
    ports:
      - "3000:3000"
    environment:
      - NUXT_PUBLIC_API_BASE=http://backend:8000
    depends_on:
      - backend

  db:
    image: mysql:8.0
    environment:
      MYSQL_DATABASE: propozly
      MYSQL_USER: propozly
      MYSQL_PASSWORD: password
      MYSQL_ROOT_PASSWORD: rootpassword
    volumes:
      - db_data:/var/lib/mysql

volumes:
  db_data:
```

---

## Проверка после деплоя

1. Проверьте фронтенд: `https://yourdomain.com`
2. Проверьте API: `https://api.yourdomain.com/api/auth/user`
3. Проверьте Nova: `https://api.yourdomain.com/nova`
4. Попробуйте регистрацию и логин

## Полезные команды

```bash
# Логи PM2
pm2 logs propozly-new

# Рестарт фронтенда
pm2 restart propozly-new

# Рестарт бэкенда (если используете supervisor)
sudo supervisorctl restart laravel-worker

# Логи Laravel
tail -f /var/www/propozly/backend/storage/logs/laravel.log

# Логи Nginx
sudo tail -f /var/log/nginx/error.log
```

