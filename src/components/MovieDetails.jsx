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
    const [language, setLanguage] = useState("");
    const [format, setFormat] = useState("");
    const [time, setTime] = useState("");
    const { addToCart, openCart, updateSelections } = useCart();

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
        language,
        format,
        time,
        quantity: 1,
    }
  const handleAddToCart = () => {
    updateSelections({language, format, time});
      addToCart({
        ...movieItem,
        language,
        format,
        time,
      });
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
            <select value={ language } onChange={(e) => setLanguage(e.target.value)}>
              <option value="">Idioma</option>
              <option value="Español">Español</option>
              <option value="Inglés">Inglés</option>
              <option value="Castellano">Castellano</option>
            </select>

            <select value={ format } onChange={(e) => setFormat(e.target.value)}>
              <option value="">Formato</option>
              <option value="2D">2D</option>
              <option value="3D">3D</option>
              <option value="4D">4D</option>
            </select>
          </div>
        <div className="movie-cinema"><h3>Funciones</h3></div>

          <div className="schedule">
            {["10:00", "11:30", "13:00", "14:30", "16:00", "17:30", "19:00", "20:30"].map((t) => (
              <button key={t} onClick={() => setTime(t)}>
              {t}
              </button>
            ))} 
          </div>
          <h3>Datos Seleccionados:</h3>
          <h4>Idioma: {language}</h4>
          <h4>Formato: {format}</h4>
          <h4>Hora: {time}</h4>

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
