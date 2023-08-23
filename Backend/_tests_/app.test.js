const supertest = require('supertest');
const mongoose = require('mongoose');
const User = require('../models/user');
const Movie = require('../models/movie');
const fixtures = require('./fixtures/app');

const app = require('../app');

const request = supertest(app);

afterAll(() => {
  return mongoose.disconnect();
});

// Testing user creation directly in database
describe('Database user test', () => {
  beforeEach(() => {
    const { name, email, password } = fixtures.user;

    return User.create({
      name,
      email,
      password,
    });

  });


  afterEach(() => User.deleteOne({ email: fixtures.user.email }));

  it('User must exist', () => {
    return User.findOne({ email: fixtures.user.email })
      .then((user) => {
        expect(user).toBeDefined();
        expect(user.email).toBe(fixtures.user.email);
        expect(user.name).toBe(fixtures.user.name);
      });
  });
});

// Testing movie creation directly in database
describe('Database movie test', () => {

  beforeEach(() => {
    const { director, country, duration, year, description, image, trailerLink, thumbnail, owner, movieId, nameRU, nameEN } = fixtures.movie;

    Movie.create({
        director,
        country,
        duration,
        year,
        description,
        image,
        trailerLink,
        thumbnail,
        owner,
        movieId,
        nameRU,
        nameEN
      })
    });

    afterEach(() => Movie.deleteOne({ movieId: fixtures.movie.movieId }));

    it('Movie must exist', () => {
      return Movie.findOne({ movieId: fixtures.movie.movieId })
        .then((movie) => {
          expect(movie).toBeDefined();
          expect(movie.nameEN).toBe(fixtures.movie.nameEN);
        });
    });

});

