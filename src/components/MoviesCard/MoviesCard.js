import "./MoviesCard.css";
import { useLocation, Link } from 'react-router-dom';
import { useState } from "react";
import { BASE_IMG_LINK } from '../../utils/constants';
import { timeConverter } from '../../utils/timeConverter';

function MoviesCard({ movie, favoriteMovies, onToggleLike, onRemoveMovie }) {
  const location = useLocation();
  const path = location.pathname;

  //чтобы взять айди из бэкенда и прокинуть в функцию удаления
  const likedMovie = favoriteMovies
    ? favoriteMovies.find((item) => item.movieId === movie.id)
    : '';

  // Определяем, есть ли у карточки с фильмом уже лайк
  const isLiked = favoriteMovies
    ? favoriteMovies.some((i) => i.movieId === movie.id)
    : false;

  //Класс для лайка в отдельной переменной
  const cardLikeButtonClassName = `movies-card__icon ${isLiked ? 'movies-card__icon_active' : ''
    }`;

  const handleLikeClick = () => {
    onToggleLike(movie, isLiked, likedMovie?._id);
  };

  const handleDeleteClick = () => {
    onRemoveMovie(movie._id);
  };


  const [isSaved, setIsSaved] = useState(false);

  const saveMovies = () => {
    setIsSaved(!isSaved);
  };

  return (
    <li className="moviesCard">

      <div className="moviesCard__header">

        <div className="moviesCard__container">
          <h2 className="moviesCard__title">{movie.nameRU}</h2>
          <p className="moviesCard__duration">{timeConverter(movie.duration)}</p>
        </div>
        {path === "/movies" && <button onClick={saveMovies} className={`moviesCard__btn ${isSaved && "moviesCard__btn_saved"} link`} type="button"></button>}
        {path === "/saved-movies" && <button className="moviesCard__btn_check moviesCard__btn_saved link" type="button"></button>}
      </div>
      <Link
        className="moviesCard__trailer-link"
        to={movie.trailerLink}
        target="_blank">
        <img
          className="moviesCard__img" src={movie.image.url ? BASE_IMG_LINK + movie.image.url : movie.image} alt={movie.nameRU} />
      </Link>
    </li>
  );
}

export default MoviesCard;