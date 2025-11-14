import { useState, useEffect } from "react";
import MovieCarousel from "./MovieCarousel"; 
import "./../styles/movies.css";
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
            <h2 className="category-title">
                {title}
            </h2>
            <MovieCarousel movies={movies} /> 

        </section>
    );
}