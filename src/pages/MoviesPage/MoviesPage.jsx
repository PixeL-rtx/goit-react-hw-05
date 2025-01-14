import { Formik, Form, Field } from "formik";
import css from "./MoviesPage.module.css";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import MovieList from "../../components/MovieList/MovieList";
import { searchMovieOnKeyWord } from "../../apiKey";
import { useSearchParams } from "react-router-dom";

const MoviesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const movie = searchParams.get("movie") ?? "";
  const [query, setQuery] = useState(movie);
  const [dataMovie, setDataMovie] = useState([]);

  const initialValues = {
    movieQuery: movie,
  };

  useEffect(() => {
    try {
      const searchMovie = async () => {
        if (!query) return;
        const { data } = await searchMovieOnKeyWord(query);

        setDataMovie(data.results);
      };

      searchMovie();
    } catch (error) {
      toast.error(error);
    }
  }, [query]);

  const handleSubmit = (values) => {
    if (!values.movieQuery) {
      toast.error("Field is empty, please enter your query...");
      return;
    }
    setQuery(values.movieQuery);
    setSearchParams({ movie: values.movieQuery });
  };

  return (
    <div>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <Form className={css.form}>
          <Field
            className={css.field}
            type="text"
            name="movieQuery"
            placeholder="Enter movie title"
          />
          <button className={css.subbtn} type="submit">
            Search
          </button>
        </Form>
      </Formik>

      {dataMovie && <MovieList movies={dataMovie} />}
    </div>
  );
};

export default MoviesPage;
