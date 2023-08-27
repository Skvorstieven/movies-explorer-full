import React from 'react';

import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';

export default function Movies(props) {
  // Get movies saved by user
  const {
    savedMovies,
    onButtonClick,
    selectShortMovies,
    setSelectShortMovies,
    error,
    isLoading,
    onSearchSubmit,
  } = props;

  const [searchValue, setSearchValue] = React.useState('');

  return (
    <main className="saved-movies">
      <SearchForm
        selectShortMovies={selectShortMovies}
        setSelectShortMovies={setSelectShortMovies}
        onSearchSubmit={onSearchSubmit}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />
      {isLoading
        ? (<Preloader />)
        : (
          <MoviesCardList
            moviesToRender={savedMovies}
            savedMovies={savedMovies}
            onButtonClick={onButtonClick}
            nothingToShowText="Пока нет сохраненных фильмов"
            isSavedMovies
            error={error}
          />
        )}
    </main>
  );
}
