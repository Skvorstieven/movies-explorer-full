import { movieApiOptions } from './constants';

class MovieApi {
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

  // Fetch movies from API
  fetchMovies() {
    return fetch(`${this._baseURL}/beatfilm-movies`, {
      method: 'GET',
      headers: this._headers,
    })
      .then((res) => this._checkResponse(res))
      .then((res) => {
        const formattedMovies = res.map((movie) => {
          const movieInfo = {
            country: movie.country,
            director: movie.director,
            duration: movie.duration,
            year: movie.year,
            description: movie.description,
            image: `${this._baseURL}/${movie.image.url}`,
            trailerLink: movie.trailerLink,
            thumbnail: `${this._baseURL}/${movie.image.formats.thumbnail.url}`,
            movieId: movie.id,
            nameRU: movie.nameRU,
            nameEN: movie.nameEN,
          };
          return movieInfo;
        });
        return formattedMovies;
      });
  }
}

const movieApi = new MovieApi(movieApiOptions);

export default movieApi;
