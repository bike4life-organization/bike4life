import * as request from 'supertest'
import * as mockingoose from 'mockingoose'
import UsersRoute from '../../../src/app/routes/routes.route'
import App from '../../../src/app/app'
import { Server } from 'http'
import { mockRoute } from '../support/routes'
import { RouteModel } from '../../../src/app/models/route.model'
import RoutesRoute from '../../../src/app/routes/routes.route'

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
}));

jest.mock('../../src/app/services/notifier.service') */

xdescribe('Routes route', () => {
    const app = new App([new RoutesRoute()])
    let server: Server
    const token = "mock_token"

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

        const response = await request(server).post('/routes').send(mockRoute).set('Authorization', 'Bearer ' + token)
        expect(response.status).toBe(201)
    })

    test('GET /routes should return a 200', async () => {
        mockingoose(RouteModel).toReturn(mockRoute, 'find')

        const response = await request(server).get('/routes')
        expect(response.status).toBe(200)
        /*         expect(response.body).to */
    })

    test('GET /routes/:id should return a 200', async () => {
        mockingoose(RouteModel).toReturn(mockRoute, 'findOne');

        const response = await request(server).get(`/routes/:id`)
        expect(response.status).toBe(200)
        expect(response.body).toMatchObject({
            coordinates: mockRoute.coordinates,
            name: mockRoute.name
        })
    })

    test('UPDATE /routes/:id should return a 200', async () => {
        mockingoose(RouteModel).toReturn(mockRoute, 'findOne');
        mockingoose(RouteModel).toReturn(mockRoute, 'update');

        const response = await request(server).put(`/routes`).send({ name: 'Updated route' })
        expect(response.status).toBe(200)
        expect(response.body).toMatchObject({
            name: mockRoute.name,
        })
    })

    test('DELETE /routes/:is should return a 204', async () => {
        mockingoose(RouteModel).toReturn(mockRoute, 'deleteOne');

        const response = await request(server).delete(`/routes`)
        expect(response.status).toBe(204)
    })
})
