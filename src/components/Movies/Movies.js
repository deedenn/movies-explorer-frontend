import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import moviesData from "../../utils/moviesData";

function Movies() {
  return (
    <main className="movies">
      <SearchForm />
      <MoviesCardList movies={moviesData} />
    </main>
  );
}

export default Movies;