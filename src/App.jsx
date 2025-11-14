import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Opiniones from "./components/Opiniones";
import MovieDetails from "./components/MovieDetails";
import CartProvider from "./context/CartProvider";
import { useCart } from "./context/CartContext";
import SideCart from "./components/SideCart";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AppLayout() {
    const { showCart, closeCart } = useCart();
    const [movies, setMovies] = useState([]);
    useEffect(() => {
        getTrendingMovies().then(setMovies).catch(console.error);
    }, []);

    return (
        <div className="main-container">
            <Navbar />
            <SideCart show={showCart} handleClose={closeCart} />

            <Routes>
                <Route path="/" element={<HomePage />} />
                
                <Route path="/cartelera" element={<MovieGrid movies={movies} />} />
                <Route path="/movie/:id" element={<MovieDetails />} />
            </Routes>

            {/* 3. Footer estático */}
            <Footer />
            {/* Contenido para notificaciones*/}
            <ToastContainer position="top-right" autoClose={4000} hideProgressBar={false} newestOnTop closeOnClick pauseOnHover theme="colored"
            />
        </div>
    )
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
  return (
    <CartProvider>
      <AppLayout /> 
    </CartProvider>
  );
}

export default App;