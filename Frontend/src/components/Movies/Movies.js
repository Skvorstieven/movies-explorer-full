import React from 'react';

import movieApi from '../../utils/MoviesApi';
import Search from '../../utils/Search';

import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';

export default function Movies(props) {
  const {
    savedMovies,
    onButtonClick,
    isLoading,
    setIsLoading,
    error,
    setError,
  } = props;

  const [isInitialState, setIsInitialState] = React.useState(true);
  const [foundMovies, setFoundMovies] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  const [selectShortMovies, setSelectShortMovies] = React.useState(false);

  const search = new Search({ storageNeeded: true });

  // Function to fetch movies from an API
  function handleGetMovies() {
    return movieApi
      .fetchMovies()
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  // Function to handle movie search
  function handleMoviesSearch(searchKey, shortMoviesOnly) {
    setIsInitialState(false);
    setIsLoading(true);
    handleGetMovies()
      .then((res) => {
        if (res) {
          setFoundMovies(search.searchFilter(res, searchKey, shortMoviesOnly));
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  React.useEffect(() => {
    const lastSearch = JSON.parse(localStorage.getItem('lastSearch'));

    if (lastSearch) {
      const { searchKey, searchResults, shortMoviesOnly } = lastSearch;
      setSearchValue(searchKey);
      setSelectShortMovies(shortMoviesOnly);
      setFoundMovies(searchResults);
    }
  }, []);

  return (
    <main className="movies">
      <SearchForm
        selectShortMovies={selectShortMovies}
        setSelectShortMovies={setSelectShortMovies}
        onSearchSubmit={handleMoviesSearch}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />
      {isLoading
        ? (<Preloader />)
        : (
          <MoviesCardList
            moviesToRender={foundMovies}
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
