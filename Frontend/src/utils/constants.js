const mainApiOptions = {
  baseURL: 'https://api.skvormovies.nomoreparties.sbs',
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
