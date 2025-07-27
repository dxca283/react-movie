
const Search = ({debouncedSearchTerm, updateQuery}) => {

  const handleSearch = (value) => {
    updateQuery({query: value})
  }
  return (
    <div className="search">
      <div>
        <img src="/search.svg" alt="search" />
        <input
          type="text"
          placeholder="Search through thousands of movies"
          value={debouncedSearchTerm || ""}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>
    </div>
  );
};

export default Search;
