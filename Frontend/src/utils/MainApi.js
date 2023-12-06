import { MainApiOptions } from './constants';

class MainApi {
  constructor(options) {
    this._baseURL = options.baseURL;
    this._headers = options.headers;
  }

  // Helper method to check fetch response and handle errors
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    const errorCode = res.status;
    return res.json().then((error) => {
      throw new Error(`Ошибка ${errorCode}: ${error.message}`);
    });
  }

  // Register a new user
  register(values) {
    return fetch(`${this._baseURL}/signup`, {
      method: 'POST',
      headers: this._headers,
      credentials: 'include', // Include credentials (e.g., cookies) for authentication
      body: JSON.stringify(values), // Convert values to JSON and send in the request body
    }).then((res) => this._checkResponse(res));
  }

  // Authorize a user
  authorize(values) {
    return fetch(`${this._baseURL}/signin`, {
      method: 'POST',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify(values),
    }).then((res) => this._checkResponse(res));
  }

  // Logout the user
  logout() {
    return fetch(`${this._baseURL}/signout`, {
      method: 'POST',
      headers: this._headers,
      credentials: 'include',
    });
  }

  // Check the user's token and get user data
  checkToken() {
    return fetch(`${this._baseURL}/users/me`, {
      method: 'GET',
      credentials: 'include',
    });
  }

  // Update user data
  updateUser(data) {
    return fetch(`${this._baseURL}/users/me`, {
      method: 'PATCH',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        email: data.email,
      }),
    }).then((res) => this._checkResponse(res));
  }

  // Get movies saved by the user
  getSavedMovies() {
    return fetch(`${this._baseURL}/movies`, {
      method: 'GET',
      credentials: 'include',
      headers: this._headers,
    }).then((res) => this._checkResponse(res));
  }

  // Save a movie to the user's list
  saveMovie(movie) {
    return fetch(`${this._baseURL}/movies`, {
      method: 'POST',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify(movie),
    }).then((res) => this._checkResponse(res));
  }

  // Delete a saved movie
  deleteMovie(id) {
    return fetch(`${this._baseURL}/movies/${id}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: this._headers,
    });
  }
}

const mainApi = new MainApi(MainApiOptions);
export default mainApi;
