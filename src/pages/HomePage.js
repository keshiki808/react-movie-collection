import Movie from "../components/Movie";
import { useEffect, useState } from "react";
const HomePage = () => {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    fetch("./movies.json")
      .then((response) => response.json())
      .then(setMovies);
  }, []);
  return (
    <>
      <div>HomePage</div>
      <h1>Movie Reviews</h1>
      {movies.map((movie) => {
        return <Movie info={movie}></Movie>;
      })}
    </>
  );
};

export default HomePage;
