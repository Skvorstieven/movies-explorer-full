import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';

export default function Movies(props) {
  const {
    moviesToRender,
    savedMovies,
    onButtonClick,
    selectShortMovies,
    setSelectShortMovies,
    isLoading,
    onSearchSubmit,
    isInitialState,
    error,
    searchValue,
    setSearchValue,
  } = props;

  return (
    <main className="movies">
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
            moviesToRender={moviesToRender}
            savedMovies={savedMovies}
            onButtonClick={onButtonClick}
            isSavedMovies={false}
            nothingToShowText={isInitialState ? 'Начните поиск' : 'По вашему запросу ничего не найдено'}
            error={error}
          />
        )}

    </main>
  );
}
