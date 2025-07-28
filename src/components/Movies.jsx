import Spinner from "./Spinner";
import MovieCard from "./MovieCard";

const Movies = ({loading, movieList, error}) => {
  return (
    <section className="all-movies">
      <h2>All movies</h2>

      {loading ? (
        <Spinner loading={loading} />
      ) : error ? (
        <p className="text-red">{error}</p>
      ) : (
        <ul>
          {movieList.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </ul>
      )}
    </section>
  );
};

export default Movies;
