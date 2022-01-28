import Movie from "../components/Movie";

const HomePage = ({ movies, setMovies }) => {
  const removeMovie = (id) => {
    const newMovieCollection = movies.filter((movie) => {
      return movie.id !== id;
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
