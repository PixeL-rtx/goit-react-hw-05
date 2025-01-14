import css from "./NotFoundPage.module.css";

const NotFoundPage = () => {
  return (
    <div className={css.error_container}>
      <h1>Ooops, page not found... Try again later!</h1>
      <img
        style={{ width: 100, height: 100 }}
        src="https://www.freeiconspng.com/thumbs/error-icon/error-icon-4.png"
        alt="error pictures"
      />
    </div>
  );
};

export default NotFoundPage;
