import { useState, useRef } from "react";
import "react-dropdown/style.css";
import Select from "react-select";

const SubmitPage = ({ movies, setMovies }) => {
  const [movie, setMovie] = useState({
    name: "",
    releaseDate: "",
    actors: "",
    moviePoster: "",
    rating: "",
  });

  const ratingOptions = [
    { value: 0, label: "0" },
    { value: 0.5, label: "0.5" },
    { value: 1, label: "1" },
    { value: 1.5, label: "1.5" },
    { value: 2, label: "2" },
    { value: 2.5, label: "2.5" },
    { value: 3, label: "3" },
    { value: 3.5, label: "3.5" },
    { value: 4, label: "4" },
    { value: 4.5, label: "4.5" },
    { value: 5, label: "5" },
  ];

  let fileInput = useRef();
  let selectedInput = useRef();

  const changeUpdater = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setMovie({ ...movie, [name]: value });
  };

  const handleRating = (option, action) => {
    const name = action.name;
    setMovie({ ...movie, [name]: option.value });
    option.value = 0;
  };

  const fileSelector = (e) => {
    const name = "moviePoster";
    const objectUrl = URL.createObjectURL(e);
    setMovie({ ...movie, [name]: objectUrl });
    return () => URL.revokeObjectURL(objectUrl);
  };

  const submitData = (e) => {
    e.preventDefault();
    const formattedActors = movie.actors.split(",").map((actor) => {
      return actor.trim();
    });
    let submittedMovie = { ...movie, id: new Date().getTime().toString() };
    submittedMovie = { ...movie, actors: formattedActors };
    setMovies([...movies, submittedMovie]);
    setMovie({
      name: "",
      releaseDate: "",
      actors: "",
      moviePoster: "",
      rating: "",
    });
    fileInput.current.value = "";
  };
  return (
    <>
      <article className=" min-w-fit p-[50px] max-w-lg mx-auto border-2 mt-[20px] border-black rounded">
        <h1 className="text-xl my-[15px] underline">
          New movie submission form
        </h1>
        <form>
          <div className="shadow appearance-none border rounded w-full py-10 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
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
          </div>
          <div className="shadow appearance-none border rounded w-full py-10 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
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
          </div>
          <div className="shadow appearance-none border rounded w-full py-10 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
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
          </div>
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
                Rating (0-5):{" "}
              </label>
            </div>
            <Select
              ref={selectedInput}
              id="rating"
              name="rating"
              value={ratingOptions.value}
              onChange={handleRating}
              options={ratingOptions}
            />
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
