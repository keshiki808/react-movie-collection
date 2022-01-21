import { useState, useRef } from "react";
import "react-dropdown/style.css";
import { useAlert } from "react-alert";
import TextForm from "../components/TextForm";

const SubmitPage = ({ movies, setMovies }) => {
  const alert = useAlert();
  const [movie, setMovie] = useState({
    id: "",
    name: "",
    releaseDate: "",
    actors: "",
    moviePoster: "",
    rating: "",
  });

  const ratingValues = [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5];

  let fileInput = useRef();

  const changeUpdater = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setMovie({ ...movie, [name]: value });
  };

  const fileSelector = (e) => {
    const name = "moviePoster";
    const objectUrl = URL.createObjectURL(e);
    setMovie({ ...movie, [name]: objectUrl });
    return () => URL.revokeObjectURL(objectUrl);
  };

  const submitData = (e) => {
    e.preventDefault();
    if (
      movie.name &&
      movie.releaseDate &&
      movie.actors &&
      movie.moviePoster &&
      movie.rating
    ) {
      const formattedActors = movie.actors.split(",").map((actor) => {
        return actor.trim();
      });
      const newMovieID = { ...movie, id: new Date().getTime().toString() };
      const newMovieComplete = { ...newMovieID, actors: formattedActors };
      setMovies([...movies, newMovieComplete]);
      setMovie({
        id: "",
        name: "",
        releaseDate: "",
        actors: "",
        moviePoster: "",
        rating: "",
      });
      fileInput.current.value = "";
      alert.success(<div style={{ color: "Green" }}>Movie submitted</div>);
    } else {
      alert.error(
        <div style={{ color: "Red" }}>Error: All fields must be filled out</div>
      );
    }
  };
  return (
    <>
      <article className=" min-w-fit p-[50px] max-w-lg mx-auto border-2 mt-[20px] border-black rounded-md bg-gray-300">
        <h1 className="text-xl my-[15px] underline">
          New movie submission form
        </h1>
        <form>
          <TextForm
            id="name"
            name="name"
            value={movie.name}
            onChangeHandler={changeUpdater}
            formTitle="Movie name"
          ></TextForm>
          {/* <div className="shadow appearance-none border rounded w-full py-10 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
            <div className="text-xl">
              <label htmlFor="name">Movie title : </label>
            </div>
            <input
              className="border-2 border-black"
              type="text"
              id="name"
              name="name"
              value={movie.name}
              onChange={changeUpdater}
            />
          </div> */}

          <TextForm
            id="releaseDate"
            name="releaseDate"
            value={movie.date}
            onChangeHandler={changeUpdater}
            formTitle="Release Date"
          ></TextForm>
          {/* <div className="shadow appearance-none border rounded w-full py-10 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
            <div>
              <label className="text-xl" htmlFor="releaseDate">
                Release date :{" "}
              </label>
            </div>
            <input
              className="border-2 border-black"
              type="text"
              id="releaseDate"
              name="releaseDate"
              value={movie.releaseDate}
              onChange={changeUpdater}
            />
          </div> */}
          <TextForm
            id="actors"
            name="actors"
            value={movie.actors}
            onChangeHandler={changeUpdater}
            formTitle="Actors (Separate with comma)"
          ></TextForm>
          {/* <div className="shadow appearance-none border rounded w-full py-10 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
            <div>
              <label className="text-xl" htmlFor="actors">
                Actors (Separate with comma):{" "}
              </label>
            </div>
            <input
              className="border-2 border-black"
              type="text"
              id="actors"
              name="actors"
              value={movie.actors}
              onChange={changeUpdater}
            />
          </div> */}
          <div className="shadow appearance-none border rounded w-full py-10 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
            <div className="mb-[8px]">
              <label className="text-xl underline" htmlFor="moviePoster">
                Movie Poster :{" "}
              </label>
            </div>
            <input
              type="file"
              id="moviePoster"
              name="moviePoster"
              ref={fileInput}
              onChange={() => fileSelector(fileInput.current.files[0])}
            />
          </div>
          <div className="shadow appearance-none border rounded w-full py-10 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
            <div>
              <label className="text-xl" htmlFor="rating">
                Rating :
              </label>
            </div>
            <div className=" text-lg text-purple-600">
              <select
                value={movie.rating}
                name="rating"
                id="rating"
                onChange={changeUpdater}
              >
                {ratingValues.map((rating) => {
                  return <option value={rating}>{rating}</option>;
                })}
              </select>
            </div>
          </div>

          <button
            className="p-[10px]  text-center bg-gray-200 text-3xl text-purple-600 hover:text-pink-800 rounded mt-5"
            type="submit"
            onClick={submitData}
          >
            Add movie
          </button>
        </form>
      </article>
    </>
  );
};

export default SubmitPage;
