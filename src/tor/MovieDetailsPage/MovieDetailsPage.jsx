import { useEffect, useRef, useState } from "react";
import { NavLink, Outlet, useLocation, useParams } from "react-router-dom";
import { getMoviesInfo } from "../../apiKey";
import css from "./MovieDetailsPage.module.css";
import Loader from "../../Loader/Loader";
import toast from "react-hot-toast";

const MovieDetailsPage = () => {
  const { moviesID } = useParams();
  const [infoMovies, setInfoMovies] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const goBackRef = useRef(location.state ?? "/movies");

  useEffect(() => {
    const queryInfoMovie = async () => {
      setIsLoading(true);
      try {
        const { data } = await getMoviesInfo(moviesID.toString());
        setInfoMovies(data);
      } catch (error) {
        toast.error("Failed to load movie details");
      } finally {
        setIsLoading(false);
      }
    };

    queryInfoMovie();
  }, [moviesID]);

  if (isLoading) {
    return <Loader />;
  }

  if (!infoMovies) {
    return <p>Movie details not found</p>;
  }

  return (
    <div className="go_Back_container">
      <NavLink className={css.back} to={goBackRef.current}>
        Go Back
      </NavLink>

      <div className={css.details}>
        <div className={css.detail_item}>
          <img
            src={`https://image.tmdb.org/t/p/w500${infoMovies.poster_path}`}
            alt={`${infoMovies.title} poster`}
          />
          <div className={css.inf_container}>
            <h2>{infoMovies.title}</h2>
            <p>Rating: {infoMovies.vote_average}</p>
            <p>
              Duration: {Math.floor(infoMovies.runtime / 60)}h{" "}
              {infoMovies.runtime % 60}m
            </p>
            <h3>Overview</h3>
            <p>{infoMovies.overview}</p>
            <h3>Genres</h3>
            <div>
              {infoMovies.genres.map((genre) => (
                <p key={genre.id}>{genre.name}</p>
              ))}
            </div>
          </div>
        </div>
      </div>

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

// import { useEffect, useRef, useState } from "react";
// import {
//   NavLink,
//   Outlet,
//   useLocation,
//   useParams,
//   useSearchParams,
// } from "react-router-dom";
// import { getMoviesInfo } from "../../apiKey";
// import css from "./MovieDetailsPage.module.css";
// import Loader from "../../Loader/Loader";
// import toast from "react-hot-toast";

// const MovieDetailsPage = () => {
//   const { moviesID } = useParams();
//   const [infoMovies, setInfoMovies] = useState([]);
//   const [Loader, setLoader] = useState(false);
//   const location = useLocation();
//   const goBackRef = useRef(location.state ?? "/movies");

//   useEffect(() => {
//     const queryInfoMovie = async () => {
//       setLoader(true);
//        try {

//         const { data } = await getMoviesInfo(moviesID.toString());
//         setInfoMovies([data]);
//       };
//       queryInfoMovie();
//     } catch (error) {
//       toast.error(error);
//     } finally {
//       setLoader(false);
//     }
//   }, [moviesID]);
//   return (
//     <div className="go_Back_container">
//       <NavLink className={css.back} to={goBackRef.current}>
//         Go Back
//       </NavLink>
//       {<Loader />}

//       <ul className={css.details}>
//         {infoMovies.map((item) => (
//           <li key={item.id} className={detail_item}>
//             <img
//               src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
//               alt={`${item.title} poster`}
//             />{" "}
//             <div className={css.inf-container}>
//               <h2>{item.title}</h2>
//               <p>Rating: {item.vote_average}</p>
//               <p>
//                 Duration: {Math.floor(item.runtime / 60)}h. {item.runtime % 60}
//                 m.
//               </p>
//               <h3>Overview</h3>
//               <p>{item.overview}</p>
//               <h3>Genres</h3>
//               <div>
//                 {item.genres.map((item) => (
//                   <p key={item.id}>{item.name}</p>
//                 ))}
//               </div>
//             </div>
//           </li>
//         ))}
//       </ul>
//       <div className={css.more_inf_container}>
//         <NavLink to="cast" className={css.more_inf_link}>
//           Cast
//         </NavLink>
//         <NavLink to="reviews" className={css.more_inf_link}>
//           Reviews
//         </NavLink>
//       </div>
//       <Outlet />
//     </div>
//   );
// };
