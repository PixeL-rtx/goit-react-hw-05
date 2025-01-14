import { useEffect, useRef, useState } from "react";
import { NavLink, Outlet, useLocation, useParams } from "react-router-dom";
import { getInfMovie } from "../../apiKey";
import css from "./MovieDetailsPage.module.css";
import { Puff } from "react-loader-spinner";
import toast from "react-hot-toast";

const MovieDetailsPage = () => {
  const { moviesId } = useParams();
  const [infMovie, setInfMovie] = useState([]);
  const [loader, setLoader] = useState(false);
  const location = useLocation();
  const goBackRef = useRef(location.state ?? "/movies");

  useEffect(() => {
    try {
      const queryInfMovie = async () => {
        setLoader(true);
        const { data } = await getInfMovie(moviesId.toString());

        setInfMovie([data]);
      };
      queryInfMovie();
    } catch (error) {
      toast.error(error);
    } finally {
      setLoader(false);
    }
  }, [moviesId]);
  return (
    <div style={{ position: "relative" }}>
      <NavLink className={css.back} to={goBackRef.current}>
        Go back
      </NavLink>

      {loader && (
        <div className={css.loader}>
          <Puff height="80" width="80" color="#611f1f" visible={true} />
        </div>
      )}
      <ul className={css["details-list"]}>
        {infMovie.map((item) => (
          <li key={item.id} className={css["details-item"]}>
            <img
              src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
              alt={`${item.title} poster`}
              style={{ width: 350, height: 500, borderRadius: "15px" }}
            />
            <div className={css["inf-container"]}>
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
      <div className={css["more-inf-container"]}>
        <NavLink to="cast" className={css["more-inf-link"]}>
          Cast
        </NavLink>
        <NavLink to="reviews" className={css["more-inf-link"]}>
          Reviews
        </NavLink>
      </div>
      <Outlet />
    </div>
  );
};

export default MovieDetailsPage;
