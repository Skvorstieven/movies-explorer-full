# movies-explorer-full
"Movies Explorer" project

## Project links

Repository: https://github.com/Skvorstieven/movies-explorer-full

IP: 158.160.108.13

Backend domain: https://api.skvormovies.nomoreparties.sbs

Fronend domain https://skvormovies.nomoreparties.sbs

## Backend endpoints

/signup - POST will register new user;

/signin - POST will authorize user;

/signout - POST will logout;

/users/me - GET will return current user info, PATCH will update current user info;

/movies - GET will return list of movies saved by current user, POST will save a new movie;

/movies/_id - DELETE will delete movie with '_id';

## Backend scripts

npm run start - will start a server;

npm run dev - will start a server with hot reload;

npm run test - will try to complete autotests for DB and for Endpoints;

## Frontend scripts

npm run start - will start a server with hot reload on port 3006;

npm run build - will create production build of frontend;



