import { useEffect, useState } from "react";
import MovieCard from "./components/MovieCard";
import Spinner from "./components/Spinner";
import { useDebounce } from "react-use";
import { updateSearchCount, getTrendingMovies } from "./appwrite.js";
import Search from "./components/Search.jsx";
import useFetchMovies from "./hooks/movieAPI.js";
import useQuery from "./hooks/useQuery.js";

function App() {
  const [query, updateQuery, resetQuery] = useQuery({
    query: "",
    page: 1,
  });

  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  const [trendingMovies, setTrendingMovies] = useState([]);

  useDebounce(
    () => {
      setDebouncedSearchTerm(query.query);

    },
    700,
    [query.query]
  );
  const { data, loading, error, setError } =
    useFetchMovies(debouncedSearchTerm);
  console.log("Search term:", debouncedSearchTerm);
  console.log("Data:", data);
  console.log("Loading:", loading);
  useEffect(() => {
    const update = async () => {
      if (debouncedSearchTerm && data.results.length > 0) {
        await updateSearchCount(debouncedSearchTerm, data.results[0]);
        console.log(data.results[0]);
      }
    };
    update();
  }, [debouncedSearchTerm, data]);

  const loadTrendingMovies = async () => {
    try {
      const movies = await getTrendingMovies();
      setTrendingMovies(movies);
    } catch (error) {
      setError("Failed to fetch trending movies. Please try again later.");
    }
  };

  useEffect(() => {
    loadTrendingMovies();
  }, []);
  return (
    <main>
      <div className="pattern" />

      <div className="wrapper">
        <header>
          <img src="/hero.png" alt="hero" />
          <h1>
            Find <span className="text-gradient">Movies</span> You'll Love
            Without the Hassle
          </h1>
          <Search query={query.query} updateQuery={updateQuery} />
        </header>

        {trendingMovies.length > 0 && (
          <section className="trending">
            <h2>Trending</h2>
            <ul>
              {trendingMovies.map((movie, index) => {
                return (
                  <li key={movie.$id}>
                    <p>{index + 1}</p>
                    <img src={movie.poster_url} alt={movie.title} />
                  </li>
                );
              })}
            </ul>
          </section>
        )}

        <section className="all-movies">
          <h2>All movies</h2>

          {loading ? (
            <Spinner loading={loading} />
          ) : error ? (
            <p className="text-red">{error}</p>
          ) : (
            <ul>
              {data.results.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
}

export default App;
