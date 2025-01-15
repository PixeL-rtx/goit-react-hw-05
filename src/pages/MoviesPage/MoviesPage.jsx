import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { searchMovieOnKeyWord } from "../../apiKey";
import css from "./MoviesPage.module.css";
import Loader from "../../Loader/Loader";
import toast from "react-hot-toast";
import MovieList from "../../components/MovieList/MovieList";

const MoviesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const query = searchParams.get("query") || "";

  useEffect(() => {
    if (!query) return;
    setLoading(true);
    setError(null);

    const searchMovie = async () => {
      try {
        const { data } = await searchMovieOnKeyWord(query);
        setMovies(data.results);
      } catch (err) {
        setError("Failed to fetch movies. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    searchMovie();
  }, [query]);

  const handleSearch = (e) => {
    e.preventDefault();
    const form = e.target;
    const searchQuery = form.elements.query.value.trim();

    if (searchQuery === "") {
      toast.error("Please enter a valid search query.");
      return;
    }

    setSearchParams({ query: searchQuery });
    form.reset();
  };

  return (
    <div className={css.container}>
      <form onSubmit={handleSearch} className={css.form}>
        <input
          type="text"
          name="query"
          placeholder="Search for movies..."
          className={css.field}
        />
        <button type="submit" className={css.subbtn}>
          Search
        </button>
      </form>

      {loading && <Loader />}
      {error && <p className={css.error}>{error}</p>}
      {!loading && !error && movies.length === 0 && query && (
        <p className={css.no_results}>No movies found for "{query}"</p>
      )}

      {!loading && !error && movies.length > 0 && <MovieList movies={movies} />}
    </div>
    // <div className={css.container}>
    //   <form onSubmit={handleSearch} className={css.form}>
    //     <input
    //       type="text"
    //       name="query"
    //       placeholder="Search for movies..."
    //       className={css.field}
    //     />
    //     <button type="submit" className={css.subbtn}>
    //       Search
    //     </button>
    //   </form>

    //   {loading && <Loader />}
    //   {error && <p className={css.error}>{error}</p>}
    //   {!loading && !error && movies.length === 0 && query && (
    //     <p className={css.no_results}>No movies found for "{query}"</p>
    //   )}

    //   <ul className={css.movie_list}>
    //     {movies.map((movie) => (
    //       <li key={movie.id} className={css.movie_item}>
    //         <img
    //           src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
    //           alt={movie.title}
    //           className={css.movie_image}
    //         />
    //         <p>{movie.title}</p>
    //       </li>
    //     ))}
    //   </ul>
    // </div>
  );
};

export default MoviesPage;
