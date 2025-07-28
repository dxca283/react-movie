import { useEffect, useState } from "react";
import { getTrendingMovies } from "../appwrite.js";

const useTrendingMovies = () => {

  const [trendingMovies, setTrendingMovies] = useState([]);
  useEffect(() => {
    const loadingTrendingMovies = async () => {
        try {
            const movies = await getTrendingMovies();
            setTrendingMovies(movies);

        } catch (error) {
            console.error('Error loading trending movies', error);
        }
    }
    loadingTrendingMovies();
  }, [])
  return [trendingMovies];
};

export default useTrendingMovies;