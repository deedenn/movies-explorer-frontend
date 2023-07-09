import "./MoviesCardList.css";
import { useEffect, useState } from "react";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList() {

  return (
    <section className="movieslist">
      <ul className="movieslist__items"></ul>
      <button className="movieslist__morebtn link" type="button">
        Ещё
      </button>
    </section>
  );
}

export default MoviesCardList;