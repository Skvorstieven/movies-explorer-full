# movies-explorer-full
Репозиторий для приложения проекта Movie Explorer, включающий фронтенд и бэкенд части приложения со следующими возможностями: авторизации и регистрации пользователей, операции с карточками и пользователями.

## Эндпоинты API

/signup - POST Зарегистрирует нового пользователя;

/signin - POST Авторизует пользователя и присылает cookie;

/signout - POST Выходит из аккаунта и очищает cookie;

/users/me - GET вернет данные о текущем пользователе, PATCH обновит данные о текущем пользователе;

/movies - GET вернет список фильмов сохраненных текущим пользователем, POST сохранит новую карточку фильма;

/movies/_id - DELETE удалит из списка карточку фильма с '_id';

## Скрипты Бэкенда

npm run start - Запустит сервер;

npm run dev - Запустит сервер в режиме разработки с hot reload;

npm run test - Запустит автотесты;

## Скрипты Фронтенда

npm run start - Запустит приложение с hot reload;

npm run build - Создаст текущую сборку приложения;
