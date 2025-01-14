// import css from "./HomePage.module.css";
// import { getMovies } from "../../apiKey";
// import { useEffect, useState } from "react";
// import MovieList from "../../components/MovieList/MovieList";

// const HomePage = () => {
//   const [movies, setMovies] = useState([]);

//   useEffect(() => {
//     const fetchMovies = async () => {
//       const { results } = await getMovies();
//       setMovies(results);
//     };
//     fetchMovies();
//   }, []);
//   return (
//     <div>
//       <h1 className={css.title}>Trending movies for today</h1>

//       <MovieList movies={movies} />
//     </div>
//   );
// };

// export default HomePage;

import css from "./HomePage.module.css";
import { getMovies } from "../../api-query";
import { useEffect, useState } from "react";
import MovieList from "../../components/MovieList/MovieList";

const HomePage = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const { results } = await getMovies();
      setMovies(results);
    };
    fetchMovies();
  }, []);

  return (
    <div>
      <h1 className={css.title}>Trending movies for today</h1>

      <MovieList movies={movies} />
    </div>
  );
};

export default HomePage;
