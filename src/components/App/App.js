import React from 'react';
import './App.css';

import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import NotFound from '../NotFound/NotFound';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import Auth from '../../utils/api/auth';
import MainApi from '../../utils/api/MainApi';
import MoviesApi from '../../utils/api/MoviesApi';

function App() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = React.useState({});
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [movies, setMovies] = React.useState([]);
  const [serverError, setServerError] = React.useState({});
  const [isOkRequest, setIsOkRequest] = React.useState(false);
  const [isMoviesError, setIsMoviesError] = React.useState(false);
  const [favoriteMovies, setFavoriteMovies] = React.useState([]);

  // блок подключения к апи

  const auth = new Auth({
    baseUrl: 'http://localhost:3001',
  });

  const mainApi = new MainApi({
    url: 'http://localhost:3001',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });

  const moviesApi = new MoviesApi({
    url: 'https://api.nomoreparties.co/beatfilm-movies',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // блок авторизация

  //проверка токена
  React.useEffect(() => {
    const jwt = localStorage.getItem('token');
    if (jwt) {
      auth
        .checkToken()
        .then((res) => {
          setLoggedIn(true);
          navigate(pathname);
        })
        .catch((err) => {
          console.log(`${err}`);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //регистрация
  const onRegister = (values) => {
    auth
      .register(values.name, values.email, values.password)
      .then(() => {
        onLogin(values);
      })
      .catch((err) => {
        console.log(`${err}`);
        setServerError(err);
      });
  };

  // логин
  const onLogin = (values) => {
    auth
      .authorization(values.email, values.password)
      .then((data) => {
        if (data.token) {
          setLoggedIn(true);
          navigate('/movies', { replace: true });
        }
      })
      .catch((err) => {
        console.log(`${err}`);
        setServerError(err);
      });
  };

  // выход
  const onSignOut = () => {
    localStorage.removeItem('token');
    navigate('/', { replace: true });
    setLoggedIn(false);
  };

  React.useEffect(() => {
    loggedIn &&
      Promise.all([
        mainApi.getUserInfo(),
        moviesApi.getAllMovies(),
        mainApi.getSavedMovies(),
      ])
        .then(([userData, initialMovies, savedArray]) => {
          setCurrentUser(userData);
          setMovies(initialMovies);
          setIsMoviesError(false);
          setFavoriteMovies(savedArray);
          localStorage.setItem('savedMoviesArray', JSON.stringify(savedArray));
        })
        .catch((err) => {
          console.error(`Ошибка: ${err}`);
          setIsMoviesError(true);
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedIn]);

  //обновление данных пользователя
  const handleUpdateUser = (data) => {
    mainApi
      .updateUserInfo(data)
      .then((data) => {
        console.log('data update:', data);
        setCurrentUser(data);
        setIsOkRequest(true);
      })
      .catch((err) => {
        console.error(`${err}`);
        setServerError(err);
        setIsOkRequest(false);
      });
  };

  // добавление и удаление фильмов

  const handleToggleLikeMovie = (movie, isLiked, id) => {
    if (isLiked) {
      handleRemoveMovie(id);
    } else {
      mainApi
        .saveMovie(movie)
        .then((newLikedMovie) => {
          setFavoriteMovies([...favoriteMovies, newLikedMovie]);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  const handleRemoveMovie = (id) => {
    mainApi
      .deleteMovie(id)
      .then(() => {
        setFavoriteMovies(favoriteMovies.filter((m) => m._id !== id));
      })
      .catch((err) => {
        console.error(`Ошибка: ${err}`);
      });

    //чтобы корректно удалялась карточка из избранного массива
    const filteredFavoriteMovies = JSON.parse(
      localStorage.getItem('searchedMoviesFavorite'),
    );

    if (filteredFavoriteMovies) {
      const newFilteredFavoriteMoviesArr = filteredFavoriteMovies.filter(
        (movie) => movie._id !== id,
      );

      localStorage.setItem(
        'searchedMoviesFavorite',
        JSON.stringify(newFilteredFavoriteMoviesArr),
      );
    }
  };

  const localFavoriteMovies = localStorage.getItem('savedMoviesArray');

  React.useEffect(() => {
    if (localFavoriteMovies) {
      setFavoriteMovies(JSON.parse(localFavoriteMovies));
    }
  }, [localFavoriteMovies]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <div className="page">
          {pathname === '/' ||
            pathname === '/movies' ||
            pathname === '/saved-movies' ||
            pathname === '/profile' ? (
            <Header loggedIn={loggedIn} />
          ) : null}
          <main className="main">
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/movies" element={
                <ProtectedRoute
                  element={Movies}
                  loggedIn={loggedIn}
                  movies={movies}
                  favoriteMovies={favoriteMovies}
                  onToggleLike={handleToggleLikeMovie}
                  moviesError={isMoviesError}
                />
              } />
              <Route path="/saved-movies" element={
                <ProtectedRoute
                  element={SavedMovies}
                  loggedIn={loggedIn}
                  onRemoveMovie={handleRemoveMovie}
                  favoriteMovies={favoriteMovies}
                />
              }
              />
              <Route path="/profile" element={
                <ProtectedRoute
                  element={Profile}
                  onSignOut={onSignOut}
                  onUpdateProfile={handleUpdateUser}
                  loggedIn={loggedIn}
                  isOkRequest={isOkRequest}
                />
              } />
              <Route path="/signup" element={<Register
                onRegister={onRegister}
                loggedIn={loggedIn}
                serverError={serverError}
              />} />
              <Route path="/signin" element={<Login
                onLogin={onLogin}
                loggedIn={loggedIn}
                serverError={serverError}
              />} />
              <Route path="*" element={<NotFound loggedIn={loggedIn} />} />
            </Routes>
          </main>
          {pathname === '/' ||
            pathname === '/movies' ||
            pathname === '/saved-movies' ? (
            <Footer />
          ) : null}
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}
export default App;