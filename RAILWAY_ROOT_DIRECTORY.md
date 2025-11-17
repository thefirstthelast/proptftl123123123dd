# Настройка Root Directory в Railway

## Правильная настройка

### Вариант 1: Root Directory = `/` (корень проекта) ✅ РЕКОМЕНДУЕТСЯ

**Root Directory:** `/` (оставьте пустым или укажите `/`)

**Почему:**
- `railway.json` уже настроен с путем `backend/Dockerfile`
- Railway найдет Dockerfile по пути `backend/Dockerfile` от корня репозитория
- Это стандартный подход для монорепозиториев

### Вариант 2: Root Directory = `backend`

Если вы установите Root Directory = `backend`, то нужно изменить `railway.json`:

```json
{
  "build": {
    "builder": "DOCKERFILE",
    "dockerfilePath": "Dockerfile"  // Без backend/
  }
}
```

---

## Рекомендация

**Используйте Вариант 1: Root Directory = `/`**

В Railway Dashboard:
1. Зайдите в Settings вашего сервиса
2. Найдите "Root Directory"
3. Оставьте **пустым** или укажите `/`
4. Railway автоматически найдет `backend/Dockerfile` согласно `railway.json`

---

## Проверка

После настройки Railway должен:
1. Найти `railway.json` в корне проекта
2. Прочитать путь к Dockerfile: `backend/Dockerfile`
3. Использовать этот Dockerfile для сборки
