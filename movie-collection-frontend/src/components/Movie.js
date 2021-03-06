import React from "react";
import PrettyRating from "pretty-rating-react";
import { faStar, faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";
import { faStar as farStar } from "@fortawesome/free-regular-svg-icons";
const icons = {
  star: {
    complete: faStar,
    half: faStarHalfAlt,
    empty: farStar,
  },
};

const colors = {
  star: ["#d9ad26", "#d9ad26", "#434b4d"],
};

const Movie = ({ info, removeItem }) => {
  const { _id, name, releaseDate, actors, moviePoster, rating } = info;

  return (
    <>
      <div className=" max-w-md min-w-sm rounded overflow-hidden shadow-lg my-[25px] mx-[10px] border-2 border-black w-1/2 bg-gray-300">
        <img
          className="mx-auto my-[5px]"
          style={{ height: "250px" }}
          src={`./public/images/${moviePoster}`}
          alt={name}
        />
        <div className="px-6 py-4 ">
          <div className="font-bold text-xl mb-2">{name}</div>
          <p>Released: {releaseDate}</p>
          <p>Starring: {actors.join(", ")}</p>
          <PrettyRating
            value={rating}
            icons={icons.star}
            colors={colors.star}
          />
          <button
            className="transition duration-150 ease-in-out justify-center bg-gray-200 text-3xl text-purple-600 hover:bg-slate-700 hover:text-pink-800 rounded mt-2"
            onClick={() => {
              removeItem(_id);
            }}
          >
            Remove movie
          </button>
        </div>
      </div>
    </>
  );
};

export default Movie;
