import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCastMovie } from "../../apiKey";
import toast from "react-hot-toast";
import css from "./MovieCast.module.css";

const MovieCast = () => {
  const { moviesID } = useParams();
  const [movies, setMovie] = useState([]);

  useEffect(() => {
    try {
      const queryMovie = async () => {
        const {
          data: { cast },
        } = await getCastMovie(moviesID);

        setMovie(cast);
      };

      queryMovie();
    } catch (error) {
      toast.error(error);
    }
  }, [moviesID]);

  return (
    <div>
      {movies.length ? (
        <ul className={css.actor_list}>
          {movies.map((item, index) => (
            <li key={index}>
              <div className={css.actor_container}>
                <p>
                  <strong>Role:</strong> {item.character} -{" "}
                  <strong>Actor:</strong> {item.name}
                </p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className={css.reviews_error}>No information about actors</p>
      )}
    </div>
  );
};

export default MovieCast;
