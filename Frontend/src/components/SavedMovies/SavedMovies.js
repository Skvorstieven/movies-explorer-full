import React from 'react';

import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';

import mainApi from '../../utils/MainApi';
import Search from '../../utils/Search';

export default function Movies(props) {
  // Get movies saved by user
  const {
    savedMovies,
    setSavedMovies,
    onButtonClick,
    error,
    isLoading,
    setIsLoading,
  } = props;

  const [searchValue, setSearchValue] = React.useState('');
  const [selectShortMovies, setSelectShortMovies] = React.useState(false);

  const search = new Search({ storageNeeded: false });

  function handleSavedMoviesSearch(searchKey, shortMoviesOnly) {
    setIsLoading(true);
    mainApi
      .getSavedMovies()
      .then((res) => {
        if (res) {
          setSavedMovies(search.searchFilter(res, searchKey, shortMoviesOnly));
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <main className="saved-movies">
      <SearchForm
        selectShortMovies={selectShortMovies}
        setSelectShortMovies={setSelectShortMovies}
        onSearchSubmit={handleSavedMoviesSearch}
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
