import "./../styles/movies.css";

export default function MovieCard({ movie }) {
  const imgUrl = movie.poster_path 
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "/assets/no-image.png";

  return (
    <div className="movie-card">
        <img className="movie-poster" src={imgUrl} alt={movie.title} />
        <h3 className="movie-title">{movie.title}</h3>
        <p className="movie-rating">⭐ {movie.vote_average}</p>
    </div>
  );
}
