const mainApiOptions = {
  baseURL: 'https://skvormovies.nomoreparties.sbs',
  headers: {
    'Content-Type': 'application/json',
  },
};

const movieApiOptions = {
  baseURL: 'https://api.nomoreparties.co/',
  headers: {
    'Content-Type': 'application/json',
  },
};

export {
  mainApiOptions,
  movieApiOptions,
};
