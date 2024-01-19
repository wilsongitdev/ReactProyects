import "./App.css";
import Movies from "./components/Movies";
import { useMovies } from "./hooks/useMovies";
import { useSearch } from "./hooks/useSearch";
import { useCallback, useState } from "react";
import debounce from "just-debounce-it";

function App() {
  const { search, updateSearch, error: ErrorValidation } = useSearch();
  const [sort, setSort] = useState(false);
  const {
    movies: mappedMovies,
    getMovies,
    loading,
    error: ErrorMovies,
  } = useMovies({ search, sort });

  const handleSubmit = (e) => {
    e.preventDefault();
    getMovies({ search });
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceGetMovies = useCallback(
    debounce((newQuery) => {
      getMovies({ search: newQuery });
    }, 300),
    []
  );

  const handleChange = (e) => {
    const newQuery = e.target.value;
    if (newQuery.startsWith(" ")) return;
    updateSearch(newQuery);
    if (newQuery.length >= 3) debounceGetMovies(newQuery);
  };

  const handleSort = () => {
    setSort(!sort);
  };
  return (
    <div className="page">
      <header>
        <form className="form" onSubmit={handleSubmit}>
          <input
            name="query"
            type="text"
            placeholder="Escribe"
            autoComplete="off"
            onChange={handleChange}
            value={search}
          />
          <label htmlFor="sort">Ordenar</label>
          <input
            id="sort"
            type="checkbox"
            onChange={handleSort}
            checked={sort}
          />
          <button type="submit">Buscar</button>
        </form>
        {ErrorValidation && (
          <p style={{ color: "red", textAlign: "center" }}>{ErrorValidation}</p>
        )}
      </header>
      <main>
        {loading ? <p>Cargando</p> : <Movies movies={mappedMovies} />}
        <p>{ErrorMovies}</p>
      </main>
    </div>
  );
}

export default App;
