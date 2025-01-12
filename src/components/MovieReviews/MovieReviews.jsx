import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { getCastMovie } from "../../apiKey";
import css from "./MovieReviews.module.css";

const MovieReviews = () => {
  const { moviesID } = useParams();
  const [reviewsMovie, setReviewsMovie] = useState([]);

  useEffect(() => {
    try {
      const queryReviews = async () => {
        const {
          data: { results },
        } = await getCastMovie(moviesID);
        setReviewsMovie(results);
      };
      queryReviews(results);
    } catch (error) {
      toast.error(error);
    }
  }, [moviesID]);

  return (
    <div>
      {reviewsMovie.length ? (
        <ul className={css.reviews_list}>
          {reviewsMovie.map((item, index) => (
            <li className={css.reviews_item} key={index}>
              <h3>
                {index + 1}, User: {item.author}
              </h3>
              <p className={text_reviews}>{item.content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className={movie_reviews_error}>No information about reviews</p>
      )}
    </div>
  );
};

export default MovieReviews;
