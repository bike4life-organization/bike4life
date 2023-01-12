import * as request from 'supertest'
import * as mockingoose from 'mockingoose'
import App from '../../../src/app/app'
import { Server } from 'http'
import { mockRoute } from '../support/routes'
import { mockUser } from '../../../../auth-api/__tests__/support/users'

import { RouteModel } from '../../../src/app/models/route.model'
import RoutesRoute from '../../../src/app/routes/routes.route'

/* jest.mock("@bike4life/commons", () => ({
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
jest.mock('../../src/app/services/route-checker.service') */

xdescribe('Routes route', () => {
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
        mockingoose(RouteModel).toReturn(mockRoute, 'create');

        const response = await request(server).post('/routes').send(mockRoute)
        expect(response.status).toBe(201)
        expect(response.name).toBe(mockRoute.name)
    })

    test('GET /routes should return a 200', async () => {
        mockingoose(RouteModel).toReturn(mockRoute, 'find')

        const response = await request(server).get('/routes').send(mockRoute.userId)
        expect(response.status).toBe(200)
        expect(response).toHaveProperty('name', mockRoute.name)
    })

    test('GET /routes/:id should return a 200', async () => {
        mockingoose(RouteModel).toReturn(mockRoute, 'findOne');

        const response = await request(server).get(`/routes/:id`).send(mockRoute._id)
        expect(response.status).toBe(200)
        expect(response.body).toMatchObject({
            coordinates: mockRoute.coordinates,
            name: mockRoute.name
        })
    })

    test('UPDATE /routes/:id should return a 200', async () => {
        mockingoose(RouteModel).toReturn(mockRoute, 'findOne');
        mockingoose(RouteModel).toReturn(mockRoute, 'findOneAndUpdate');

        const response = await request(server).put(`/routes`).send(mockRoute, mockRoute.userId, mockRoute.userId)

        expect(response.status).toBe(200)
        expect(response.name).toMatch(mockRoute.name)
    })

    test('DELETE /routes/:is should return a 204', async () => {
        mockingoose(RouteModel).toReturn(mockRoute, 'findOne');
        mockingoose(RouteModel).toReturn(mockRoute, 'delete');

        const response = await request(server).delete(`/routes`).send(mockRoute._id)
        expect(response.status).toBe(204)
        expect(response).toBeNull
    })
})
