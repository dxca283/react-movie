import useFetchData from "./useFetchData.js";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_BASE_URL = "https://api.themoviedb.org/3";
const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

const useFetchMovies = (query = "") => {
  console.log("useFetchMovies called with query:", query);
  
  const path = query
    ? `${API_BASE_URL}/search/movie`
    : `${API_BASE_URL}/discover/movie`;

  const queryParams = query ?  {query}  : { sort_by: "popularity.desc" };
  
  console.log("API path:", path);
  console.log("Query params:", queryParams);
  console.log("API_KEY exists:", !!API_KEY);
  
  return useFetchData(path, queryParams, API_OPTIONS);
};

export default useFetchMovies;
