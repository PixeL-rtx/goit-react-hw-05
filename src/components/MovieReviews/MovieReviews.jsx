import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { getReviewsMovie } from "../../apiKey";
import css from "./MovieReviews.module.css";

const MovieReviews = () => {
  const { moviesId } = useParams();
  const [reviewMovie, setReviewMovie] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    const queryMovieReviews = async () => {
      try {
        setLoader(true);
        const {
          data: { results },
        } = await getReviewsMovie(moviesId);
        setReviewMovie(results);
      } catch (error) {
        toast.error(error);
      } finally {
        setLoader(false);
      }
    };
    queryMovieReviews();
  }, [moviesId]);

  return (
    <div>
      {loader && <p className={css["no-reviews-err"]}>Wait...</p>}
      <ul className={css["reviews-list"]}>
        {reviewMovie.map((item, index) => (
          <li key={index} className={css["reviews-item"]}>
            <h3>
              {index + 1}. User: {item.author}
            </h3>
            <p style={{ maxWidth: "95%" }}>{item.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieReviews;
