const apiKey = "ee2c6d376418907fe8a0b4e7beada4e9";

export async function getTrendingMovies() {
  const url = `https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}`;

  const res = await fetch(url);

  if (!res.ok) throw new Error("No se pudieron obtener las películas");
  const data = await res.json();
  return data.results;
}

export async function getMovieById(id) {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`
  );
  if (!res.ok) throw new Error("No se pudo obtener la película");
  return res.json();
}

