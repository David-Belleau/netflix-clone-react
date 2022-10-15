import {renderHook, act} from '@testing-library/react-hooks'
import {wrapperHistoryContext} from 'test/test-utils'
import {
  useClearHistory,
  useAddToHistory,
  useNavigateFiction,
} from '../HistoryFictionContext'

import {TYPE_MOVIE, TYPE_TV} from 'config'

test('useNavigateMovie() default values', async () => {
  const {result} = renderHook(() => useNavigateFiction(), {
    wrapper: wrapperHistoryContext,
  })
  expect(result.current).toEqual({
    movies: [],
    series: [],
    addMovie: expect.any(Function),
    addSerie: expect.any(Function),
    clearHistory: expect.any(Function),
  })
})

test('useClearHistory() is a function', async () => {
  const {result} = renderHook(() => useClearHistory(), {
    wrapper: wrapperHistoryContext,
  })
  expect(result.current).toEqual(expect.any(Function))
})

test('add movies', async () => {
  const movie = {id: '550', name: 'fakeMovie'}
  const {result} = renderHook(() => useNavigateFiction(), {
    wrapper: wrapperHistoryContext,
  })
  expect(result.current).toEqual({
    movies: [],
    series: [],
    addMovie: expect.any(Function),
    addSerie: expect.any(Function),
    clearHistory: expect.any(Function),
  })
  act(() => {
    result.current.addMovie(movie)
  })
  expect(result.current).toEqual({
    movies: [movie],
    series: [],
    addMovie: expect.any(Function),
    addSerie: expect.any(Function),
    clearHistory: expect.any(Function),
  })
})

test('add movies with useAddToHistory()', async () => {
  const movie = {id: '550', name: 'fakeMovie'}
  const {result} = renderHook(
    () => {
      useAddToHistory(movie, TYPE_MOVIE)
      useAddToHistory(movie, TYPE_TV)
      return useNavigateFiction()
    },
    {
      wrapper: wrapperHistoryContext,
    },
  )

  expect(result.current).toEqual({
    movies: [movie],
    series: [movie],
    addMovie: expect.any(Function),
    addSerie: expect.any(Function),
    clearHistory: expect.any(Function),
  })
})
