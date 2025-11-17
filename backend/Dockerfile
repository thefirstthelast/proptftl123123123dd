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

# Копирование auth.json для Nova authentication
COPY auth.json* ./

# Настройка аутентификации Nova с детальным логированием
RUN echo "=== Checking Nova authentication ==="; \
    ls -la auth.json* 2>/dev/null || echo "No auth.json files found"; \
    if [ -f auth.json ]; then \
        echo "✓ Found auth.json, displaying contents:"; \
        cat auth.json; \
        echo "✓ Using auth.json for Nova authentication"; \
    elif [ -n "$NOVA_USERNAME" ] && [ -n "$NOVA_PASSWORD" ]; then \
        echo "✓ Configuring Nova auth from build args"; \
        composer config --auth http-basic.nova.laravel.com "$NOVA_USERNAME" "$NOVA_PASSWORD"; \
    else \
        echo "✗ ERROR: Nova credentials not found!"; \
        echo "Files in current directory:"; \
        ls -la; \
        exit 1; \
    fi; \
    echo "=== Checking composer Nova config ==="; \
    composer config --list | grep -i nova || echo "Nova config not found in composer config"

# Установка зависимостей с детальным логированием
RUN echo "=== Starting composer install ==="; \
    composer install --optimize-autoloader --no-dev --no-interaction --no-scripts -vvv 2>&1 | head -100 || \
    (echo "=== First attempt failed, checking error ===" && \
     echo "=== Retrying with --ignore-platform-reqs ===" && \
     composer install --optimize-autoloader --no-dev --no-interaction --no-scripts --ignore-platform-reqs -vvv 2>&1 | head -100)

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

