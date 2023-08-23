import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

export default function Movies(props) {
  const { moviesToRender, savedMovies, onButtonClick } = props;

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
