import Movie from "../components/Movie";
import { useEffect } from "react";

const HomePage = ({ movies, setMovies, fetchData }) => {
  useEffect(() => {
    fetchData();
  }, []);
  const removeMovie = (_id) => {
    const requestOptions = {
      method: "DELETE",
    };
    console.log(JSON.stringify(_id));

    fetch("/api/delete/" + _id, requestOptions)
      .then((response) => {
        return response.json();
      })
      .then((result) => {});

    const newMovieCollection = movies.filter((movie) => {
      return movie._id !== _id;
    });
    setMovies(newMovieCollection);
  };

  return (
    <>
      <h1 className="animate-bounce text-3xl my-[35px] bg-gray-200 w-fit mx-auto p-[8px] rounded">
        <img
          className="animate-spin inline h-[50px] mx-[10px]"
          src="http://localhost:8000/public/images/VHS123.svg.png"
        ></img>
        Movie Collection
        <img
          className="animate-spin inline h-[50px] mx-[10px]"
          src="http://localhost:8000/public/images/VHS123.svg.png"
        ></img>
      </h1>

      <div className="flex flex-wrap mx-[25px]">
        {movies.map((movie) => {
          return (
            <Movie
              key={movie._id}
              info={movie}
              removeItem={removeMovie}
            ></Movie>
          );
        })}
      </div>
    </>
  );
};

export default HomePage;
