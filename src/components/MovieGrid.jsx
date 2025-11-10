import MovieCard from "./MovieCard";

import "./../styles/movies.css";





export default function MovieGrid({ movies }) {

    return (

        <>

            <section className="movie-grid">

                {movies?.length ? (

                movies.map((m) => <MovieCard key={m.id} movie={m} />)

                ) : (

                <p style={{ color: "white" }}>Cargando películas...</p>

                )}

            </section>

        </>

    );

}