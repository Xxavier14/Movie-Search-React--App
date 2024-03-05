export const renderMovie = (movies) => {
    return (
        <ul>
            {movies.map((movie) => (
                <li key={movie.imdbID}>
                    <h3>{movie.Title}</h3>
                    <p>{movie.Type}</p>
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