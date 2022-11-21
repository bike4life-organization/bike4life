import * as request from 'supertest'
import IndexRoute from '../../src/app/routes/index.route'
import App from '../../src/app/app'
import { Server } from 'http'

describe('Check index route', () => {
  const app = new App([new IndexRoute()])
  let server: Server

  beforeAll(async () => {
    server = await app.listen()
  })

  afterAll(() => {
    server.close()
  })

  afterEach(() => {
    jest.clearAllMocks().restoreAllMocks()
  })

  test('IndexRoute works', async () => {
    const response = await request(server).get('/')
    expect(response.status).toBe(200)
  })
})
