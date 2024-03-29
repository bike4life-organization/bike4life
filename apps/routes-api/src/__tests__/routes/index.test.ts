
import * as request from 'supertest'
import * as mockingoose from 'mockingoose'
import IndexRoute from '../../app/routes/index.route'
import App from '../../app/app'
import { Server } from 'http'
import { RouteModel } from '../../app/models/route.model'

describe('Check index route', () => {
    const app = new App([new IndexRoute()])
    let server: Server

    beforeAll(async () => {
        server = await app.app.listen()
    })

    afterAll(() => {
        server.close()
    })

    afterEach(() => {
        jest.clearAllMocks().restoreAllMocks()
    })

    test('IndexRoute works', async () => {
        mockingoose(RouteModel).toReturn()

        const response = await request(server).get('/')
        expect(response.status).toBe(200)
    })
})
