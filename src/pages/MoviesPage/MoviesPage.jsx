// import { Formik, Form, Field } from "formik";
// import css from "./MoviesPage.module.css";
// import toast from "react-hot-toast";
// import { useEffect, useState } from "react";
// import MovieList from "../../components/MovieList/MovieList";
// import { searchMovieOnKeyWord } from "../../apiKey";
// import { useSearchParams } from "react-router-dom";

// const MoviesPage = () => {
//   const [searchParams, setSearchParams] = useSearchParams();
//   const movie = searchParams.get("movie") ?? "";
//   const [query, setQuery] = useState(movie);
//   const [dataMovie, setDataMovie] = useState([]);

//   const initialValues = {
//     movieQuery: movie,
//   };

//   useEffect(() => {

//     try {
//       const searchMovie = async () => {

//         const { data } = await searchMovieOnKeyWord(query);

//         setDataMovie(data.results);
//       };

//       searchMovie();
//     } catch (error) {
//       toast.error(error);
//     }
//   }, [query]);

//   const handleSubmit = (values) => {
//     if (!values.movieQuery) {
//       toast.error("Field is empty, please enter your query...");
//       return;
//     }
//     setQuery(values.movieQuery);
//     setSearchParams({ movie: values.movieQuery });
//   };

//   return (
//     <div>
//       <Formik initialValues={initialValues} onSubmit={handleSubmit}>
//         <Form className={css.form}>
//           <Field
//             className={css.field}
//             type="text"
//             name="movieQuery"
//             placeholder="Enter movie title"
//           />
//           <button className={css.subbtn} type="submit">
//             Search
//           </button>
//         </Form>
//       </Formik>

//       {dataMovie && <MovieList movies={dataMovie} />}
//     </div>
//   );
// };

import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { searchMovie } from "../../apiKey";
import css from "./MoviesPage.module.css";
import Loader from "../../Loader/Loader";
import toast from "react-hot-toast";

const MoviesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const query = searchParams.get("query") || "";

  useEffect(() => {
    if (!query) return;

    const searchMovie = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data } = await searchMovie(query);
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
      <form onSubmit={handleSearch} className={css.search_form}>
        <input
          type="text"
          name="query"
          placeholder="Search for movies..."
          className={css.input}
        />
        <button type="submit" className={css.button}>
          Search
        </button>
      </form>

      {loading && <Loader />}
      {error && <p className={css.error}>{error}</p>}
      {!loading && !error && movies.length === 0 && query && (
        <p className={css.no_results}>No movies found for "{query}"</p>
      )}

      <ul className={css.movie_list}>
        {movies.map((movie) => (
          <li key={movie.id} className={css.movie_item}>
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className={css.movie_image}
            />
            <p>{movie.title}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MoviesPage;
