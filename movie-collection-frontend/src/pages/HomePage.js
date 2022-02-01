import Movie from "../components/Movie";
import { useEffect } from "react";

const HomePage = ({ movies, setMovies }) => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const urlFetch = await fetch("/api/movies");
        const moviesData = await urlFetch.json();
        console.log(moviesData);
        setMovies(moviesData);
      } catch (error) {
        console.log("Error here");
        console.log(error);
      }
    };
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
      .then((result) => {
        // do what you want with the response here
      });

    const newMovieCollection = movies.filter((movie) => {
      return movie._id !== _id;
    });
    setMovies(newMovieCollection);
  };

  return (
    <>
      <h1 className="text-3xl my-[10px] bg-gray-200 w-fit mx-auto p-[8px] rounded">
        Movie Collection
      </h1>

      <div className="flex flex-wrap mx-[25px]">
        {movies.map((movie) => {
          return (
            <Movie key={movie.id} info={movie} removeItem={removeMovie}></Movie>
          );
        })}
      </div>
    </>
  );
};

export default HomePage;
