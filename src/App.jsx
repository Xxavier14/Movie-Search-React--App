import responseMovie from './template/expectedResponse.json'
import responseError from './template/expectedError.json'
import { renderMovie, renderNoMovie } from './components/renderMovie'

function App() {

  const movies = responseMovie.Search
  const hasMovie = movies?.length > 0


  return (
    <div className='page'>
      <header>
        <h1>Movie search</h1>
        <form className='form'>
          <input placeholder='Avenger, Harry Potter ...' />
          <button type='submit'>Buscar</button>
        </form>
      </header>

      <main>
        {hasMovie ? renderMovie(movies) 
        : renderNoMovie()}
      </main>
    </div>
  )
}

export default App
