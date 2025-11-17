FROM php:8.2-cli

# Nova credentials - ТОЛЬКО из переменных окружения Railway
# Railway автоматически передает переменные как build args
ARG NOVA_USERNAME
ARG NOVA_PASSWORD

# Преобразуем ARG в ENV для использования в RUN командах
ENV NOVA_USERNAME=${NOVA_USERNAME}
ENV NOVA_PASSWORD=${NOVA_PASSWORD}

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

# Настройка аутентификации Nova - ТОЛЬКО из переменных окружения
# Данные должны быть переданы через Railway Variables (NOVA_USERNAME и NOVA_PASSWORD)
RUN echo "=== Debug: Checking Nova credentials ===" && \
    NOVA_USERNAME_CLEAN=$(echo "${NOVA_USERNAME}" | tr -d '[:space:]') && \
    NOVA_PASSWORD_CLEAN=$(echo "${NOVA_PASSWORD}" | tr -d '[:space:]') && \
    echo "NOVA_USERNAME is set: $([ -n "${NOVA_USERNAME_CLEAN}" ] && echo 'YES' || echo 'NO')" && \
    echo "NOVA_PASSWORD is set: $([ -n "${NOVA_PASSWORD_CLEAN}" ] && echo 'YES' || echo 'NO')" && \
    if [ -z "${NOVA_USERNAME_CLEAN}" ] || [ -z "${NOVA_PASSWORD_CLEAN}" ]; then \
        echo "" && \
        echo "✗ ERROR: Nova credentials not found in environment variables!" && \
        echo "NOVA_USERNAME: ${NOVA_USERNAME:-<not set>}" && \
        echo "NOVA_PASSWORD: ${NOVA_PASSWORD:+<set>}${NOVA_PASSWORD:-<not set>}" && \
        echo "" && \
        echo "Please add NOVA_USERNAME and NOVA_PASSWORD to Railway:" && \
        echo "1. Railway Dashboard → Your Service → Settings → Variables" && \
        echo "2. Add NOVA_USERNAME=maksstepenko@gmail.com (NO SPACES!)" && \
        echo "3. Add NOVA_PASSWORD=Hibmyk-jyjby0-duvvyq (NO SPACES!)" && \
        echo "4. Make sure variables are set BEFORE building" && \
        exit 1; \
    fi && \
    echo "=== Setting up Nova authentication from environment variables ===" && \
    composer config --auth http-basic.nova.laravel.com "${NOVA_USERNAME_CLEAN}" "${NOVA_PASSWORD_CLEAN}" && \
    echo "✓ Nova authentication configured successfully" && \
    echo "=== Verifying auth config ===" && \
    composer config --list | grep -i nova || echo "Warning: Nova config not visible"

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

