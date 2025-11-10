import { useState, useEffect } from "react";
// 1. CAMBIA esta importación
// import MovieGrid from "./MovieGrid";
import MovieCarousel from "./MovieCarousel"; // <-- USA EL NUEVO

/**
 * Este componente recibe un TÍTULO y una FUNCIÓN para cargar datos.
 * Él mismo se encarga de llamar a la API y mostrar los resultados.
 */
export default function CategoryRow({ title, fetchFunction }) {
    const [movies, setMovies] = useState([]);
    
    useEffect(() => {
        async function loadMovies() {
            const moviesData = await fetchFunction();
            setMovies(moviesData);
        }
        loadMovies();
    }, [fetchFunction]);

    return (
        <section className="category-section">
            <h2 className="category-title" style={{color: "white", paddingLeft: "20px"}}>
                {title}
            </h2>
            
            {/* 2. CAMBIA este componente */}
            {/* <MovieGrid movies={movies} /> */}
            <MovieCarousel movies={movies} /> {/* <-- USA EL NUEVO */}

        </section>
    );
}