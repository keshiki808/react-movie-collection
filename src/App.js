import "./App.css";
import HomePage from "./pages/HomePage";
import SubmitPage from "./pages/SubmitPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import { useEffect, useState } from "react";

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/submit" element={<SubmitPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
