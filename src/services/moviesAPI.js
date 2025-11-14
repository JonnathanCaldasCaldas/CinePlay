const apiKey = "ee2c6d376418907fe8a0b4e7beada4e9";

async function fetchFromTMDB(endpoint) {
  const cacheKey = `tmdb_cache${endpoint}`;
  const url = `https://api.themoviedb.org/3${endpoint}?api_key=${apiKey}`;

  try {
    //PARTE ONLINE
    const res = await fetch(url);
    
    if (!res.ok) {
      console.error("Error al obtener películas:", res.status);
      //return [];
    }

    const data = await res.json();
    const dataToCache = data.results ? data.results : data;

    localStorage.setItem(cacheKey, JSON.stringify(dataToCache));

    return dataToCache;

  } catch (error) {
    //PARTE OFFLINE
    console.warn(`Error de red. Cargando desde caché para: ${endpoint}`, error);
    
    const cachedData = localStorage.getItem(cacheKey);
    if (cachedData) {
      console.log(`Cache hit para: ${cacheKey}`);
      return JSON.parse(cachedData);
    } else {
      console.error("Sin conexion y sin datos en caché");
      return null;
    }
  }
}
export function getMovieById(id) {
  return fetchFromTMDB(`/movie/${id}`);
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