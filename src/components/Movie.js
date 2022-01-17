import React from "react";

const Movie = ({ info }) => {
  const { id, name, releaseDate, actors, moviePoster, rating } = info;
  console.log(actors);

  return (
    <div class="container mx-auto">
      <h4>{name}</h4>
      <img
        class="mx-auto"
        style={{ height: "200px" }}
        src={`./images/${moviePoster}`}
        alt={name}
      />
      <p>Released: {releaseDate}</p>
      <p>Starring: {actors}</p>
      <p>Rating: {rating}</p>
    </div>
  );
};

export default Movie;
