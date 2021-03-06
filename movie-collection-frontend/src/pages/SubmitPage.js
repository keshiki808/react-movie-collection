import { useState, useRef } from "react";
import "react-dropdown/style.css";
import { useAlert } from "react-alert";
import TextForm from "../components/TextForm";
import RatingForm from "../components/RatingForm";
import axios from "axios";

const SubmitPage = ({ movies, setMovies, fetchData }) => {
  const alert = useAlert();
  const [movie, setMovie] = useState({
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
    const file = e.target.files[0];
    setMovie({ ...movie, [name]: file });
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
      const formData = new FormData();
      formData.append("name", movie.name);
      formData.append("releaseDate", movie.releaseDate);
      formData.append("actors", movie.actors);
      formData.append("file", movie.moviePoster);
      formData.append("rating", movie.rating);
      axios
        .post("/api/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((e) => {
          console.log("Upload successful");
        })
        .catch((e) => {
          console.error("Error", e);
        });
      setMovies([...movies, movie]);
      setMovie({
        name: "",
        releaseDate: "",
        actors: "",
        moviePoster: "",
        rating: "",
      });
      fileInput.current.value = "";

      fetchData();

      alert.success(<div style={{ color: "Green" }}>Movie submitted</div>);
    } else {
      alert.error(
        <div style={{ color: "Red" }}>Error: All fields must be filled out</div>
      );
    }
  };
  return (
    <>
      <article className=" min-w-fit border-2 py-[25px] mx-auto sm:max-w-screen-sm md:max-w-screen-md lg:max-w-5xl mt-[20px] border-black rounded-md bg-gray-300">
        <h1 className="text-xl my-[15px] underline">
          New movie submission form
        </h1>
        <form className="py-[25px] my-[25px]">
          <TextForm
            id="name"
            name="name"
            value={movie.name}
            onChangeHandler={changeUpdater}
            formTitle="Movie name"
          ></TextForm>
          <TextForm
            id="releaseDate"
            name="releaseDate"
            value={movie.releaseDate}
            onChangeHandler={changeUpdater}
            formTitle="Release Date"
          ></TextForm>
          <TextForm
            id="actors"
            name="actors"
            value={movie.actors}
            onChangeHandler={changeUpdater}
            formTitle="Actors (Separate with comma)"
          ></TextForm>
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
              onChange={fileSelector}
            />
          </div>
          <RatingForm
            defaultSelection="Choose a rating"
            name="rating"
            id="rating"
            value={movie.rating}
            changeHandler={changeUpdater}
            optionsArr={ratingValues}
          ></RatingForm>

          <button
            className="transition duration-150 ease-in-out p-[10px] text-center bg-gray-200 text-3xl text-purple-600 hover:bg-slate-700 hover:text-pink-800 rounded mt-5"
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
