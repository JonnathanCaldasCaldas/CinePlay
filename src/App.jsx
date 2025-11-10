import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import MovieGrid from "./components/MovieGrid";
import Footer from "./components/Footer";
import { getTrendingMovies } from "./services/moviesAPI";
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

function App() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getTrendingMovies().then(setMovies).catch(console.error);
  }, []);

  return (
    <CartProvider>
      <div className="main-container">
        <AppContent />

        <Routes>
          <Route path="/" element={<MovieGrid movies={movies} />} />
          <Route path="/cartelera" element={<MovieGrid movies={movies} />} />
          <Route path="/opiniones" element={<Opiniones />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
        </Routes>

        <Footer />
      </div>
    </CartProvider>
  );
}

export default App;