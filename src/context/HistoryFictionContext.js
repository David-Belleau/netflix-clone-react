import React from 'react'
import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useCallback,
  useMemo,
} from 'react'
import {TYPE_TV} from '../config'

const HistoryFictionContext = createContext()
const MAX_ELEMENTS = 3

const reducer = (state, action) => {
  switch (action.type) {
    case 'addMovie':
      return {
        ...state,
        movies: [action.payload, ...state.movies.slice(0, MAX_ELEMENTS - 1)],
      }
    case 'addSerie':
      return {
        ...state,
        series: [action.payload, ...state.series.slice(0, MAX_ELEMENTS - 1)],
      }
    case 'clear':
      return {
        ...state,
        series: [],
        movies: [],
      }
    default:
      throw new Error('Action non supporté')
  }
}

const HistoryFictionProvider = props => {
  const [state, dispatch] = useReducer(reducer, {series: [], movies: []})
  const addMovie = useCallback(movie => {
    dispatch({
      type: 'addMovie',
      payload: movie,
    })
  }, [])

  const addSerie = useCallback(serie => {
    dispatch({
      type: 'addSerie',
      payload: serie,
    })
  }, [])

  const clearHistory = useCallback(() => {
    dispatch({
      type: 'clear',
    })
  }, [])

  const {series, movies} = state

  const value = useMemo(() => {
    return {movies, series, addMovie, addSerie, clearHistory}
  }, [addMovie, addSerie, clearHistory, movies, series])

  return <HistoryFictionContext.Provider value={value} {...props} />
}

const useNavigateFiction = () => {
  const context = useContext(HistoryFictionContext)
  if (!context) {
    throw new Error(
      "useNavigateFiction() s'utilise avec <HistoryFictionContext.Provider>",
    )
  }
  return context
}

const useAddToHistory = (fiction, type = TYPE_TV) => {
  const {addMovie, addSerie} = useNavigateFiction()

  useEffect(() => {
    if (fiction) {
      if (type === TYPE_TV) {
        addSerie(fiction)
      } else {
        addMovie(fiction)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fiction])
}

const useClearHistory = () => {
  const {clearHistory} = useNavigateFiction()

  return clearHistory
}

export {
  HistoryFictionContext,
  useNavigateFiction,
  HistoryFictionProvider,
  useAddToHistory,
  useClearHistory,
}
