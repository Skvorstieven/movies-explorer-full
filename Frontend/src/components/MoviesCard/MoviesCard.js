import React from 'react';

import savedIconPath from '../../images/icons/saved-movie-icon.svg';
import deleteIconPath from '../../images/icons/delete-movie-icon.svg';

export default function Card(props) {
  const {
    movie,
    isAlreadySaved,
    isSavedMovies,
    onButtonClick,
  } = props;

  const { nameRU, thumbnail, duration } = movie;

  // Creat state for card
  const [isSaved, setIsSaved] = React.useState(isAlreadySaved);

  // Click handler
  function onClick() {
    onButtonClick(movie, isSaved);
    setIsSaved(!isSaved);
  }

  // Button for Movies component
  const moviesButton = (
    <button className={isSaved ? 'movies-card__button movies-card__button_saved' : 'movies-card__button'} type="button" onClick={onClick}>
      {isSaved ? (<img className="movies-card__icon" src={savedIconPath} alt="Фильм сохранен" />) : 'Сохранить'}
    </button>
  );

  // Button fo SavedMovies component
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
      <img className="movies-card__thumbnail" src={thumbnail} alt={nameRU} />
      {isSavedMovies ? savedMoviesButton : moviesButton}
    </li>
  );
}
