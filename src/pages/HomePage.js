import Movie from "../components/Movie";
import { useEffect, useState } from "react";
const HomePage = () => {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    fetch("./movies.json")
      .then((response) => response.json())
      .then(setMovies);
  }, []);

  const removeMovie = (id) => {
    const newMovieCollection = movies.filter((movie) => {
      return movie.id !== id;
    });
    setMovies(newMovieCollection);
  };

  return (
    <>
      <div>HomePage</div>
      <h1>Movie Reviews</h1>
      {movies.map((movie) => {
        return <Movie info={movie} removeItem={removeMovie}></Movie>;
      })}
    </>
  );
};

export default HomePage;
