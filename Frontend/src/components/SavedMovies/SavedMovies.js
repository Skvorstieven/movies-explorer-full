import React, { useState, useEffect } from 'react';

import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

import Search from '../../utils/Search';

import { nothingToShowText } from '../../utils/constants';

export default function Movies(props) {
  // Destructure props
  const {
    savedMovies,
    onButtonClick,
    error,
  } = props;

  // State variables
  const [searchValue, setSearchValue] = useState('');
  const [selectShortMovies, setSelectShortMovies] = useState(false);
  const [foundMovies, setFoundMovies] = useState([]);
  const [moviesToRender, setMoviesToRender] = useState([]);

  // Create a new Search instance
  const search = new Search({ storageNeeded: false });

  // Effect to populate foundMovies with savedMovies on component mount
  useEffect(() => {
    setFoundMovies(savedMovies);
  }, [savedMovies]);

  // Function to handle saved movie search
  function handleSavedMoviesSearch(searchKey, shortMoviesOnly) {
    setFoundMovies(search.searchFilter(savedMovies, searchKey, shortMoviesOnly));
  }

  // Effect to update moviesToRender based on selectShortMovies and foundMovies
  useEffect(() => {
    setMoviesToRender(
      selectShortMovies ? foundMovies.filter((movie) => movie.duration <= 40) : foundMovies,
    );
  }, [selectShortMovies, foundMovies]);

  // Function to handle the button click on a movie card
  function handleCardButtonClick(movie, isSaved) {
    onButtonClick(movie, isSaved);
    setFoundMovies(foundMovies.filter((item) => item !== movie));
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
      <MoviesCardList
        moviesToRender={moviesToRender}
        savedMovies={savedMovies}
        onButtonClick={handleCardButtonClick}
        nothingToShowText={nothingToShowText.savedMovies}
        isSavedMovies
        error={error}
      />
    </main>
  );
}
