import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCastMovie } from "../../apiKey";
import toast from "react-hot-toast";
import css from "./MovieCast.module.css";

const MovieCast = () => {
  const { moviesId } = useParams();
  const [castMovie, setCastMovie] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    const queryMovieCast = async () => {
      try {
        setLoader(true);
        const {
          data: { cast },
        } = await getCastMovie(moviesId);

        setCastMovie(cast);
      } catch (error) {
        toast.error(error);
      } finally {
        setLoader(false);
      }
    };
    queryMovieCast();
  }, [moviesId]);

  return (
    <div>
      {loader && <p className={css.reviews_error}>Wait...</p>}
      {castMovie.length && (
        <ul className={css.actor_list}>
          {castMovie.map((item, index) => (
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
      )}
    </div>
  );
};

export default MovieCast;

// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { getCastMovie } from "../../apiKey";
// import toast from "react-hot-toast";
// import css from "./MovieCast.module.css";

// const MovieCast = () => {
//   const { moviesId } = useParams();
//   console.log(moviesId);
//   const [movies, setMovies] = useState([]);
//   const [loader, setLoader] = useState(false);

//   useEffect(() => {
//     const queryMovie = async () => {
//       try {
//         setLoader(true);
//         const {
//           data: { cast },
//         } = await getCastMovie(moviesId);

//         setMovies(cast);
//       } catch (error) {
//         toast.error(error);
//       } finally {
//         setLoader(false);
//       }
//     };
//     queryMovie();
//   }, [moviesId]);

//   return (
//     <div>
//       {loader && <p className={css.no_reviews_err}>Wait...</p>}
//       {movies.length && (
//         <ul className={css.actor_list}>
//           {movies.map((item, index) => (
//             <li key={index}>
//               <div className={css.actor_container}>
//                 <p>
//                   <strong>Role:</strong> {item.character} -{" "}
//                   <strong>Actor:</strong> {item.name}
//                 </p>
//               </div>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default MovieCast;
