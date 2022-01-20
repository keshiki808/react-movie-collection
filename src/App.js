import "./App.css";
import HomePage from "./pages/HomePage";
import SubmitPage from "./pages/SubmitPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import { useEffect, useState } from "react";

function App() {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    fetch("./movies.json")
      .then((response) => response.json())
      .then(setMovies);
  }, []);
  return (
    <Router>
      <div className="App">
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
