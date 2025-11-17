# Настройка Root Directory в Railway

## Проблема

Railway не может найти Dockerfile или файлы, потому что контекст сборки неправильный.

## Решение: Установить Root Directory

**ВАЖНО:** Нужно установить Root Directory в настройках Railway на `backend`.

### Пошаговая инструкция:

1. **Откройте Railway Dashboard:**
   - Зайдите на [railway.app](https://railway.app)
   - Выберите ваш проект
   - Выберите сервис с бэкендом

2. **Откройте настройки Deploy:**
   - Нажмите на сервис
   - Перейдите в **Settings** (или нажмите на иконку ⚙️)
   - Выберите вкладку **Deploy** (или **Build**)

3. **Установите Root Directory:**
   - Найдите поле **"Root Directory"** или **"Service Root"**
   - Введите: `backend`
   - Сохраните изменения

4. **Обновите railway.json:**
   - После установки Root Directory, Railway будет использовать `backend/` как корень
   - Поэтому в `railway.json` нужно указать `dockerfilePath: "Dockerfile"` (без `backend/`)

5. **Пересоберите:**
   - Railway автоматически пересоберет проект
   - Или вручную: Deployments → три точки (⋮) → Redeploy

## Альтернатива: Если Root Directory не работает

Если настройка Root Directory не работает, можно:

1. **Переместить Dockerfile в корень проекта** (не рекомендуется, но работает)
2. **Использовать monorepo настройки Railway**

## Проверка

После настройки Root Directory:
- ✅ Railway должен найти Dockerfile в `backend/Dockerfile`
- ✅ Контекст сборки будет `backend/`
- ✅ Все пути в Dockerfile будут работать правильно

