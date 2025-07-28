import Search from "./Search";


const Header = ({query, updateQuery}) => {
  return (
    <header>
      <img src="/hero.png" alt="hero" />
      <h1>
        Find <span className="text-gradient">Movies</span> You'll Love Without
        the Hassle
      </h1>
      <Search query={query} updateQuery={updateQuery} />
    </header>
  );
};

export default Header;
