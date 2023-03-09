import * as request from 'supertest'
import * as mockingoose from 'mockingoose'
import App from '../../app/app'
import { Server } from 'http'
import { mockRoute, mockPutRoute } from '../support/routes'
import { mockUser } from '../support/users'

import { RouteModel } from '../../app/models/route.model'
import RoutesRoute from '../../app/routes/routes.route'

jest.mock('../../app/services/notifier.service')
jest.mock('../../app/services/route-checker.service')

describe('Unauthorized Routes route', () => {
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

    test('POST /routes without authorization should return a 401', async () => {
        jest.spyOn(RouteModel, 'create').mockImplementationOnce(async () => {
            return mockRoute
        });

        const response = await request(server).post('/routes').send(mockRoute)
        expect(response.status).toBe(401)
    })

    test('GET /routes without authorization should return a 401', async () => {
        mockingoose(RouteModel).toReturn(mockRoute, 'find')

        const response = await request(server).get('/routes').send(mockRoute.userId)
        expect(response.status).toBe(401)
    })

    test('GET /routes/:id without authorization should return a 401', async () => {
        mockingoose(RouteModel).toReturn({ ...mockRoute, userId: mockUser._id }, 'findOne');

        const response = await request(server).get(`/routes/:id`).send(mockRoute._id)
        expect(response.status).toBe(401)
    })

    test('UPDATE /routes/:id without authorization should return a 401', async () => {
        mockingoose(RouteModel).toReturn({ ...mockRoute, userId: mockUser._id }, 'findOne');
        mockingoose(RouteModel).toReturn({ ...mockRoute, userId: mockUser._id }, 'findOneAndUpdate');

        const response = await request(server).put(`/routes/${mockRoute._id}`).send(mockPutRoute, mockRoute.userId, mockRoute.userId)

        expect(response.status).toBe(401)
    })

    test('DELETE /routes/:is without authorization should return a 401', async () => {
        mockingoose(RouteModel).toReturn({ ...mockRoute, userId: mockUser._id }, 'findOne');
        mockingoose(RouteModel).toReturn(mockRoute, 'deleteOne');

        const response = await request(server).delete(`/routes/${mockRoute._id}`).send(mockRoute._id)
        expect(response.status).toBe(401)
    })

})
