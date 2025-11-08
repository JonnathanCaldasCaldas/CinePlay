const apiKey = "ee2c6d376418907fe8a0b4e7beada4e9";

export async function getTrendingMovies() {
  const url = `https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}`;

  const res = await fetch(url);

  if (!res.ok) {
    console.error("Error al obtener películas:", res.status);
    return [];
  }

  const data = await res.json();
  return data.results ?? [];
}

