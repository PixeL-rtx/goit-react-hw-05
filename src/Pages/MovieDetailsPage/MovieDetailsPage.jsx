import { useEffect, useRef, useState } from "react";
import {
  NavLink,
  Outlet,
  useLocation,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { getMoviesInfo } from "../../apiKey";
import css from "./MovieDetailsPage.module.css";
import Loader from "../../Loader/Loader";
import toast from "react-hot-toast";

const MovieDetailsPage = () => {
  const { moviesID } = useParams();
  const [infoMovies, setInfoMovies] = useState([]);
  const [Loader, setLoader] = useState(false);
  const location = useLocation();
  const goBackRef = useRef(location.state ?? "/movies");

  useEffect(() => {
    try {
      const queryInfoMovie = async () => {
        setLoader(true);
        const { data } = await getMoviesInfo(moviesID.toString());
        setInfoMovies([data]);
      };
      queryInfoMovie();
    } catch (error) {
      toast.error(error);
    } finally {
      setLoader(false);
    }
  }, [moviesID]);
  return (
    <div className="go_Back_container">
      <NavLink className={css.back} to={goBackRef.current}>
        Go Back
      </NavLink>
      {<Loader />}

      <ul className={css.details}>
        {infoMovies.map((item) => (
          <li key={item.id} className={detail_item}>
            <img
              src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
              alt={`${item.title} poster`}
            />{" "}
            <div className={css.inf - container}>
              <h2>{item.title}</h2>
              <p>Rating: {item.vote_average}</p>
              <p>
                Duration: {Math.floor(item.runtime / 60)}h. {item.runtime % 60}
                m.
              </p>
              <h3>Overview</h3>
              <p>{item.overview}</p>
              <h3>Genres</h3>
              <div>
                {item.genres.map((item) => (
                  <p key={item.id}>{item.name}</p>
                ))}
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className={css.more_inf_container}>
        <NavLink to="cast" className={css.more_inf_link}>
          Cast
        </NavLink>
        <NavLink to="reviews" className={css.more_inf_link}>
          Reviews
        </NavLink>
      </div>
      <Outlet />
    </div>
  );
};

export default MovieDetailsPage;
