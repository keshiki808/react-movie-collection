import React from "react";

const Movie = ({ info, removeItem }) => {
  const { id, name, releaseDate, actors, moviePoster, rating, removeMovie } =
    info;
  console.log(info);

  return (
    <div className="container mx-auto">
      <h4>{name}</h4>
      <img
        className="mx-auto"
        style={{ height: "200px" }}
        src={`./images/${moviePoster}`}
        alt={name}
      />
      <p>Released: {releaseDate}</p>
      <p>Starring: {actors && actors.join(", ")}</p>
      <p>Rating: {rating}</p>
      <button
        onClick={() => {
          removeItem(id);
        }}
      >
        Remove movie
      </button>
      <div>---------</div>
    </div>
  );
};

export default Movie;
