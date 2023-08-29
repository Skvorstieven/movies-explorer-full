import React, { useState, useEffect } from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';

import { MoviesAmount, PixelWindowWidth, ServerErrorMessage } from '../../utils/constants';

export default function MoviesCardList(props) {
  // Destructure props for readability
  const {
    moviesToRender,
    savedMovies,
    isSavedMovies,
    onButtonClick,
    NothingToShowText,
    error,
  } = props;

  // State to hold the movies to display
  const [loadedMovies, setLoadedMovies] = useState([]);

  // Function to calculate how many cards to show based on viewport width
  function calculateMoviesAmount() {
    if (window.innerWidth >= PixelWindowWidth.desktop) {
      return MoviesAmount.desktop;
    } if (window.innerWidth >= PixelWindowWidth.tablet) {
      return MoviesAmount.tablet;
    }
    return MoviesAmount.tablet;
  }

  // State for the number of loaded movies
  const [loadedMoviesAmount, setLoadedMoviesAmount] = useState(calculateMoviesAmount());

  // Handler for the "Load More" button
  function onLoadMore() {
    setLoadedMoviesAmount(loadedMoviesAmount + calculateMoviesAmount());
  }

  // Update loaded movies whenever moviesToRender or loadedMoviesAmount changes
  useEffect(() => {
    const newLoadedMovies = moviesToRender.slice(0, loadedMoviesAmount);
    setLoadedMovies(newLoadedMovies);
  }, [moviesToRender, loadedMoviesAmount]);

  // Update loadedMoviesAmount when viewport width changes and set loaded movies accordingly
  useEffect(() => {
    function handleResize() {
      const newAmount = calculateMoviesAmount();
      setLoadedMoviesAmount(newAmount);
    }

    // Add event listener for viewport width changes
    window.addEventListener('resize', handleResize);

    // Remove event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="movies-card-list">
      {moviesToRender.length !== 0 ? (
        <ul className="movies-card-list__list">
          {loadedMovies.map((movie) => (
            <MoviesCard
              key={movie.movieId}
              movie={movie}
              savedMovies={savedMovies}
              isSavedMovies={isSavedMovies}
              onButtonClick={onButtonClick}
            />
          ))}
        </ul>
      ) : (
        <p className="movies-card-list__not-found-message">
          {error
            ? ServerErrorMessage
            : NothingToShowText}
        </p>
      )}
      {/* Show "Load More" button if there are more movies to load */}
      {loadedMoviesAmount <= moviesToRender.length && (
        <button className="movies-card-list__button" type="button" onClick={onLoadMore}>
          Ещё
        </button>
      )}
    </div>
  );
}
