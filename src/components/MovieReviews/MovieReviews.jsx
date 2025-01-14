// import { useParams } from "react-router-dom";
// import { useState, useEffect } from "react";
// import toast from "react-hot-toast";
// import { getReviewsMovie } from "../../apiKey";
// import css from "./MovieReviews.module.css";

// const MovieReviews = () => {
//   const { moviesID } = useParams();
//   const [reviewsMovie, setReviewsMovie] = useState([]);

//   useEffect(() => {
//     try {
//       const queryReviews = async () => {
//         const {
//           data: { results },
//         } = await getReviewsMovie(moviesID);
//         setReviewsMovie(results);
//       };
//       queryReviews(results);
//     } catch (error) {
//       toast.error(error);
//     }
//   }, [moviesID]);

//   return (
//     <div>
//       {reviewsMovie.length ? (
//         <ul className={css.reviews_list}>
//           {reviewsMovie.map((item, index) => (
//             <li className={css.reviews_item} key={index}>
//               <h3>
//                 {index + 1}, User: {item.author}
//               </h3>
//               <p className={text_reviews}>{item.content}</p>
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p className={movie_reviews_error}>No information about reviews</p>
//       )}
//     </div>
//   );
// };

// export default MovieReviews;
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getReviewsMovie } from "../../apiKey";
import css from "./MovieReviews.module.css";
import Loader from "../../Loader/Loader";
import toast from "react-hot-toast";

const MovieReviews = () => {
  const { moviesID } = useParams();
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const queryReviews = async () => {
      setIsLoading(true);
      try {
        const { data } = await getReviewsMovie(moviesID);
        setReviews(reviews);
      } catch (error) {
        toast.error("Failed to load reviews");
      } finally {
        setIsLoading(false);
      }
    };

    queryReviews();
  }, [moviesID]);

  if (isLoading) {
    return <Loader />;
  }

  if (reviews.length === 0) {
    return (
      <p className={css.no_reviews}>No reviews available for this movie.</p>
    );
  }

  return (
    <ul className={css.reviews_list}>
      {reviews.map((review) => (
        <li key={review.id} className={css.review_item}>
          <h3 className={css.author}>{review.author}</h3>
          <p className={css.content}>{review.content}</p>
        </li>
      ))}
    </ul>
  );
};

export default MovieReviews;
