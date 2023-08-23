import { mainApiOptions } from './constants';

class MainApi {
  constructor(options) {
    this._baseURL = options.baseURL;
    this._headers = options.headers;
  }

  // Check fetch response
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    const errorCode = res.status;
    return res.json()
      .then((error) => {
        throw new Error(`Ошибка ${errorCode}: ${error.message}`);
      });
  }

  // Register new user
  register(values) {
    return fetch(`${this._baseURL}/signup`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(values),
    })
      .then((res) => this._checkResponse(res));
  }

  // Authorize user
  authorize(values) {
    return fetch(`${this._baseURL}/signin`, {
      method: 'POST',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify(values),
    })
      .then((res) => this._checkResponse(res));
  }

  // Logout
  logout() {
    return fetch(`${this._baseURL}/signout`, {
      method: 'POST',
      headers: this._headers,
      credentials: 'include',
    });
  }

  // checkToken
  checkToken() {
    return fetch(`${this._baseURL}/users/me`, {
      method: 'GET',
      credentials: 'include',
    });
  }

  // Update user
  updateUser(data) {
    return fetch(`${this._baseURL}/users/me`, {
      method: 'PATCH',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        email: data.email,
      }),
    })
      .then((res) => this._checkResponse(res));
  }

  // Get movies saved by user
  getSavedMovies() {
    return fetch(`${this._baseURL}/movies`, {
      method: 'GET',
      credentials: 'include',
      headers: this._headers,
    })
      .then((res) => this._checkResponse(res));
  }

  // Save movie
  saveMovie(movie) {
    return fetch(`${this._baseURL}/movies`, {
      method: 'POST',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify(movie),
    })
      .then((res) => this._checkResponse(res));
  }

  // Delete movie
  deleteMovie(id) {
    return fetch(`${this._baseURL}/movies/${id}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: this._headers,
    });
  }
}

const mainApi = new MainApi(mainApiOptions);
export default mainApi;
