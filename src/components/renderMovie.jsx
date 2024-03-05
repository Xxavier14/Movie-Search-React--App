export const renderMovie = (movies) => {
    return (
        <ul className="movies"> 
            {movies.map((movie) => (
                <li className="movie" key={movie.imdbID}>
                    <h3>{movie.Title}</h3>
                    <p>{movie.Year}</p>
                    <img src={movie.Poster} alt={movie.Title} />
                </li>
            ))}
        </ul>
    )
}

export const renderNoMovie = () => {
    return (
        <h3>No movie found</h3>
    )
}