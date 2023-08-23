// App module

import React from 'react';
import { useRoutes, useNavigate } from 'react-router-dom';

import './App.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Main from '../Main/Main';
import NotFound from '../NotFound/NotFound';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';

import CurrentUserContext from '../../contexts/CurrentUserContext';

import { fetchedMovies, user } from '../../utils/constants';
import mainApi from '../../utils/MainApi';

function App() {
  // Create states for curent user and authorization status
  const [currentUser, setCurrentUser] = React.useState(user);
  const [fetchError, setFetchError] = React.useState('');
  const [profileIsEditable, setProfileIsEditable] = React.useState(false);
  const [isAuthorized, setIsAuthorized] = React.useState(false);
  const [savedByUserMovies, setSavedByUserMovies] = React.useState([]);

  // Get navigate
  const navigate = useNavigate();

  // Create submit handlers for login, logut and registeration
  function handleLogoutClick() {
    mainApi.logout();
    setIsAuthorized(false);
  }

  function handleLogin(res) {
    setCurrentUser(res);
    setIsAuthorized(true);
    navigate('/', { replace: true });
  }

  function handleLoginClick(reqBody) {
    mainApi.authorize(reqBody)
      .then((res) => {
        handleLogin(res);
      })
      .catch((err) => {
        setFetchError(err.message);
      });
  }

  function handleTockenCheck(res) {
    if (res.ok) {
      res.json().then((resData) => {
        handleLogin(resData);
      });
    }
  }

  function handleGetSavedMovies() {
    mainApi.getSavedMovies()
      .then((res) => {
        setSavedByUserMovies(res);
      })
      .catch((err) => {
        setFetchError(err.message);
      });
  }

  function handleSaveMovie(movie) {
    mainApi.saveMovie(movie)
      .then(() => {
        handleGetSavedMovies();
      })
      .catch((err) => {
        setFetchError(err.message);
      });
  }

  function handleDeleteMovie(movie) {
    const savedMovieId = savedByUserMovies.find((item) => item.movieId === movie.movieId)._id;
    mainApi.deleteMovie(savedMovieId)
      .then(() => {
        setSavedByUserMovies(
          savedByUserMovies.filter((cardMovie) => cardMovie.movieId !== movie.movieId),
        );
      })
      .then(() => {
        handleGetSavedMovies();
      })
      .catch((err) => {
        setFetchError(err.message);
      });
  }

  function handleCardButtonClick(movie, isSaved) {
    if (isSaved) {
      handleDeleteMovie(movie);
    } else {
      handleSaveMovie(movie);
    }
  }

  React.useEffect(() => {
    mainApi.checkToken()
      .then((res) => {
        handleTockenCheck(res);
      })
      .then(() => {
        handleGetSavedMovies();
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log(err);
      });
  }, []);

  function handleRegister() {
    navigate('/', { replace: true });
  }

  function handleRegisterClick(reqBody) {
    mainApi.register(reqBody)
      .then(() => {
        handleRegister();
      })
      .catch((err) => {
        setFetchError(err.message);
      });
  }

  function handleUpdateUserClick(reqBody) {
    mainApi.updateUser(reqBody)
      .then((res) => {
        setProfileIsEditable(false);
        setCurrentUser(res);
      })
      .catch((err) => {
        setFetchError(err.message);
      });
  }

  // Create routes
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
        moviesToRender={fetchedMovies}
        savedMovies={savedByUserMovies}
        onButtonClick={handleCardButtonClick}
      />
      <Footer />
    </>
  );

  const savedMovies = (
    <>
      <Header isLanding={false} isAuthorized={isAuthorized} />
      <SavedMovies
        moviesToRender={savedByUserMovies}
        savedMovies={savedByUserMovies}
        onButtonClick={handleCardButtonClick}
      />
      <Footer />
    </>
  );

  const profile = (
    <>
      <Header isLanding={false} isAuthorized={isAuthorized} />
      <Profile
        onLogoutClick={handleLogoutClick}
        onUpdateUserClick={handleUpdateUserClick}
        isEditable={profileIsEditable}
        setIsEditable={setProfileIsEditable}
        error={fetchError}
        setError={setFetchError}
      />
    </>
  );

  const routes = [
    { path: '/', element: landing },
    { path: '/movies', element: movies },
    { path: '/saved-movies', element: savedMovies },
    { path: '/profile', element: profile },
    { path: '/signup', element: <Register onRegisterClick={handleRegisterClick} error={fetchError} setError={setFetchError} /> },
    { path: '/signin', element: <Login onLoginClick={handleLoginClick} error={fetchError} setError={setFetchError} /> },
    { path: '*', element: <NotFound /> },
  ];

  const element = useRoutes(routes);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      {element}
    </CurrentUserContext.Provider>
  );
}

export default App;
