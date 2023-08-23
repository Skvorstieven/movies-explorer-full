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

import { fetchedMovies, savedByUserMovies, user } from '../../utils/constants';
import mainApi from '../../utils/MainApi';

function App() {
  // Create states for curent user and authorization status
  const [currentUser, setCurrentUser] = React.useState(user);
  const [fullPageFormError, setFullPageFormError] = React.useState('');
  const [isAuthorized, setIsAuthorized] = React.useState(false);

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
        setFullPageFormError(err.message);
      });
  }

  React.useEffect(() => {
    mainApi.checkToken()
      .then((res) => {
        if (res.ok) {
          res.json().then((resData) => {
            handleLogin(resData);
          });
        }
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
        setFullPageFormError(err.message);
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
      <Movies moviesToRender={fetchedMovies} savedMovies={savedByUserMovies} />
      <Footer />
    </>
  );

  const savedMovies = (
    <>
      <Header isLanding={false} isAuthorized={isAuthorized} />
      <SavedMovies moviesToRender={savedByUserMovies} savedMovies={savedByUserMovies} />
      <Footer />
    </>
  );

  const profile = (
    <>
      <Header isLanding={false} isAuthorized={isAuthorized} />
      <Profile onLogoutClick={handleLogoutClick} />
    </>
  );

  const routes = [
    { path: '/', element: landing },
    { path: '/movies', element: movies },
    { path: '/saved-movies', element: savedMovies },
    { path: '/profile', element: profile },
    { path: '/signup', element: <Register onRegisterClick={handleRegisterClick} error={fullPageFormError} setError={setFullPageFormError} /> },
    { path: '/signin', element: <Login onLoginClick={handleLoginClick} error={fullPageFormError} setError={setFullPageFormError} /> },
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
