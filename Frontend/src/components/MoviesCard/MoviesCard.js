import React, { useState, useEffect } from 'react';

import savedIconPath from '../../images/icons/saved-movie-icon.svg';
import deleteIconPath from '../../images/icons/delete-movie-icon.svg';

export default function MoviesCard(props) {
  const {
    movie,
    isSavedMovies,
    onButtonClick,
    savedMovies,
  } = props;

  const {
    nameRU,
    image,
    duration,
    trailerLink,
  } = movie;

  // Create state to determine if the movie is saved
  const [isSaved, setIsSaved] = useState(false);

  // Effect to check if the movie is already saved when savedMovies or movie changes
  useEffect(() => {
    const isAlreadySaved = savedMovies.some((item) => item.movieId === movie.movieId);
    setIsSaved(isAlreadySaved);
  }, [savedMovies, movie]);

  // Click handler for the button
  function onClick() {
    onButtonClick(movie, isSaved);
  }

  // Button for Movies component
  const moviesButton = (
    <button className={isSaved ? 'movies-card__button movies-card__button_saved' : 'movies-card__button'} type="button" onClick={onClick}>
      {isSaved ? (<img className="movies-card__icon" src={savedIconPath} alt="Фильм сохранен" />) : 'Сохранить'}
    </button>
  );

  // Button for SavedMovies component
  const savedMoviesButton = (
    <button className="movies-card__button" type="button" onClick={onClick}>
      <img className="movies-card__icon" src={deleteIconPath} alt="Удалить фильм" />
    </button>
  );

  return (
    <li className="movies-card">
      <div className="movies-card__text-wrapper">
        <p className="movies-card__name">
          { nameRU }
        </p>
        <p className="movies-card__duration">
          {`${Math.floor(duration / 60)}ч ${duration % 60}м`}
        </p>
      </div>
      <a className="movies-card__link" href={trailerLink} target="_blank" rel="noreferrer">
        <img className="movies-card__thumbnail" src={image} alt={nameRU} />
      </a>
      {isSavedMovies ? savedMoviesButton : moviesButton}
    </li>
  );
}
