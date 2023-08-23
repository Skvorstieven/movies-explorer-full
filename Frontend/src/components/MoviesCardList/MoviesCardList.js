import React from 'react';

import MoviesCard from '../MoviesCard/MoviesCard';

export default function MoviesCardList(props) {
  // Get viewport width
  const windowWidth = window.innerWidth;

  // Calculate how many cards to show depending on vp width
  function calculateMoviesAmount() {
    if (windowWidth >= 1280) {
      return 12;
    } if (windowWidth >= 768) {
      return 8;
    }
    return 5;
  }

  // Get movies amount
  const moviesAmountOnMount = calculateMoviesAmount();

  // Create state for movies
  const [loadedMoviesAmount, setLoadedMoviesAmount] = React.useState(moviesAmountOnMount);

  const {
    moviesToRender,
    savedMovies,
    isSavedMovies,
    onButtonClick,
  } = props;

  // Get needed amount of movies from array
  const loadedMovies = moviesToRender.slice(0, loadedMoviesAmount);

  // More button handler
  function onLoadMore() {
    setLoadedMoviesAmount(loadedMoviesAmount + moviesAmountOnMount);
  }

  return (
    <div className="movies-card-list">
      {moviesToRender.length !== 0 ? (
        <ul className="movies-card-list__list">
          {loadedMovies.map((movie) => (
            <MoviesCard
              key={movie.movieId}
              id={movie.movieId}
              name={movie.nameRU}
              duration={movie.duration}
              thumbnail={movie.thumbnail}
              isAlreadySaved={
                savedMovies.some((savedMovie) => savedMovie.movieId === movie.movieId)
              }
              isSavedMovies={isSavedMovies}
              onButtonClick={onButtonClick}
            />
          ))}
        </ul>
      ) : (
        <p className="movies-card-list__not-found-message">
          {isSavedMovies ? 'Пока нет сохраненных фильмов' : 'По вашему запросу ничего не найдено'}
        </p>
      )}
      {loadedMoviesAmount <= moviesToRender.length ? (<button className="movies-card-list__button" type="button" onClick={onLoadMore}>Ещё</button>) : ''}
    </div>

  );
}
