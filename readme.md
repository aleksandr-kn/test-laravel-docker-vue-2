# Laravel + Vue SPA с Docker Compose
# .env и ключ приложения лежат в открытую, так задумано, для быстроты развертывания.

1. Запустите контейнеры и соберите проект:
   docker-compose up -d --build

2. Входим в контейнер:
   docker exec -it laravel_app bash

3. Установка зависимостей:
   composer install

4.Миграции и сиды:
   php artisan migrate
   php artisan db:seed

5.Пакеты npm и сборка приложения
   npm install
   npm run dev

6.При переходе по любому урлу отдается Vue приложение, далее роутинг через него работает

7.Email и пароль тестового юзера чтобы не лезть в базу за рандомным:
   testUserEmail@gmail.com
   password


