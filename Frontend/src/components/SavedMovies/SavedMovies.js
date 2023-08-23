import React from 'react';

import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

export default function Movies(props) {
  // Get movies saved by user
  const { savedMovies, onButtonClick } = props;

  return (
    <main className="saved-movies">
      <SearchForm />
      <MoviesCardList
        moviesToRender={savedMovies}
        savedMovies={savedMovies}
        onButtonClick={onButtonClick}
        isSavedMovies
      />
    </main>
  );
}
