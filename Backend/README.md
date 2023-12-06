# movies-explorer-api
Backend part of the "Movies Explorer" project

## Project links

Repository: https://github.com/Skvorstieven/movies-explorer-api

IP: 158.160.120.39

Domain: https://api.skvormovies.nomoreparties.sbs

## Endpoints

/signup - POST will register new user;

/signin - POST will authorize user;

/signout - POST will logout;

/users/me - GET will return current user info, PATCH will update current user info;

/movies - GET will return list of movies saved by current user, POST will save a new movie;

/movies/_id - DELETE will delete movie with '_id';

## Scripts

npm run start - will start a server;

npm run dev - will start a server with hot reload;

npm run test - will try to complete autotests for DB and for Endpoints;



