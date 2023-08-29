import React, { useState, useEffect } from 'react';
import { useRoutes, useNavigate } from 'react-router-dom';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Main from '../Main/Main';
import NotFound from '../NotFound/NotFound';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import CurrentUserContext from '../../contexts/CurrentUserContext';

import mainApi from '../../utils/MainApi';

import { ProfileUpdateSuccessMessageText } from '../../utils/constants';

function App() {
  // Create states to manage application data and UI states
  const [currentUser, setCurrentUser] = useState({});
  const [fetchError, setFetchError] = useState('');
  const [profileIsEditable, setProfileIsEditable] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [savedByUserMovies, setSavedByUserMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [profileUpdateSuccessMessage, setProfileUpdateSuccessMessage] = React.useState('');

  // Get the navigate function from react-router-dom
  const navigate = useNavigate();

  // Function to fetch and handle saved movies
  function handleGetSavedMovies() {
    mainApi
      .getSavedMovies()
      .then((res) => {
        setSavedByUserMovies(res);
      })
      .catch((err) => {
        setFetchError(err.message);
      });
  }

  // Functions to handle user login, logout, and registration
  function handleLogoutClick() {
    mainApi.logout()
      .then(() => {
        setIsAuthorized(false);
        setCurrentUser('');
        localStorage.clear();
      })
      .catch((err) => {
        setFetchError(err.message);
      });
  }

  function handleLogin(res) {
    setCurrentUser(res);
    setIsAuthorized(true);
  }

  function handleLoginClick(reqBody) {
    return mainApi
      .authorize(reqBody)
      .then((res) => {
        handleLogin(res);
      })
      .then(() => {
        navigate('/movies', { replace: true });
      })
      .catch((err) => {
        setFetchError(err.message);
      });
  }

  function handleTokenCheck(res) {
    if (res.ok) {
      res.json().then((resData) => {
        handleLogin(resData);
      });
    }
  }

  // Function to save a movie
  function handleSaveMovie(movie) {
    mainApi
      .saveMovie(movie)
      .then((res) => {
        setSavedByUserMovies([...savedByUserMovies, res]);
      })
      .catch((err) => {
        setFetchError(err.message);
      });
  }

  // Function to delete a saved movie
  function handleDeleteMovie(movie) {
    const savedMovieId = savedByUserMovies.find((item) => item.movieId === movie.movieId)._id;
    mainApi
      .deleteMovie(savedMovieId)
      .then(() => {
        setSavedByUserMovies(
          savedByUserMovies.filter((cardMovie) => cardMovie.movieId !== movie.movieId),
        );
      })
      .catch((err) => {
        setFetchError(err.message);
      });
  }

  // Function to handle the button click on a movie card
  function handleCardButtonClick(movie, isSaved) {
    if (isSaved) {
      handleDeleteMovie(movie);
    } else {
      handleSaveMovie(movie);
    }
  }

  // Function to handle user registration
  function handleRegisterClick(reqBody) {
    return mainApi
      .register(reqBody)
      .then(() => {
        handleLoginClick({ email: reqBody.email, password: reqBody.password });
      })
      .catch((err) => {
        setFetchError(err.message);
      });
  }

  // Function to handle user profile updates
  function handleUpdateUserClick(reqBody) {
    return mainApi
      .updateUser(reqBody)
      .then((res) => {
        setProfileIsEditable(false);
        setCurrentUser(res);
        setProfileUpdateSuccessMessage(ProfileUpdateSuccessMessageText);
      })
      .catch((err) => {
        setFetchError(err.message);
      });
  }

  // Use useEffect to check the user's token and fetch saved movies on component mount
  useEffect(() => {
    mainApi
      .checkToken()
      .then((res) => {
        handleTokenCheck(res);
      })
      .then(() => {
        handleGetSavedMovies();
      })
      .catch((err) => {
        setFetchError(err.message);
      });
  }, []);

  // Define different sections of the app as JSX elements
  const landing = (
    <>
      <Header isLanding isAuthorized={isAuthorized} />
      <Main />
      <Footer />
    </>
  );

  const movies = (
    <>
      <Header isLanding={false} isAuthorized={isAuthorized} />
      <Movies
        savedMovies={savedByUserMovies}
        onButtonClick={handleCardButtonClick}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        error={fetchError}
        setError={setFetchError}
      />
      <Footer />
    </>
  );

  const savedMoviesSection = (
    <>
      <Header isLanding={false} isAuthorized={isAuthorized} />
      <SavedMovies
        savedMovies={savedByUserMovies}
        onButtonClick={handleCardButtonClick}
        error={fetchError}
      />
      <Footer />
    </>
  );

  const profileSection = (
    <>
      <Header isLanding={false} isAuthorized={isAuthorized} />
      <Profile
        onLogoutClick={handleLogoutClick}
        onUpdateUserClick={handleUpdateUserClick}
        isEditable={profileIsEditable}
        setIsEditable={setProfileIsEditable}
        error={fetchError}
        setError={setFetchError}
        successMessage={profileUpdateSuccessMessage}
        setSuccessMessage={setProfileUpdateSuccessMessage}
      />
    </>
  );

  // Define the routes for the application
  const routes = [
    { path: '/', element: landing },
    { path: '/signup', element: <Register onRegisterClick={handleRegisterClick} error={fetchError} setError={setFetchError} /> },
    { path: '/signin', element: <Login onLoginClick={handleLoginClick} error={fetchError} setError={setFetchError} /> },
    { path: '/movies', element: <ProtectedRoute loggedIn={isAuthorized} element={movies} /> },
    { path: '/saved-movies', element: <ProtectedRoute loggedIn={isAuthorized} element={savedMoviesSection} /> },
    { path: '/profile', element: <ProtectedRoute loggedIn={isAuthorized} element={profileSection} /> },
    { path: '*', element: <NotFound /> },
  ];

  // Use the useRoutes hook to determine which route to render
  const element = useRoutes(routes);

  // Render the application wrapped in a context provider
  return (
    <CurrentUserContext.Provider value={currentUser}>
      {element}
    </CurrentUserContext.Provider>
  );
}

export default App;
