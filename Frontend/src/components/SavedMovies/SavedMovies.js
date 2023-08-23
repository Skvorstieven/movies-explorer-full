import React from 'react';

import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

export default function Movies(props) {
  // Get movies saved by user
  const { savedMovies } = props;

  // Create state for component
  const [savedByUserMovies, setSavedByUserMovies] = React.useState(savedMovies);

  // Button click handler
  function onButtonClick(movieId) {
    setSavedByUserMovies(savedByUserMovies.filter((movie) => movie.movieId !== movieId));
  }

  return (
    <main className="saved-movies">
      <SearchForm />
      <MoviesCardList
        moviesToRender={savedByUserMovies}
        savedMovies={savedByUserMovies}
        onButtonClick={onButtonClick}
        isSavedMovies
      />
    </main>
  );
}
