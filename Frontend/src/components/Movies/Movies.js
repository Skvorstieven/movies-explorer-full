import React, { useState, useEffect } from 'react';
import movieApi from '../../utils/MoviesApi';
import Search from '../../utils/Search';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import { nothingToShowText } from '../../utils/constants';

export default function Movies(props) {
  // Destructuring props
  const {
    savedMovies,
    onButtonClick,
    isLoading,
    setIsLoading,
    error,
    setError,
  } = props;

  // State variables
  const [isInitialState, setIsInitialState] = useState(true);
  const [fetchedMovies, setFetchedMovies] = useState([]);
  const [foundMovies, setFoundMovies] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [selectShortMovies, setSelectShortMovies] = useState(false);
  const [moviesToRender, setMoviesToRender] = useState([]);
  const [inputDisabled, setInputDisabled] = React.useState(false);

  // Create a new Search instance with storage capability
  const search = new Search({ storageNeeded: true });

  // Function to fetch movies from an API
  function handleGetMovies() {
    return movieApi
      .fetchMovies()
      .catch((err) => {
        setError(err.message);
      });
  }

  // Function to handle movie search
  function handleMoviesSearch(searchKey, shortMoviesOnly) {
    setIsInitialState(false);
    setInputDisabled(true);

    if (fetchedMovies.length === 0) {
      setIsLoading(true);
      handleGetMovies()
        .then((res) => {
          setFetchedMovies(res);
          return res;
        })
        .then((res) => {
          setFoundMovies(search.searchFilter(res, searchKey, shortMoviesOnly));
        })
        .finally(() => {
          setIsLoading(false);
          setInputDisabled(false);
        });
    } else {
      setFoundMovies(search.searchFilter(fetchedMovies, searchKey, shortMoviesOnly));
      setInputDisabled(false);
    }
  }

  // Effect to load the last search from local storage
  useEffect(() => {
    const lastSearch = JSON.parse(localStorage.getItem('lastSearch'));

    if (lastSearch) {
      const { searchKey, searchResults, shortMoviesOnly } = lastSearch;
      setSearchValue(searchKey);
      setSelectShortMovies(shortMoviesOnly);
      setFoundMovies(searchResults);
    }
  }, []);

  // Effect to update the movies to render based on select short movies checkbox
  useEffect(() => {
    setMoviesToRender(
      selectShortMovies ? foundMovies.filter((movie) => movie.duration <= 40) : foundMovies,
    );
  }, [selectShortMovies, foundMovies]);

  return (
    <main className="movies">
      <SearchForm
        selectShortMovies={selectShortMovies}
        setSelectShortMovies={setSelectShortMovies}
        onSearchSubmit={handleMoviesSearch}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        disabled={inputDisabled}
      />

      {isLoading ? (
        <Preloader />
      ) : (
        <MoviesCardList
          moviesToRender={moviesToRender}
          savedMovies={savedMovies}
          onButtonClick={onButtonClick}
          isSavedMovies={false}
          nothingToShowText={
            isInitialState
              ? nothingToShowText.moviesInitial
              : nothingToShowText.movies
          }
          error={error}
        />
      )}
    </main>
  );
}
