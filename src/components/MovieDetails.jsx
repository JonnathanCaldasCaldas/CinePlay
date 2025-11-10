import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getMovieById } from "../services/moviesAPI";
import { Button } from "react-bootstrap";
import { useCart } from "../context/CartContext";
import "./../styles/movieDetails.css";

export default function MovieDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [movie, setMovie] = useState(null);
    const [cinema, setCinema] = useState("");
    const { addToCart, openCart } = useCart();

    useEffect(() => {
        getMovieById(id).then(setMovie).catch(console.error);
        const savedCinema = localStorage.getItem("cinema");
        if (savedCinema) {
            setCinema(savedCinema);
        }
    }, [id]);

    if (!movie) return <p style={{ color: "white" }}>Cargando...</p>

    const poster = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : null;

    const backdrop = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : null;
  
    const movieItem = {
        id: movie.id,
        title: movie.title,
        poster: poster,
        price: 6.5,    // precio simulado
        cinema,
        quantity: 1,
    }
    const handleAddToCart = () => {
        addToCart(movieItem);
        openCart();
    }

  return (
    <div
      className="movie-detail-container"
      style={{
        backgroundImage: backdrop ? `url(${backdrop})` : "none",
      }}
    >
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Regresar
      </button>

      <div className="movie-detail-content">
        {poster && <img className="movie-detail-img" src={poster} alt={movie.title} />}

        <div className="movie-info">
          <h1>{movie.title}</h1>
          
          {/* selectores */}
          <div className="movie-cinema"><h3>CINE: {cinema || "No seleccionado"}</h3></div>
          
          <div className="select-group">
            <select>
              <option>Español</option>
              <option>Inglés</option>
              <option>Castellano</option>
            </select>

            <select>
              <option>2D</option>
              <option>3D</option>
              <option>4D</option>
            </select>
          </div>
        <div className="movie-cinema"><h3>Funciones</h3></div>

          <div className="schedule">
            {["10:00", "11:30", "13:00", "14:30", "16:00", "17:30", "19:00", "20:30"].map((t) => (
              <button key={t}>{t}</button>
            ))}
            </div>
            <div className="movie-synopsis">
                <h2>Sinopsis</h2>
                <p>{movie.overview}</p>    
            </div>
            <Button
              variant="warning"
              size="lg"
              className="fw-bold mt-3"
              onClick={handleAddToCart}
            > 
              AGREGAR AL CARRITO
            </Button>
        </div>
      </div>
    </div>
  );
}
