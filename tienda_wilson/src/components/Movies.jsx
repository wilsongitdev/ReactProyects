/* eslint-disable react/prop-types */
function ListOfMovies({ movies }) {
  return (
    <ul className="movies">
      {movies.map((movie) => (
        <li key={movie.id} className="movie">
          <h3>{movie.title}</h3>
          <p>{movie.type}</p>
          <p>{movie.year}</p>
          <img src={movie.img} alt={movie.title} />
        </li>
      ))}
    </ul>
  );
}

function NoMoviesResults() {
  return <p>No se encontraron resultados</p>;
}

export default function Movies({ movies, checked }) {
  const hasMovies = movies?.length > 0;
  return hasMovies ? (
    <ListOfMovies movies={movies} checked={checked} />
  ) : (
    <NoMoviesResults />
  );
}
