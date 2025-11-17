FROM php:8.2-cli

# Build arguments для Nova credentials
ARG NOVA_USERNAME
ARG NOVA_PASSWORD

# Установка системных зависимостей и PHP расширений
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    libzip-dev \
    zip \
    unzip \
    && docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd zip \
    && docker-php-ext-enable zip \
    && rm -rf /var/lib/apt/lists/*

# Установка Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Установка рабочей директории
WORKDIR /var/www

# Копирование composer файлов для кеширования зависимостей
COPY composer.json composer.lock ./

# Настройка аутентификации Nova из переменных окружения Railway
# Railway автоматически передает переменные окружения как build args
RUN if [ -n "$NOVA_USERNAME" ] && [ -n "$NOVA_PASSWORD" ]; then \
        echo "✓ Configuring Nova auth from Railway variables"; \
        composer config --auth http-basic.nova.laravel.com "$NOVA_USERNAME" "$NOVA_PASSWORD"; \
    else \
        echo "✗ WARNING: NOVA_USERNAME or NOVA_PASSWORD not set!"; \
        echo "Please add NOVA_USERNAME and NOVA_PASSWORD to Railway variables"; \
        exit 1; \
    fi

# Проверка конфигурации перед установкой
RUN composer config --list | grep -i nova || echo "Nova config not found"

# Установка зависимостей с детальным логированием
RUN set -eux; \
    echo "Starting composer install..."; \
    composer install --optimize-autoloader --no-dev --no-interaction --no-scripts -vvv || \
    (echo "First attempt failed, retrying with --ignore-platform-reqs..." && \
     composer install --optimize-autoloader --no-dev --no-interaction --no-scripts --ignore-platform-reqs -vvv)

# Копирование остальных файлов
COPY . .

# Запуск post-install скриптов
RUN composer dump-autoload --optimize

# Установка прав
RUN chmod -R 755 /var/www/storage \
    && chmod -R 755 /var/www/bootstrap/cache

# Expose port
EXPOSE 8000

# Start command
CMD php artisan serve --host=0.0.0.0 --port=8000

