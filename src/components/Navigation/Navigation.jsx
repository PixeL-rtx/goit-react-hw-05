// import { NavLink } from "react-router-dom";
// import css from "./Navigation.module.css";
// import clsx from "clsx";

// const Navigation = () => {
//   const linkActiveStyle = ({ isActive }) => {
//     return clsx(css.link, isActive && css.active);
//   };

//   return (
//     <nav className={css.navigation}>
//       <NavLink to="/" className={linkActiveStyle}>
//         Home
//       </NavLink>
//       <NavLink to="/movies" className={linkActiveStyle}>
//         Movies
//       </NavLink>
//     </nav>
//   );
// };

// export default Navigation;

/////////////////

import { NavLink } from "react-router-dom";
import css from "./Navigation.module.css";
import clsx from "clsx";

const Navigation = () => {
  const linkActiveStyle = ({ isActive }) => {
    return clsx(css.link, isActive && css.active);
  };

  return (
    <nav className={css.navigation}>
      <NavLink to="/" className={linkActiveStyle}>
        Home
      </NavLink>
      <NavLink to="/movies" className={linkActiveStyle}>
        Movies
      </NavLink>
    </nav>
  );
};

export default Navigation;
