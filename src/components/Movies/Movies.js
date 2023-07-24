import React from 'react';
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from '../Preloader/Preloader';
import {
  SHORT_MOVIE_DURATION,
  MIN_ADDED_CARDS,
  MAX_ADDED_CARDS,
  SHOWED_CARDS_MIN,
  SHOWED_CARDS_MEDIUM,
  SHOWED_CARDS_MAX,
  WINDOW_WIDTH_MAX,
  WINDOW_WIDTH_MEDIUM,
} from '../../utils/constants';

function Movies({ movies, moviesError, favoriteMovies, onToggleFavorite }) {

  const [filteredMovies, setFilteredMovies] = React.useState([]);
  const [isChecked, setIsChecked] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [inputText, setInputText] = React.useState('');
  const [notFoundError, setNotFoundError] = React.useState(false);
  const [showApiError, setShowApiError] = React.useState(false);

  //Функция поиска
  const handleSearchChange = (e) => {
    e.preventDefault();

    setInputText(e.target.value);
  };

  //Функция чекбокса
  const handleCheckboxChange = () => {
    if (inputText !== '') {
      setIsChecked(!isChecked);
      handleFilterMovies(inputText, !isChecked);
    }
  };

  //Функция фильтр
  const handleFilterMovies = (inputValue, isCheckedState) => {
    localStorage.setItem('inputVal', JSON.stringify(inputValue));
    localStorage.setItem('checkboxState', JSON.stringify(isCheckedState));

    setNotFoundError(false);
    setIsLoading(true);

    //прелоадер
    setTimeout(() => {
      let newFilteredArray = [];

      if (isCheckedState) {
        newFilteredArray = movies.filter((movie) => {
          return (
            (movie.nameRU.toLowerCase().includes(inputValue.toLowerCase()) ||
              movie.nameEN.toLowerCase().includes(inputValue.toLowerCase())) &&
            movie.duration <= SHORT_MOVIE_DURATION
          );
        });
        setFilteredMovies(newFilteredArray);
        localStorage.setItem(
          'searchedMovies',
          JSON.stringify(newFilteredArray),
        );
      } else if (!isCheckedState) {
        newFilteredArray = movies.filter((movie) => {
          return (
            movie.nameRU.toLowerCase().includes(inputValue.toLowerCase()) ||
            movie.nameEN.toLowerCase().includes(inputValue.toLowerCase())
          );
        });
        setFilteredMovies(newFilteredArray);
        localStorage.setItem(
          'searchedMovies',
          JSON.stringify(newFilteredArray),
        );
      }

      if (moviesError) {
        setShowApiError(true);
      } else if (!moviesError) {
        setShowApiError(false);
      }

      if (newFilteredArray.length === 0) {
        setNotFoundError(true);
      }

      setIsLoading(false);
    }, 2000);
  };

  const searchedMovies = localStorage.getItem('searchedMovies');
  const localInputVal = localStorage.getItem('inputVal');
  const localCheckbox = localStorage.getItem('checkboxState');

  React.useEffect(() => {
    if (searchedMovies) {
      setFilteredMovies(JSON.parse(searchedMovies));
    }
    if (localCheckbox) {
      setIsChecked(JSON.parse(localCheckbox));
    }
    if (localInputVal) {
      setInputText(JSON.parse(localInputVal));
    }
  }, [searchedMovies, localCheckbox, localInputVal]);


  const [nextMovies, setNextMovies] = React.useState(0);
  const [screenWidth, setScreenWidth] = React.useState(window.innerWidth);

  //текущая ширина экрана
  const handleResize = React.useCallback(() => {
    setScreenWidth(window.innerWidth);
  }, []);

  React.useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [handleResize]);

  //рендер фильмов
  const renderMovies = React.useMemo(() => {
    const paginationCounter =
      screenWidth < WINDOW_WIDTH_MEDIUM
        ? SHOWED_CARDS_MIN
        : screenWidth < WINDOW_WIDTH_MAX
          ? SHOWED_CARDS_MEDIUM
          : SHOWED_CARDS_MAX;

    return filteredMovies.slice(0, paginationCounter + nextMovies);
  }, [nextMovies, screenWidth, filteredMovies]);

  const handleClickButtonMore = () => {
    if (screenWidth < WINDOW_WIDTH_MAX) {
      setNextMovies((prev) => prev + MIN_ADDED_CARDS);
    } else if (screenWidth >= WINDOW_WIDTH_MAX) {
      setNextMovies((prev) => prev + MAX_ADDED_CARDS);
    }
  };

  return (
    <section className="movies">
      <SearchForm
        onFilter={handleFilterMovies}
        checkboxChange={handleCheckboxChange}
        isChecked={isChecked}
        handleInputChange={handleSearchChange}
        inputValue={inputText}
      />

      {showApiError ? (
        <p className="movies__error">
          Во время запроса произошла ошибка. Возможно, проблема с соединением
          или сервер недоступен. Попробуйте ещё раз
        </p>
      ) : isLoading ? (
        <Preloader />
      ) : notFoundError ? (
        <p className="movies__not-found">Ничего не найдено</p>
      ) : (
        <MoviesCardList
          movies={movies}
          favoriteMovies={favoriteMovies}
          onToggleLike={onToggleFavorite}
          moviesError={moviesError}
        />
      )}

      <div className="movies__button-zone">
        {filteredMovies.length > renderMovies.length ? (
          <button
            onClick={handleClickButtonMore}
            className="movies__button"
            type="button">
            Ещё
          </button>
        ) : (
          ''
        )}
      </div>
    </section>
  );
}
export default Movies;