import { NavLink, useLocation } from "react-router-dom";
import css from "./MovieList.module.css";

const MovieList = ({ movies }) => {
  const location = useLocation();

  return (
    <ul className={css.movie_list}>
      {movies.map((item, index) => (
        <li key={item.id}>
          <NavLink
            to={`/movies/${item.id}`}
            className={css.movie_link}
            state={location}
          >
            {index + 1}. <span className={css.title}>{item.title}</span>
          </NavLink>
        </li>
      ))}
    </ul>
  );
};

export default MovieList;
