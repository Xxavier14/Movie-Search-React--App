import { renderMovie, renderNoMovie } from './components/renderMovie'
import { useState, useEffect, useRef, useCallback } from 'react'
import debounce from 'just-debounce-it'
import './App.css'

function useSearch() {
  const [search, updateSearch] = useState('')
  const [error, setError] = useState(null)
  const isFristInput = useRef(true)


  useEffect(() => {
    if (isFristInput.current) {
      isFristInput.current = search === ''
      return
    }

    if (search === '') {
      setError('No se puede buscar una película vacía')
      return
    }

    if (search.length < 3) {
      setError('Debe ingresar mas de 3 cáracteres')
      return
    }

    setError(null)
  }, [search])

  return ({ search, updateSearch, error })
}

let previousSearch = ''

function App() {
  const [responseMovie, setResponseMovie] = useState([])
  const movies = responseMovie.Search
  const hasMovie = movies?.length > 0
  const { search, updateSearch, error } = useSearch()

  const getMovie = (search) => {
    if (previousSearch === search) return
    if (search) {
      fetch(`https://www.omdbapi.com/?apikey=e767709d&s=${search}&type=movie`)
        .then(res => res.json())
        .then(data => {
          setResponseMovie(data)
          previousSearch = search
        })
    }
  }

  const debouncedGetMovies = useCallback(debounce(search => {
    getMovie(search)
  }, 300)
    , []
  )



  const handleChange = (search) => {
    const newSearch = search.target.value
    updateSearch(newSearch)
    debouncedGetMovies(newSearch)
  }
  const handleSubmit = (event) => {
    event.preventDefault()
    getMovie(search)
  }

  return (
    <div className='page'>
      <header>
        <h1>Movie search</h1>
        <form className='form' onSubmit={handleSubmit} >
          <input onChange={handleChange} value={search} placeholder='Avengers , Harry Potter ...' />
          <button type='submit'>Buscar</button>
        </form>
        {error && <p className='errorP' style={{ color: 'red' }}>{error}</p>}
      </header>

      <main>
        {hasMovie ? renderMovie(movies)
          : renderNoMovie()}
      </main>
    </div>
  )
}

export default App
