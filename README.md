# Sprint 12

## Projekt by Praktikum 

### Проект - Место - это сервис, где люди могут делиться фотографиями.

**Ver 0.0.2**

[Страница проекта](https://ptrch.github.io/sprint12/)

### Используемые технологии:
HTML, GIT, NPM, Webpack, API

## Установка
Проверьте наличие установленного node.js и npm

### Склонируйте репозиторий
git clone https://github.com/ptrch/sprint12.git

### Установите зависимости:
npm install

### Для запуск сервера: 

npm run start 
запускает сервер на http://localhost:3000, где 3000 - порт по умолчанию

npm run dev 
запускает сервер на http://localhost:3000 с хот релоудом

## Использование
Запрос GET localhost:3000/users	Ответ JSON-список всех пользователей.

Запрос GET localhost:3000/cards	Ответ JSON-список всех карточек.

Запрос GET localhost:3000/users/:userID 	Ответ JSON-пользователя с переданным после /users идентификатором. 
Если такого нет, API должно возвращать 404 статус ответа и JSON:{ "message": "Нет пользователя с таким id" }
Несуществующий адрес	{ "message": "Запрашиваемый ресурс не найден" }

