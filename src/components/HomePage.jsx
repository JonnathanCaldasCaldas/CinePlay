import CategoryRow from "./CategoryRow"; // Asegúrate que la ruta sea correcta
import { 
    getTrendingMovies, 
    getPopularMovies, 
    getTopRatedMovies,
    getNowPlayingMovies
} from "../services/moviesAPI"; // Ajusta la ruta a tu moviesAPI.js

export default function HomePage() {
    return (
        <div className="homepage-container">
            {/* Este componente ahora solo se encarga de apilar
                las filas. Cada CategoryRow hace su propio fetch.
            */}
            <CategoryRow 
                title="En Tendencia" 
                fetchFunction={getTrendingMovies} 
            />
            <CategoryRow 
                title="Populares" 
                fetchFunction={getPopularMovies} 
            />
            <CategoryRow 
                title="Mejor Valoradas" 
                fetchFunction={getTopRatedMovies} 
            />
            <CategoryRow 
                title="De Estreno (En Cines)" 
                fetchFunction={getNowPlayingMovies} 
            />
        </div>
    );
}