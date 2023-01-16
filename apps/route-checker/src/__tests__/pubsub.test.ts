import RoutesPlace from "../app/routes/routes.place";
import {Server} from 'http'
import * as request from 'supertest'
import * as mockingoose from 'mockingoose'
import {InterestingPlacesModel} from "../app/models/interesting.places.model";
import {mockInterestingPlaces} from "./support/interesting.places";
import App from "../app/app";


describe('PubSub Tests ', () => {
    const app = new App([new RoutesPlace()])
    let server: Server

    beforeAll(async () => {
        server = await app.app.listen()
        process.env.API_SECRET_KEY = 'API_SECRET_KEY';
    })

    afterAll(() => {
        server.close()
        process.env.API_SECRET_KEY = '';
    })

    afterEach(() => {
        jest.clearAllMocks().restoreAllMocks()
        mockingoose.resetAll()
    })

    test('GET /places/:id should return a 200', async () => {
        mockingoose(InterestingPlacesModel).toReturn([mockInterestingPlaces], 'find')

        const response = await request(server)
            .get('/places/:id')
            .set({'secret_key': process.env.API_SECRET_KEY})
            .send(mockInterestingPlaces.routeId)

        expect(response.status).toBe(200)
        expect(response.body.length).toBe(1)
        expect(response.body[0]).toHaveProperty('name', mockInterestingPlaces.name)
    })

})