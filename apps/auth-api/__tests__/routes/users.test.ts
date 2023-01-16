import * as request from 'supertest'
import * as mockingoose from 'mockingoose'
import UsersRoute from '../../src/app/routes/users.route'
import App from '../../src/app/app'
import { Server } from 'http'
import { mockUser } from '../support/users'
import { UserModel } from '../../src/app/models/user.model'

jest.mock("@bike4life/commons", () => ({
  authMiddleware: (req, res, next) => {
    req.user = mockUser
    next()
  },
  decryptString: (encryptedPassword) => {
    return encryptedPassword
  },
  encryptString: (password) => {
    return password
  }
}));

jest.mock('../../src/app/services/notifier.service')

describe('Users route', () => {
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
    mockingoose.resetAll()
  })

  test('POST /users should return a 201', async () => {
    jest.spyOn(UserModel, 'create').mockImplementationOnce(async () => {
      return mockUser
    });

    const response = await request(server).post('/users').send(mockUser)
    expect(response.status).toBe(201)
  })

  test('POST /users/login should return a 200', async () => {
    mockingoose(UserModel).toReturn(mockUser, 'findOne')

    const response = await request(server).post('/users/login').send({ email: mockUser.email, password: mockUser.password })
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('token')
  })

  test('GET /users/me should return a 200', async () => {
    mockingoose(UserModel).toReturn(mockUser, 'findOne');

    const response = await request(server).get(`/users/me`)
    expect(response.status).toBe(200)
    expect(response.body).toMatchObject({
      username: mockUser.username,
      email: mockUser.email
    })
  })

  test('UPDATE /users should return a 200', async () => {
    mockingoose(UserModel).toReturn(mockUser, 'findOne');
    mockingoose(UserModel).toReturn(mockUser, 'update');

    const response = await request(server).put(`/users`).send({ firstName: 'TestName' })
    expect(response.status).toBe(200)
    expect(response.body).toMatchObject({
      username: mockUser.username,
      email: mockUser.email,
      emailVerified: false,
      avatar: expect.any(String),
      _id: expect.any(String),
    })
  })

  test('DELETE /users should return a 204', async () => {
    mockingoose(UserModel).toReturn(mockUser, 'deleteOne');

    const response = await request(server).delete(`/users`)
    expect(response.status).toBe(204)
  })
})
