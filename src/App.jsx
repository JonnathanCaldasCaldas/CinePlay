import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import MovieGrid from "./components/MovieGrid";
import Footer from "./components/Footer";
import { getTrendingMovies } from "./services/moviesAPI";
import Opiniones from "./components/Opiniones";

function App() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getTrendingMovies().then(setMovies).catch(console.error);
  }, []);

  return (
    // CAMBIO CLAVE: Contenedor principal para aplicar el fondo oscuro y altura completa
    <div className="main-container"> 
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <MovieGrid movies={movies} />
            </>
          }
        />

        <Route path="/cartelera" element={<MovieGrid movies={movies} />} />
        <Route path="/opiniones" element={<Opiniones />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;