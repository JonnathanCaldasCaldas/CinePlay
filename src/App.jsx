import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Opiniones from "./components/Opiniones";
import MovieDetails from "./components/MovieDetails";
import CartProvider from "./context/CartProvider";
import { useCart } from "./context/CartContext";
import SideCart from "./components/SideCart";

function AppContent() {
  const { showCart, closeCart } = useCart(); // Obtener estado y función del carrito

  return (
    <>
      <Navbar />
      <SideCart show={showCart} handleClose={closeCart} />
    </>
  );
}

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
    <CartProvider>
      <div className="main-container">
        <AppContent />

<<<<<<< HEAD
        <Routes>
          <Route path="/" element={<MovieGrid movies={movies} />} />
          <Route path="/cartelera" element={<MovieGrid movies={movies} />} />
          <Route path="/opiniones" element={<Opiniones />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
        </Routes>
=======
      <Routes>
        <Route
          path="/"
          element={<HomePage />}
        />
>>>>>>> origin/main

        <Footer />
      </div>
    </CartProvider>
  );
}

export default App;