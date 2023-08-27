import React, { useState, useEffect } from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';

export default function MoviesCardList(props) {
  // Destructure props for readability
  const {
    moviesToRender,
    savedMovies,
    isSavedMovies,
    onButtonClick,
    nothingToShowText,
    error,
  } = props;

  // State to hold the movies to display
  const [loadedMovies, setLoadedMovies] = useState([]);

  // Function to calculate how many cards to show based on viewport width
  function calculateMoviesAmount() {
    if (window.innerWidth >= 1280) {
      return 12;
    } if (window.innerWidth >= 768) {
      return 8;
    }
    return 5;
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
          {loadedMovies.map((movie) => {
            // Check if the movie is already saved
            const isAlreadySaved = savedMovies.some(
              (savedMovie) => savedMovie.movieId === movie.movieId,
            );
            return (
              <MoviesCard
                key={movie.movieId}
                movie={movie}
                isAlreadySaved={isAlreadySaved}
                isSavedMovies={isSavedMovies}
                onButtonClick={onButtonClick}
              />
            );
          })}
        </ul>
      ) : (
        <p className="movies-card-list__not-found-message">
          {error
            ? 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз'
            : nothingToShowText}
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
