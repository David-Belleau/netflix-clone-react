import {
  getRandomIntInclusive,
  getRandomType,
  getRandomMovie,
  getRandomSerie,
  getRandomId,
} from '../helper'
import {TYPE_TV, TYPE_MOVIE} from '../../config'

test('return a random integer', () => {
  const min = 0
  const max = 10
  expect(getRandomIntInclusive(min, max)).toBeGreaterThanOrEqual(min)
  expect(getRandomIntInclusive(min, max)).toBeLessThanOrEqual(max)
})

test('return a random type', () => {
  const types = [TYPE_TV, TYPE_MOVIE]
  expect(types).toContain(getRandomType())
})

test('return a random movie', () => {
  const moviesIds = [718930,616037,628878,718789,756999,438148]
  expect(moviesIds).toContain(getRandomMovie())
})

test('return a random series', () => {
  const tvIds = [92782, 92830, 66732, 71790, 1416, 2734]
  expect(tvIds).toContain(getRandomSerie())
})

test('return a random movie or series', () => {
  const moviesIds = [718930,616037,628878,718789,756999,438148]
  const tvIds = [92782, 92830, 66732, 71790, 1416, 2734]
  expect(tvIds).toContain(getRandomId(TYPE_TV))
  expect(moviesIds).toContain(getRandomId(TYPE_MOVIE))
})
