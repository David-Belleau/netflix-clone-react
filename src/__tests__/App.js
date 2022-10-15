import * as React from 'react'
import {server, rest} from 'mocks'
import {
  render,
  screen,
  waitForElementToBeRemoved,
  sampleMovie,
  resultsMovies,
  bookmark,
} from 'test/test-utils'
import * as authNetflix from '../utils/authNetflixProvider'
import {AUTH_URL, API_URL, localStorageTokenKey} from 'config'
import {App} from 'App'

beforeEach(() => {
  const user = {id: '1', username: 'fakeUsername', token: 'FAKE_TOKEN'}
  server.use(
    rest.get(`${AUTH_URL}/me`, async (req, res, ctx) => {
      return res(ctx.json({user}))
    }),
    rest.get(`${API_URL}/movie/:id`, async (req, res, ctx) => {
      return res(ctx.json(sampleMovie))
    }),
    rest.get(`${API_URL}/tv/:id`, async (req, res, ctx) => {
      return res(ctx.json(sampleMovie))
    }),
    rest.get(`${AUTH_URL}/bookmark`, async (req, res, ctx) => {
      return res(ctx.json({bookmark}))
    }),
    rest.get(`${API_URL}/*`, async (req, res, ctx) => {
      return res(ctx.json(resultsMovies))
    }),
  )
})

afterEach(async () => {
  await authNetflix.logout()
})

test('rendering of the application in connected mode', async () => {
  const user = {id: '1', username: 'fakeUsername', token: 'FAKE_TOKEN'}

  window.localStorage.setItem(localStorageTokenKey, user.token)
  render(<App />)
  await waitForElementToBeRemoved(() => screen.getByRole('alert'))
  expect(screen.queryByText(/Connexion/i)).not.toBeInTheDocument()
  expect(screen.queryByText(/Inscrivez-vous/i)).not.toBeInTheDocument()
  expect(screen.getByRole('heading', {name: 'Accueil'})).toBeInTheDocument()
  expect(screen.getByRole('heading', {name: 'Séries'})).toBeInTheDocument()
  expect(screen.getByRole('heading', {name: 'Films'})).toBeInTheDocument()
  expect(
    screen.getByRole('heading', {name: 'Nouveautés les plus regardées'}),
  ).toBeInTheDocument()
  expect(screen.getByRole('heading', {name: 'Ma liste'})).toBeInTheDocument()
  expect(
    screen.getByRole('heading', {name: 'Films Netflix'}),
  ).toBeInTheDocument()
  expect(
    screen.getByRole('heading', {name: 'Séries Netflix'}),
  ).toBeInTheDocument()
  expect(
    screen.getByRole('heading', {name: 'Les mieux notés'}),
  ).toBeInTheDocument()
  expect(
    screen.getByRole('heading', {name: 'Action & aventure'}),
  ).toBeInTheDocument()
  expect(
    screen.getByRole('heading', {name: 'Les meilleurs Thriller'}),
  ).toBeInTheDocument()
  expect(screen.getByRole('contentinfo')).toBeInTheDocument()
})

test("rendering of the '/series' route", async () => {
  const route = `/series`
  window.history.pushState({}, 'Page series Netflix', route)
  const user = {id: '1', username: 'fakeUsername', token: 'FAKE_TOKEN'}
  window.localStorage.setItem(localStorageTokenKey, user.token)
  render(<App></App>)
  await waitForElementToBeRemoved(() => screen.getByRole('alert'))
  expect(screen.queryByText(/Connexion/i)).not.toBeInTheDocument()
  expect(screen.queryByText(/Inscrivez-vous/i)).not.toBeInTheDocument()
  expect(screen.getByRole('heading', {name: 'Accueil'})).toBeInTheDocument()
  expect(screen.getByRole('heading', {name: 'Séries'})).toBeInTheDocument()
  expect(screen.getByRole('heading', {name: 'Films'})).toBeInTheDocument()
  expect(
    screen.getByRole('heading', {name: 'Nouveautés les plus regardées'}),
  ).toBeInTheDocument()
  expect(screen.getByRole('heading', {name: 'Ma liste'})).toBeInTheDocument()
  expect(
    screen.getByRole('heading', {name: 'Séries Netflix'}),
  ).toBeInTheDocument()
  expect(
    screen.getByRole('heading', {name: 'Les mieux notées'}),
  ).toBeInTheDocument()
  expect(
    screen.getByRole('heading', {name: 'Séries populaires'}),
  ).toBeInTheDocument()
  expect(
    screen.getByRole('heading', {name: 'Documentaires'}),
  ).toBeInTheDocument()
  expect(
    screen.getByRole('heading', {name: 'Séries criminelles'}),
  ).toBeInTheDocument()
  expect(screen.getByRole('contentinfo')).toBeInTheDocument()
})
