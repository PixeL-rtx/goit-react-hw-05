import css from "/src/App.module.css";
import { Route, Routes, NavLink } from "react-router-dom";
import clsx from "clsx";
import { lazy, Suspense } from "react";
import Loader from "./Loader/Loader.jsx";

const HomePage = lazy(() => import("./Pages/HomePage/HomePage.jsx"));
const MoviesPage = lazy(() => import("./Pages/MoviesPage/MoviesPage.jsx"));
const NotFoundPage = lazy(() =>
  import("./Pages/NotFoundPage/NotFoundPage.jsx")
);
const MovieDetailsPage = lazy(() =>
  import("./Pages/MovieDetailsPage/MovieDetailsPage.jsx")
);
const MovieCast = lazy(() => import("./components/MovieCast/MovieCast.jsx"));
const MovieReviews = lazy(() =>
  import("./components/MovieReviews/MovieReviews.jsx")
);

function App() {
  const linkActiveStyle = ({ isActive }) => {
    return clsx(css.link, isActive && css.active);
  };
  return (
    <div className="AllContainer">
      <Suspense fallback={<Loader />}>
        <nav>
          <NavLink to="/" className={linkActiveStyle}>
            Home
          </NavLink>
          <NavLink to="/movies" className={linkActiveStyle}>
            Movies
          </NavLink>
        </nav>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/movies/:moviesID" element={<MovieDetailsPage />}>
            <Route path="cast" element={<MovieCast />} />
            <Route path="reviews" element={<MovieReviews />} />
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </div>
  );
}
export default App;
