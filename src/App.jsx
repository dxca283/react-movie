import { useEffect, useState } from "react";
import MovieCard from "./components/MovieCard";
import Spinner from "./components/Spinner";
import { useDebounce } from "react-use";
import { updateSearchCount, getTrendingMovies } from "./appwrite.js";
import Search from "./components/Search.jsx";
import useFetchMovies from "./hooks/movieAPI.js";
import useQuery from "./hooks/useQuery.js";
import usePagination from "./hooks/usePagination.js";
import Action from "./components/Action.jsx";
import Movies from "./components/Movies.jsx";
import Header from "./components/Header.jsx";
import TrendingMovies from "./components/TrendingMovies.jsx";
import useTrendingMovies from "./hooks/useTrendingMovies.js";

function App() {
  const [query, updateQuery, resetQuery] = useQuery({
    query: "",
    page: 1,
  });

  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  useDebounce(
    () => {
      setDebouncedSearchTerm(query.query);
    },
    700,
    [query.query]
  );
  const { data, loading, error, setError } =
    useFetchMovies(debouncedSearchTerm);

  useEffect(() => {
    const update = async () => {
      if (debouncedSearchTerm && !loading && data.results.length > 0) {
        updateSearchCount(debouncedSearchTerm, data.results[0]);
      }
    };
    update();
  }, [data]);

  const [trendingMovies] = useTrendingMovies();

  const [totalPages, paginatedData, currentPage, setCurrentPage] =
    usePagination(data.results, 4);

  return (
    <main>
      <div className="pattern" />

      <div className="wrapper">
        <Header query={query.query} updateQuery={updateQuery} />

        <TrendingMovies trendingMovies={trendingMovies} />

        <Movies loading={loading} movieList={paginatedData} error={error} />
        <Action
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
        />
      </div>
    </main>
  );
}

export default App;
