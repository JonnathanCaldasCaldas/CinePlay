const apiKey = "ee2c6d376418907fe8a0b4e7beada4e9";

export async function fetchFromTMDB(endpoint) {
  const url = `https://api.themoviedb.org/3${endpoint}?api_key=${apiKey}`;

  try {
    const res = await fetch(url);

    if (!res.ok) {
      console.error("Error al obtener películas:", res.status);
      return [];
    }
    const data = await res.json();
    return data.results ?? [];
  } catch (error) {
    console.error("Error al obtener películas:", error);
    return [];
  }  
}

export function getTrendingMovies() {
  return fetchFromTMDB("/trending/movie/week");
}

export function getPopularMovies() {
  return fetchFromTMDB("/movie/popular");
}

export function getTopRatedMovies() {
  return fetchFromTMDB("/movie/top_rated");
}

export function getUpcomingMovies() {
  return fetchFromTMDB("/movie/upcoming");
}

export function getNowPlayingMovies() {
  return fetchFromTMDB("/movie/now_playing");
}

export function getOldestMovies() {
  return fetchFromTMDB("/discover/movie?sort_by=release_date.asc");
}

export function getLatestMovies() {
  return fetchFromTMDB("/discover/movie?sort_by=release_date.desc");
}

export function getWorstRatedMovies() {
  return fetchFromTMDB("/discover/movie?sort_by=vote_average.asc");
}