// Testing app endpoints
describe('App endpoints tests', () => {
  let firstToken = "";
  let secondToken = "";
  let createdMovieId = "";
  const { name, email, password } = fixtures.user;
  const { director, country, duration, year, description, image, trailerLink, thumbnail, movieId, nameRU, nameEN } = fixtures.movie
  const { wrongName, wrongEmail, wrongPassword } = fixtures.wrongUser;
  const { anotherUserName, anotherUserEmail, anotherUserPassword } = fixtures.anotherUser;

  afterAll(() => User.deleteOne({ email: 'newemail@example.com' }));

  it('POST "/signup" with invalid data should return 400', () => {
    return request.post('/signup')
      .send({ wrongName, wrongEmail, wrongPassword })
      .set('Accept', 'application/json')
      .then((response) => {
        expect(response.status).toBe(400);
      })
  });

  it('POST "/signup" should return 201 and create a new user', () => {
    return request.post('/signup')
      .send({ name, email, password })
      .set('Accept', 'application/json')
      .then((response) => {
        expect(response.status).toBe(201);
        expect(response.headers['content-type']).toMatch('application/json');
        expect(response.body.name).toBe(name);
        expect(response.body.email).toBe(email);
        expect(response.body.password).toBeUndefined();
      })
  });

  it('POST "/signup" with another set of credentials should return 201 and create a new user', () => {
    return request.post('/signup')
      .send({ name: anotherUserName, email: anotherUserEmail, password: anotherUserPassword })
      .set('Accept', 'application/json')
      .then((response) => {
        expect(response.status).toBe(201);
        expect(response.headers['content-type']).toMatch('application/json');
        expect(response.body.name).toBe(anotherUserName);
        expect(response.body.email).toBe(anotherUserEmail);
        expect(response.body.password).toBeUndefined();
      })
  });

  it('POST "/signup" with already existing email should return 409', () => {
    return request.post('/signup')
      .send({ name, email, password })
      .set('Accept', 'application/json')
      .then((response) => {
        expect(response.status).toBe(409);
        expect(response.headers['content-type']).toMatch('application/json');
        expect(response.body.message).toBe('Пользователь с этим email уже существует');
      })
  });

  it('POST "/signin" with invalid credentials should return 401', () => {
    return request.post('/signin')
      .send({ email: 'nonexistant@wrong.com', password: 'nonexistant' })
      .set('Accept', 'application/json')
      .then((response) => {
        expect(response.status).toBe(401);
        expect(response.body.message).toBe('Неправильные почта или пароль');
      })
  });

  it('POST "/signin" with valid credentials should return 200 and return a Token', () => {
    return request.post('/signin')
      .send({ email, password })
      .set('Accept', 'application/json')
      .then((response) => {
        expect(response.status).toBe(200);
        expect(response.headers['content-type']).toMatch('application/json');
        firstToken = response.headers['set-cookie'][0].split(" ")[0].slice(4, 153);
        expect(firstToken).toBeDefined();
      })
  });

  it('POST "/signin" with another set of valid credentials should return 200 and return a Token', () => {
    return request.post('/signin')
      .send({ email: anotherUserEmail, password: anotherUserPassword })
      .set('Accept', 'application/json')
      .then((response) => {
        expect(response.status).toBe(200);
        expect(response.headers['content-type']).toMatch('application/json');
        secondToken = response.headers['set-cookie'][0].split(" ")[0].slice(4, 153);
        expect(secondToken).toBeDefined();
      })
  });

  it('GET "/noexistant" with valid credentials should return 404', () => {
    return request.get('/noexistant')
      .set('Accept', 'application/json')
      .set('Cookie', `jwt=${firstToken}`)
      .then((response) => {
        expect(response.status).toBe(404);
      })
  })

  it('GET "/users/me" with valid credentials should return 200 and return current user data without password', () => {
    return request.get('/users/me')
      .set('Accept', 'application/json')
      .set('Cookie', `jwt=${firstToken}`)
      .then((response) => {
        expect(response.status).toBe(200);
        expect(response.headers['content-type']).toMatch('application/json');
        expect(response.body.name).toBe(name);
        expect(response.body.email).toBe(email);
        expect(response.body.password).toBeUndefined();
      })
  });

  it('GET "/users/me" without valid credentials should return 401', () => {
    return request.get('/users/me')
      .set('Accept', 'application/json')
      .then((response) => {
        expect(response.status).toBe(401);
        expect(response.headers['content-type']).toMatch('application/json');
        expect(response.body.message).toBe('Необходима авторизация');
      })
  });

  it('PATCH "/users/me" with invalid credentials should return 400', () => {
    return request.patch('/users/me')
      .set('Accept', 'application/json')
      .set('Cookie', `jwt=${firstToken}`)
      .send({ name: 'n', email: ''})
      .then((response) => {
        expect(response.status).toBe(400);
        expect(response.headers['content-type']).toMatch('application/json');
      })
  });

  it('PATCH "/users/me" with existing email should return 409', () => {
    return request.patch('/users/me')
      .set('Accept', 'application/json')
      .set('Cookie', `jwt=${firstToken}`)
      .send({ name, email: anotherUserEmail })
      .then((response) => {
        expect(response.status).toBe(409);
        expect(response.headers['content-type']).toMatch('application/json');
      })
  });

  it('PATCH "/users/me" with valid credentials should return 200 and return updatet current user data without password', () => {
    return request.patch('/users/me')
      .set('Accept', 'application/json')
      .set('Cookie', `jwt=${firstToken}`)
      .send({ name: 'newname', email: 'newemail@example.com'})
      .then((response) => {
        expect(response.status).toBe(200);
        expect(response.headers['content-type']).toMatch('application/json');
        expect(response.body.name).toBe('newname');
        expect(response.body.email).toBe('newemail@example.com');
        expect(response.body.password).toBeUndefined();
      })
  });

  it('POST "/movies" should return 201 and create a new movie', () => {
    return request.post('/movies')
      .set('Accept', 'application/json')
      .set('Cookie', `jwt=${firstToken}`)
      .send({
        director,
        country,
        duration,
        year,
        description,
        image,
        trailerLink,
        thumbnail,
        movieId,
        nameRU,
        nameEN
      })
      .then((response) => {
        expect(response.status).toBe(201);
        expect(response.headers['content-type']).toMatch('application/json');
        expect(response.body.movieId).toBe(movieId);
        createdMovieId = response.body._id;
      })
  });

  it('GET "/movies" should return 200 and an array of movies created by current user ', () => {
    return request.get('/movies')
      .set('Accept', 'application/json')
      .set('Cookie', `jwt=${firstToken}`)
      .then((response) => {
        expect(response.status).toBe(200);
        expect(response.headers['content-type']).toMatch('application/json');
        expect(response.body[0]._id).toBe(createdMovieId);
      })
  });

  it('DELETE "/movies/:movieId" that belongs to another user should return 403', () => {
    return request.delete(`/movies/${createdMovieId}`)
      .set('Accept', 'application/json')
      .set('Cookie', `jwt=${secondToken}`)
      .then((response) => {
        expect(response.status).toBe(403);
        expect(response.body.message).toBe('Недостаточно прав');
      })
      .then((() => User.deleteOne({ email: anotherUserEmail })))
  });

  it('DELETE "/movies/:movieId" should return 204', () => {
    return request.delete(`/movies/${createdMovieId}`)
      .set('Accept', 'application/json')
      .set('Cookie', `jwt=${firstToken}`)
      .then((response) => {
        expect(response.status).toBe(204);
      })
  });

});
