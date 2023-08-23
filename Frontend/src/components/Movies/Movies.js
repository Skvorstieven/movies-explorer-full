import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

export default function Movies(props) {
  const { moviesToRender, savedMovies } = props;

  function onButtonClick(movieId) {
    // eslint-disable-next-line no-console
    console.log(movieId);
  }

  return (
    <main className="movies">
      <SearchForm />
      <MoviesCardList
        moviesToRender={moviesToRender}
        savedMovies={savedMovies}
        onButtonClick={onButtonClick}
        isSavedMovies={false}
      />
    </main>
  );
}
