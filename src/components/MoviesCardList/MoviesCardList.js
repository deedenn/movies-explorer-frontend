import "./MoviesCardList.css";
import { useEffect, useState } from "react";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({
  movies,
  onToggleLike,
  favoriteMovies,
  onRemoveMovie,
}) {
  return (
    <section className="movieslist">
      <ul className="movieslist__items">
        {movies.map((item) => {
          return (
            <MoviesCard
              onToggleLike={onToggleLike}
              favoriteMovies={favoriteMovies}
              onRemoveMovie={onRemoveMovie}
              movie={item}
              key={item.id}
            />
          );
        })}
      </ul>
    </section>
  );
}

export default MoviesCardList;