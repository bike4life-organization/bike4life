import * as request from 'supertest'
import * as mockingoose from 'mockingoose'
import App from '../../src/app/app'
import { Server } from 'http'
import { mockRoute, mockPutRoute } from '../support/routes'
import { mockUser } from '../support/users'

import { RouteModel } from '../../src/app/models/route.model'
import RoutesRoute from '../../src/app/routes/routes.route'

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
    },
}));

jest.mock('../../src/app/services/notifier.service')
jest.mock('../../src/app/services/route-checker.service')

describe('Routes route', () => {
    const app = new App([new RoutesRoute()])
    let server: Server

    beforeAll(async () => {
        server = await app.app.listen()
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

    test('GET /routes should return a 200', async () => {
        mockingoose(RouteModel).toReturn(mockRoute, 'find')

        const response = await request(server).get('/routes').send(mockRoute.userId)
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('name', mockRoute.name)
    })

    test('GET /routes should return a 404 if the user do not have any routes', async () => {
        mockingoose(RouteModel).toReturn(null, 'find');

        const response = await request(server).get('/routes').send(mockRoute.userId)
        expect(response.status).toBe(404)
        expect(response).toBeNull
    })

    test('GET /routes/:id should return a 200', async () => {
        mockingoose(RouteModel).toReturn({ ...mockRoute, userId: mockUser._id }, 'findOne');

        const response = await request(server).get(`/routes/:id`).send(mockRoute._id)
        expect(response.status).toBe(200)
        expect(response.body).toMatchObject({
            coordinates: mockRoute.coordinates,
            name: mockRoute.name
        })
    })

    test('GET /routes/:id should return a 403 if the user is not the owner', async () => {
        mockingoose(RouteModel).toReturn({ ...mockRoute, userId: 'different id' }, 'findOne');

        const response = await request(server).get(`/routes/:id`).send(mockRoute._id)
        expect(response.status).toBe(403)
    })

    test('GET /routes/:id should return a 404 if the route is not found', async () => {
        mockingoose(RouteModel).toReturn(null, 'findOne');

        const response = await request(server).get(`/routes/:id`).send(mockRoute._id)
        expect(response.status).toBe(404)
        expect(response).toBeNull
    })

    test('UPDATE /routes/:id should return a 200', async () => {
        mockingoose(RouteModel).toReturn({ ...mockRoute, userId: mockUser._id }, 'findOne');
        mockingoose(RouteModel).toReturn({ ...mockRoute, userId: mockUser._id }, 'findOneAndUpdate');

        const response = await request(server).put(`/routes/${mockRoute._id}`).send(mockPutRoute, mockRoute.userId, mockRoute.userId)

        expect(response.status).toBe(200)
    })

    test('UPDATE /routes/:id should return a 403 if user try to modify de route id', async () => {
        mockingoose(RouteModel).toReturn({ ...mockRoute, userId: mockUser._id }, 'findOne');
        mockingoose(RouteModel).toReturn({ ...mockRoute, userId: mockUser._id }, 'findOneAndUpdate');

        const response = await request(server).put(`/routes/${mockRoute._id}`).send({ _id: "new route id" }, mockRoute.userId, mockRoute.userId)

        expect(response.status).toBe(403)
    })

    test('UPDATE /routes/:id should return a 400 if the date is in the wrong format', async () => {
        mockingoose(RouteModel).toReturn({ ...mockRoute, userId: mockUser._id }, 'findOne');
        mockingoose(RouteModel).toReturn({ ...mockRoute, userId: mockUser._id }, 'findOneAndUpdate');

        const response = await request(server).put(`/routes/${mockRoute._id}`).send({ date: "wrong format" }, mockRoute.userId, mockRoute.userId)

        expect(response.status).toBe(400)
    })

    test('DELETE /routes/:is should return a 204', async () => {
        mockingoose(RouteModel).toReturn({ ...mockRoute, userId: mockUser._id }, 'findOne');
        mockingoose(RouteModel).toReturn(mockRoute, 'deleteOne');

        const response = await request(server).delete(`/routes/${mockRoute._id}`).send(mockRoute._id)
        expect(response.status).toBe(204)
    })
})
