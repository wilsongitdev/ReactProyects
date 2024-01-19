const API_KEY = "f57b5432";

export const searchMovies = async ({search}) => {
    try {
        const response = await fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&s=${search}`);
        const jsonData = await response.json()
        const movies = jsonData.Search;

        return movies?.map((result) => ({
        id: result.imdbID,
        title: result.Title,
        type: result.Type,
        year: result.Year,
        img: result.Poster,
        }));
    } catch (error) {
        throw new Error('Hubo un error en la API');
    }
    

}