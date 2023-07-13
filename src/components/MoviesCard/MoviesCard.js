import "./MoviesCard.css";
import { useLocation } from "react-router-dom";
import { useState } from "react";

function MoviesCard() {
  const location = useLocation();
  const path = location.pathname;
  const [isSaved, setIsSaved] = useState(false);

  const saveMovies = () => {
    setIsSaved(!isSaved);
  };

  return (
    <li className="moviesCard">
      <div className="moviesCard__header">
        <div className="moviesCard__container">
          <h2 className="moviesCard__title">В погоне за Бенкси</h2>
          <p className="moviesCard__duration">27 минут</p>
        </div>
        {path === "/movies" && <button onClick={saveMovies} className={`moviesCard__btn ${isSaved && "moviesCard__btn_saved"} link`} type="button"></button>}
        {path === "/saved-movies" && <button className="moviesCard__btn_check moviesCard__btn_saved link" type="button"></button>}
      </div>
      <img className="moviesCard__img" src='https://i.ibb.co/6w1n7zk/pic-COLOR-pic-8.jpg' alt="В погоне за Бенкси" />

    </li>
  );
}

export default MoviesCard;