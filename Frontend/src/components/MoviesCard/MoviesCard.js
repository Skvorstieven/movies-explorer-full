import React from 'react';

import savedIconPath from '../../images/icons/saved-movie-icon.svg';
import deleteIconPath from '../../images/icons/delete-movie-icon.svg';

export default function Card(props) {
  const {
    id,
    name,
    duration,
    thumbnail,
    isAlreadySaved,
    isSavedMovies,
    onButtonClick,
  } = props;

  // Creat state for card
  const [isSaved, setIsSaved] = React.useState(isAlreadySaved);

  // Click handler
  function onClick() {
    setIsSaved(!isSaved);
    onButtonClick(id);
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
          { name }
        </p>
        <p className="movies-card__duration">
          {`${Math.floor(duration / 60)}ч ${duration % 60}м`}
        </p>
      </div>
      <img className="movies-card__thumbnail" src={thumbnail} alt={name} />
      {isSavedMovies ? savedMoviesButton : moviesButton}
    </li>
  );
}
