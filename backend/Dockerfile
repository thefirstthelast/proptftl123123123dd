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
# Создаем auth.json из переменных окружения, если они доступны
RUN echo "=== Setting up Nova authentication ==="; \
    if [ -n "$NOVA_USERNAME" ] && [ -n "$NOVA_PASSWORD" ]; then \
        echo "✓ Using Railway variables for Nova auth"; \
        composer config --auth http-basic.nova.laravel.com "$NOVA_USERNAME" "$NOVA_PASSWORD"; \
    else \
        echo "⚠ WARNING: NOVA_USERNAME or NOVA_PASSWORD not available as build args"; \
        echo "Trying to use environment variables..."; \
        if [ -n "${NOVA_USERNAME:-}" ] && [ -n "${NOVA_PASSWORD:-}" ]; then \
            echo "✓ Using environment variables for Nova auth"; \
            composer config --auth http-basic.nova.laravel.com "${NOVA_USERNAME}" "${NOVA_PASSWORD}"; \
        else \
            echo "✗ ERROR: Nova credentials not found!"; \
            echo "Please add NOVA_USERNAME and NOVA_PASSWORD to Railway → Settings → Variables"; \
            exit 1; \
        fi; \
    fi; \
    echo "=== Verifying Nova config ==="; \
    composer config --list | grep -i nova || echo "Nova config not found"

# Установка зависимостей с детальным логированием
RUN echo "=== Starting composer install ===" && \
    composer install --optimize-autoloader --no-dev --no-interaction --no-scripts -vvv || \
    (echo "=== First attempt failed ===" && \
     echo "=== Retrying with --ignore-platform-reqs ===" && \
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

