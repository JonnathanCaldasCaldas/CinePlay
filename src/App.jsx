import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Opiniones from "./components/Opiniones";

//componente para /cartelera 
import { getTrendingMovies } from "./services/moviesAPI";
import MovieGrid from "./components/MovieGrid";
// //Página Principal
import HomePage from "./components/HomePage";

//librerías para el carrusel
import 'swiper/css';
import 'swiper/css/navigation';

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
          element={<HomePage />}
        />

        <Route path="/cartelera" element={<MovieGrid movies={movies} />} />
        <Route path="/opiniones" element={<Opiniones />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;