import { server, rest } from 'mocks'
import { clientApi, clientAuth, clientNetFlix } from 'utils/clientApi'
import * as authNetflix from '../../utils/authNetflixProvider'
import { API_URL, AUTH_URL } from '../../config'
jest.mock('../../utils/authNetflixProvider')

test('check an error message', async () => {
  const keyLang = 'fake-keyLang'
  const endpoint = 'fake-endpoint'
  const resultError = { message: 'fake-error' }
  server.use(
    rest.get(`${API_URL}/${endpoint}${keyLang}`, async (req, res, ctx) => {
      return res(ctx.json(resultError))
    }),
  )
  const error = await clientApi(endpoint).catch(error => error)
  expect(error.message).toMatchInlineSnapshot(`"Network Error"`)
})

test('make an HTTP GET request to an endpoint', async () => {
  const endpoint = 'fake-endpoint'
  const resultRequest = { mockResult: 'TEST' }
  server.use(
    rest.get(`${AUTH_URL}/${endpoint}`, async (req, res, ctx) => {
      return res(ctx.json(resultRequest))
    }),
  )
  const result = await clientAuth(endpoint)
  expect(result.data).toEqual(resultRequest)
})

test('check the data passed in parameters', async () => {
  const endpoint = 'fake-endpoint'
  const resultRequest = { mockResult: 'TEST' }
  const data = { fake: 'fake-data' }
  let request
  server.use(
    rest.post(`${AUTH_URL}/${endpoint}`, async (req, res, ctx) => {
      request = req
      return res(ctx.json(resultRequest))
    }),
  )
  await clientAuth(endpoint, { data })
  expect(data).toEqual(request.body)
})

test('check the token passed in parameters', async () => {
  const endpoint = 'fake-endpoint'
  const resultRequest = { mockResult: 'TEST' }
  const token = 'fake-token'
  let request
  server.use(
    rest.get(`${AUTH_URL}/${endpoint}`, async (req, res, ctx) => {
      request = req
      return res(ctx.json(resultRequest))
    }),
  )
  await clientAuth(endpoint, { token })
  expect(request.headers.get('Authorization')).toBe(`Bearer ${token}`)
})

test('check the pair token/data passed in parameters', async () => {
  const endpoint = 'fake-endpoint'
  const resultRequest = { mockResult: 'TEST' }
  const token = 'fake-token'
  const data = { fake: 'fake-data' }
  let request
  server.use(
    rest.post(`${AUTH_URL}/${endpoint}`, async (req, res, ctx) => {
      request = req
      return res(ctx.json(resultRequest))
    }),
  )
  await clientAuth(endpoint, { token, data })
  expect(request.headers.get('Authorization')).toBe(`Bearer ${token}`)
  expect(data).toEqual(request.body)
})

test('check the error message on 401', async () => {
  const endpoint = 'fake-endpoint'
  const resultRequest = { mockResult: 'TEST' }
  const token = 'fake-token'
  const data = { fake: 'fake-data' }
  server.use(
    rest.post(`${AUTH_URL}/${endpoint}`, async (req, res, ctx) => {
      return res(ctx.status(401), ctx.json(resultRequest))
    }),
  )
  const error = await clientNetFlix(endpoint, {
    token,
    data,
    method: 'POST',
  }).catch(error => error)
  expect(error.message).toMatchInlineSnapshot(`"Authentification incorrecte"`)
  expect(authNetflix.logout).toHaveBeenCalledTimes(1)
})

test('check the error message on 400', async () => {
  const endpoint = 'fake-endpoint'
  const resultError = { message: 'fake-error' }
  server.use(
    rest.get(`${AUTH_URL}/${endpoint}`, async (req, res, ctx) => {
      return res(ctx.status(400), ctx.json(resultError))
    }),
  )

  await expect(clientNetFlix(endpoint)).rejects.toEqual(resultError)
})
