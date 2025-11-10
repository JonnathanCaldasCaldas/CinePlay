import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules'; // Importa el módulo de navegación
import MovieCard from './MovieCard'; // Reutilizamos tu mismo MovieCard

/**
 * Este componente reemplaza a MovieGrid.
 * Muestra una lista de películas en un carrusel responsivo.
 */
export default function MovieCarousel({ movies }) {
    
    // Si no hay películas, muestra el mensaje de carga
    if (!movies?.length) {
        return <p style={{ color: "white", paddingLeft: "20px" }}>Cargando películas...</p>;
    }

    return (
        <Swiper
            loop={true} // Esto hace que el carrusel sea infinito
            // 1. Módulos
            modules={[Navigation]}  // Activa las flechas de navegación
            
            // 2. Configuración de Navegación
            navigation={true}       // Habilita las flechas
            
            // 3. Configuración de "Slides"
            spaceBetween={15}     // Espacio entre cada tarjeta
            slidesPerView={5}       // Cuántas tarjetas se ven por defecto
            
            // 4. Breakpoints (¡Importante para responsive!)
            // Muestra diferentes cantidades de slides según el ancho de la pantalla
            breakpoints={{
                // 320px (móvil pequeño) en adelante
                320: {
                    slidesPerView: 2, // Muestra 2 tarjetas
                    spaceBetween: 10
                },
                // 640px (tablet) en adelante
                640: {
                    slidesPerView: 3, // Muestra 3 tarjetas
                    spaceBetween: 15
                },
                // 1024px (desktop) en adelante
                1024: {
                    slidesPerView: 5, // Muestra 5 tarjetas
                    spaceBetween: 15
                }
            }}
            className="movie-carousel" // Clase para estilos (opcional)
        >
            {/* 5. Mapeamos las películas igual que antes */}
            {movies.map((m) => (
                <SwiperSlide key={m.id}>
                    <MovieCard movie={m} />
                </SwiperSlide>
            ))}
        </Swiper>
    );
}