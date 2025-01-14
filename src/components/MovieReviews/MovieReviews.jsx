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

//////////////////////////////////////

// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { getReviewsMovie } from "../../apiKey";
// import css from "./MovieReviews.module.css";
// import Loader from "../../Loader/Loader";
// import toast from "react-hot-toast";

// const MovieReviews = () => {
//   const { moviesId } = useParams();
//   console.log(moviesId);
//   const [reviews, setReviews] = useState([]);
//   const [loader, setLoader] = useState(false);

//   useEffect(() => {
//     const queryReviews = async () => {
//       try {
//         setLoader(true);
//         const {
//           data: { results },
//         } = await getReviewsMovie(moviesId);
//         setReviews(reviews);
//       } catch (error) {
//         toast.error(error);
//       } finally {
//         setLoader(false);
//       }
//     };

//     queryReviews();
//   }, [moviesId]);

//   if (loader) {
//     return <Loader />;
//   }

//   if (reviews.length === 0) {
//     return (
//       <p className={css.no_reviews}>No reviews available for this movie.</p>
//     );
//   }

//   return (
//     <div>
//       {loader && <p className={css["no-reviews-err"]}>Wait...</p>}
//       <ul className={css.reviews_list}>
//         {reviews.map((review) => (
//           <li key={review.id} className={css.review_item}>
//             <h3 className={css.author}>{review.author}</h3>
//             <p className={css.content}>{review.content}</p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default MovieReviews;

///////////////////////////////

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
