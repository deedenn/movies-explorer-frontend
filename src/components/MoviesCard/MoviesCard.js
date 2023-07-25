import "./MoviesCard.css";
import { useLocation, Link } from 'react-router-dom';
import { useState } from "react";
import { BASE_IMG_LINK } from '../../utils/constants';
import { timeConverter } from '../../utils/timeConverter';

function MoviesCard({ movie, favoriteMovies, onToggleLike, onRemoveMovie }) {
  const location = useLocation();
  const path = location.pathname;

   const likedMovie = favoriteMovies
    ? favoriteMovies.find((item) => item.movieId === movie.id)
    : '';

  // Есть ли у карточки лайк
  const isLiked = favoriteMovies
    ? favoriteMovies.some((i) => i.movieId === movie.id)
    : false;

  const handleLikeClick = () => {
    onToggleLike(movie, isLiked, likedMovie?._id);
  };

  const handleDeleteClick = () => {
    onRemoveMovie(movie._id);
  };

  return (
    <li className="moviesCard">
      <div className="moviesCard__header">
        <div className="moviesCard__container">
          <h2 className="moviesCard__title">{movie.nameRU}</h2>
          <p className="moviesCard__duration">{timeConverter(movie.duration)}</p>
        </div>
        {path === "/movies" && <button onClick={handleLikeClick} className={`moviesCard__btn ${isLiked && "moviesCard__btn_saved"} link`} type="button" alt="Like" />}
        {path === "/saved-movies" && (
          <button onClick={handleDeleteClick} className="moviesCard__btn moviesCard__btn-delete" type="button" />
        )}
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