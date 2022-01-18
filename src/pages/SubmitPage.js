import { useState, useEffect } from "react";

const SubmitPage = () => {
  const [movies, setMovies] = useState([]);
  // useEffect(() => {
  //   fetch("./movies.json")
  //     .then((response) => response.json())
  //     .then(setMovies);
  // }, []);
  const [movie, setMovie] = useState({
    name: "",
    releaseDate: "",
    actors: "",
    moviePoster: "",
    rating: "",
  });

  const changeUpdater = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setMovie({ ...movie, [name]: value });
  };

  const submitData = (e) => {
    e.preventDefault();
    const submittedMovie = { ...movie, id: new Date().getTime.toString() };
    setMovies([...movies, submittedMovie]);
    setMovie({
      name: "",
      releaseDate: "",
      actors: "",
      moviePoster: "",
      rating: "",
    });
    console.log(movies);
  };
  return (
    <>
      <div>Submit Page</div>
      <article>
        <form>
          <div className="my-10">
            ----
            <label htmlFor="name">Movie title : </label>
            <input
              type="text"
              id="name"
              name="name"
              value={movie.name}
              onChange={changeUpdater}
            />
          </div>
          <div className="my-10">
            ----
            <label htmlFor="releaseDate">Release date : </label>
            <input
              type="text"
              id="releaseDate"
              name="releaseDate"
              value={movie.releaseDate}
              onChange={changeUpdater}
            />
          </div>
          <div className="my-10">
            ----
            <label htmlFor="actors">Actors : </label>
            <input
              type="text"
              id="actors"
              name="actors"
              value={movie.actors}
              onChange={changeUpdater}
            />
          </div>
          <div className="my-10">
            ----
            <label htmlFor="moviePoster">Movie Poster : </label>
            <input
              type="text"
              id="moviePoster"
              name="moviePoster"
              value={movie.moviePoster}
              onChange={changeUpdater}
            />
          </div>
          <div className="my-10">
            ----
            <label htmlFor="rating">Rating : </label>
            <input
              type="text"
              id="rating"
              name="rating"
              value={movie.rating}
              onChange={changeUpdater}
            />
          </div>
          <button type="submit" onClick={submitData}>
            Add movie
          </button>
        </form>
      </article>
    </>
  );
};

export default SubmitPage;
