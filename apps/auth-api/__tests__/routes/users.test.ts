import * as request from 'supertest'
import * as mockingoose from 'mockingoose'
import UsersRoute from '../../src/app/routes/users.route'
import App from '../../src/app/app'
import { Server } from 'http'
import { mockUser } from '../support/users'
import { UserModel } from '../../src/app/models/user.model'
import exp = require('constants')

describe('Check users route', () => {
  const app = new App([new UsersRoute()])
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

  test('get user works', async () => {
    mockingoose(UserModel).toReturn(mockUser, 'findOne');

    const response = await request(server).get(`/users/${mockUser._id}`)
    expect(response.status).toBe(200)
    expect(response.body).toMatchObject({
      username: mockUser.username,
      email: mockUser.email
    })
  })
})
