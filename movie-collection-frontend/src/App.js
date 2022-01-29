import "./App.css";
import HomePage from "./pages/HomePage";
import SubmitPage from "./pages/SubmitPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import { useEffect, useState } from "react";

function App() {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const urlFetch = await fetch("/api/movies");
      const moviesData = await urlFetch.json();
      console.log(moviesData);
    };
    fetchData();
  }, []);
  console.log(movies);
  return (
    <Router>
      <div className="App bg-cyan-600 h-fit">
        <NavBar />
        <Routes>
          <Route
            path="/"
            element={<HomePage movies={movies} setMovies={setMovies} />}
          />
          <Route
            path="/submit"
            element={<SubmitPage movies={movies} setMovies={setMovies} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
