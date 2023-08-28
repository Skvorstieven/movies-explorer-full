// Configuration options for the main API
const mainApiOptions = {
  baseURL: 'https://api.skvormovies.nomoreparties.sbs', // Base URL of the main API
  headers: {
    'Content-Type': 'application/json', // Content-Type header for JSON data
  },
};

// Configuration options for the movie API
const movieApiOptions = {
  baseURL: 'https://api.nomoreparties.co', // Base URL of the movie API
  headers: {
    'Content-Type': 'application/json', // Content-Type header for JSON data
  },
};

// Text messages used in the application for various scenarios
const nothingToShowText = {
  savedMovies: 'Пока нет сохраненных фильмов', // Message for no saved movies
  movies: 'По вашему запросу ничего не найдено', // Message for no search results
  moviesInitial: 'Начните поиск', // Message to start searching
};

// Success message for profile updates
const profileUpdateSuccessMessage = 'Профиль успешно обновлен';

// Number of movies to display on different screen sizes
const moviesAmount = {
  desktop: 12,
  tablet: 8,
  mobile: 5,
};

// Error message for server-related issues
const serverErrorMessage = 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз';

// Export the constants for use in other parts of the application
export {
  mainApiOptions,
  movieApiOptions,
  nothingToShowText,
  profileUpdateSuccessMessage,
  moviesAmount,
  serverErrorMessage,
};
