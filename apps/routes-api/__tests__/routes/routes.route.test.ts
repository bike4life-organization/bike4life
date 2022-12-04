import * as request from 'supertest'
import * as mockingoose from 'mockingoose'
import RoutesRoute from '../../src/app/routes/routes.route'
import App from '../../src/app/app'
import { Server } from 'http'
import { mockRoute } from '../support/routes'
import { RouteModel } from '../../src/app/models/route.model'

/* jest.mock("@bike4life/commons", () => ({
  authMiddleware: (req, res, next) => {
    req.user = mockRoute
    next()
  },
  decryptString: (encryptedPassword) => {
    return encryptedPassword
  },
  encryptString: (password) => {
    return password
  }
})); */

describe('Routes route', () => {
  const app = new App([new RoutesRoute()])
  let server: Server

  beforeAll(async () => {
    server = await app.listen()
  })

  afterAll(() => {
    server.close()
  })

  afterEach(() => {
    jest.clearAllMocks().restoreAllMocks()
    mockingoose.resetAll()
  })

  test('POST /routes should return a 201', async () => {
    jest.spyOn(RouteModel, 'create').mockImplementationOnce(async () => {
      return mockRoute
    });

    const response = await request(server).post('/routes').send(mockRoute)
    expect(response.status).toBe(201)

  })

  test('GET /routes/:id should return a 200', async () => {
    mockingoose(RouteModel).toReturn(mockRoute, 'findOne');

    const response = await request(server).get(`/routes/:id`)
    expect(response.status).toBe(200)
    expect(response.body).toMatchObject({
      coordinares: mockRoute.coordinates,
      name: mockRoute.name
    })
  })

  test('UPDATE /routes/:id should return a 200', async () => {
    mockingoose(RouteModel).toReturn(mockRoute, 'findOne');
    mockingoose(RouteModel).toReturn(mockRoute, 'update');

    const response = await request(server).put(`/routes/:id`).send({ UserId: 'user_id_1' })
    expect(response.status).toBe(200)
    expect(response.body).toMatchObject({
      coordinares: mockRoute.coordinates,
      name: mockRoute.name
    })
  })

  test('DELETE /routes/:id should return a 204', async () => {
    mockingoose(RouteModel).toReturn(mockRoute, 'deleteOne');

    const response = await request(server).delete(`/routes/:id`)
    expect(response.status).toBe(204)
  })
})
