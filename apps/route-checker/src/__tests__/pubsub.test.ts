import RoutesPlace from "../app/routes/routes.place";
import {Server} from 'http'
import * as mockingoose from 'mockingoose'
import {InterestingPlacesModel} from "../app/models/interesting.places.model";
import {mockInterestingPlaces} from "./support/interesting.places";
import App from "../app/app";
import {PubSubClient, RouteCheckerEventType} from "@bike4life/commons";
import MapService from "../app/services/map.service";
import {mockRouteCheckerEventData} from "./support/route.checker.event.data";
import {getEventHandler} from "../app/services/event.handler.service";


describe('PubSub Tests ', () => {
    const app = new App([new RoutesPlace()])
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

    //RouteCheckerEventType.CREATED
    test('RouteCheckerEventType.CREATED - status 200', async () => {
        const publishMessageSpy = jest.spyOn(PubSubClient.prototype, 'publishMessage');
        const interestingPlacesModelSpy = jest.spyOn(InterestingPlacesModel, 'insertMany');
        const findPlacesByBBoxSpy = jest.spyOn(MapService, 'findPlacesByBBox')
            .mockReturnValue(Promise.resolve({
                status: 200,
                data: [mockInterestingPlaces]
            }));


        await getEventHandler({type: RouteCheckerEventType.CREATED})(mockRouteCheckerEventData)

        expect(findPlacesByBBoxSpy).toHaveBeenCalledTimes(1)
        expect(publishMessageSpy).toHaveBeenCalledTimes(1)
        expect(interestingPlacesModelSpy).toHaveBeenCalledTimes(1)

    })

    test('RouteCheckerEventType.CREATED - status 500', async () => {
        const publishMessageSpy = jest.spyOn(PubSubClient.prototype, 'publishMessage');
        const interestingPlacesModelSpy = jest.spyOn(InterestingPlacesModel, 'insertMany');
        const findPlacesByBBoxSpy = jest.spyOn(MapService, 'findPlacesByBBox')
            .mockReturnValue(Promise.resolve({
                status: 500,
                data: [mockInterestingPlaces]
            }));


        await getEventHandler({type: RouteCheckerEventType.CREATED})(mockRouteCheckerEventData)

        expect(findPlacesByBBoxSpy).toHaveBeenCalledTimes(1)
        expect(publishMessageSpy).toHaveBeenCalledTimes(0)
        expect(interestingPlacesModelSpy).toHaveBeenCalledTimes(0)
    })

    test('RouteCheckerEventType.CREATED - routeId empty ', async () => {
        const publishMessageSpy = jest.spyOn(PubSubClient.prototype, 'publishMessage');
        const interestingPlacesModelSpy = jest.spyOn(InterestingPlacesModel, 'insertMany');
        const findPlacesByBBoxSpy = jest.spyOn(MapService, 'findPlacesByBBox')
            .mockReturnValue(Promise.resolve({
                status: 200,
                data: [mockInterestingPlaces]
            }));


        await getEventHandler({type: RouteCheckerEventType.CREATED})({...mockRouteCheckerEventData, _id: ""})

        expect(findPlacesByBBoxSpy).toHaveBeenCalledTimes(0)
        expect(publishMessageSpy).toHaveBeenCalledTimes(0)
        expect(interestingPlacesModelSpy).toHaveBeenCalledTimes(0)

    })

    test('RouteCheckerEventType.CREATED - coordinates empty ', async () => {
        const publishMessageSpy = jest.spyOn(PubSubClient.prototype, 'publishMessage');
        const interestingPlacesModelSpy = jest.spyOn(InterestingPlacesModel, 'insertMany');
        const findPlacesByBBoxSpy = jest.spyOn(MapService, 'findPlacesByBBox')
            .mockReturnValue(Promise.resolve({
                status: 200,
                data: [mockInterestingPlaces]
            }));


        await getEventHandler({type: RouteCheckerEventType.CREATED})({...mockRouteCheckerEventData, coordinates: []})

        expect(findPlacesByBBoxSpy).toHaveBeenCalledTimes(0)
        expect(publishMessageSpy).toHaveBeenCalledTimes(0)
        expect(interestingPlacesModelSpy).toHaveBeenCalledTimes(0)

    })

    //RouteCheckerEventType.UPDATED
    test('RouteCheckerEventType.UPDATED - status 200', async () => {
        const publishMessageSpy = jest.spyOn(PubSubClient.prototype, 'publishMessage');
        const insertInterestingPlacesModelSpy = jest.spyOn(InterestingPlacesModel, 'insertMany');
        const deleteInterestingPlacesModelSpy = jest.spyOn(InterestingPlacesModel, 'deleteMany');
        const findPlacesByBBoxSpy = jest.spyOn(MapService, 'findPlacesByBBox')
            .mockReturnValue(Promise.resolve({
                status: 200,
                data: [mockInterestingPlaces]
            }));


        await getEventHandler({type: RouteCheckerEventType.UPDATED})(mockRouteCheckerEventData)

        expect(findPlacesByBBoxSpy).toHaveBeenCalledTimes(1)
        expect(publishMessageSpy).toHaveBeenCalledTimes(1)
        expect(insertInterestingPlacesModelSpy).toHaveBeenCalledTimes(1)
        expect(deleteInterestingPlacesModelSpy).toHaveBeenCalledTimes(1)

    })

    test('RouteCheckerEventType.UPDATED - status 500', async () => {
        const publishMessageSpy = jest.spyOn(PubSubClient.prototype, 'publishMessage');
        const insertInterestingPlacesModelSpy = jest.spyOn(InterestingPlacesModel, 'insertMany');
        const deleteInterestingPlacesModelSpy = jest.spyOn(InterestingPlacesModel, 'deleteMany');
        const findPlacesByBBoxSpy = jest.spyOn(MapService, 'findPlacesByBBox')
            .mockReturnValue(Promise.resolve({
                status: 500,
                data: [mockInterestingPlaces]
            }));


        await getEventHandler({type: RouteCheckerEventType.UPDATED})(mockRouteCheckerEventData)

        expect(findPlacesByBBoxSpy).toHaveBeenCalledTimes(1)
        expect(publishMessageSpy).toHaveBeenCalledTimes(0)
        expect(insertInterestingPlacesModelSpy).toHaveBeenCalledTimes(0)
        expect(deleteInterestingPlacesModelSpy).toHaveBeenCalledTimes(0)
    })

    test('RouteCheckerEventType.UPDATED - routeId empty ', async () => {
        const publishMessageSpy = jest.spyOn(PubSubClient.prototype, 'publishMessage');
        const insertInterestingPlacesModelSpy = jest.spyOn(InterestingPlacesModel, 'insertMany');
        const deleteInterestingPlacesModelSpy = jest.spyOn(InterestingPlacesModel, 'deleteMany');
        const findPlacesByBBoxSpy = jest.spyOn(MapService, 'findPlacesByBBox')
            .mockReturnValue(Promise.resolve({
                status: 200,
                data: [mockInterestingPlaces]
            }));


        await getEventHandler({type: RouteCheckerEventType.UPDATED})({...mockRouteCheckerEventData, _id: ""})

        expect(findPlacesByBBoxSpy).toHaveBeenCalledTimes(0)
        expect(publishMessageSpy).toHaveBeenCalledTimes(0)
        expect(insertInterestingPlacesModelSpy).toHaveBeenCalledTimes(0)
        expect(deleteInterestingPlacesModelSpy).toHaveBeenCalledTimes(0)

    })

    test('RouteCheckerEventType.UPDATED - coordinates empty ', async () => {
        const publishMessageSpy = jest.spyOn(PubSubClient.prototype, 'publishMessage');
        const insertInterestingPlacesModelSpy = jest.spyOn(InterestingPlacesModel, 'insertMany');
        const deleteInterestingPlacesModelSpy = jest.spyOn(InterestingPlacesModel, 'deleteMany');
        const findPlacesByBBoxSpy = jest.spyOn(MapService, 'findPlacesByBBox')
            .mockReturnValue(Promise.resolve({
                status: 200,
                data: [mockInterestingPlaces]
            }));


        await getEventHandler({type: RouteCheckerEventType.UPDATED})({...mockRouteCheckerEventData, coordinates: []})

        expect(findPlacesByBBoxSpy).toHaveBeenCalledTimes(0)
        expect(publishMessageSpy).toHaveBeenCalledTimes(0)
        expect(insertInterestingPlacesModelSpy).toHaveBeenCalledTimes(0)
        expect(deleteInterestingPlacesModelSpy).toHaveBeenCalledTimes(0)

    })

    // RouteCheckerEventType.DELETED
    test('RouteCheckerEventType.DELETED - successful ', async () => {
        const deleteInterestingPlacesModelSpy = jest.spyOn(InterestingPlacesModel, 'deleteMany');
        await getEventHandler({type: RouteCheckerEventType.DELETED})(mockRouteCheckerEventData)
        expect(deleteInterestingPlacesModelSpy).toHaveBeenCalledTimes(1)

    })

    test('RouteCheckerEventType.DELETED - routeId empty ', async () => {
        const deleteInterestingPlacesModelSpy = jest.spyOn(InterestingPlacesModel, 'deleteMany');
        await getEventHandler({type: RouteCheckerEventType.DELETED})({...mockRouteCheckerEventData, _id: ""})
        expect(deleteInterestingPlacesModelSpy).toHaveBeenCalledTimes(0)

    })

    test('RouteCheckerEventType.DELETED - coordinates empty ', async () => {
        const deleteInterestingPlacesModelSpy = jest.spyOn(InterestingPlacesModel, 'deleteMany');
        await getEventHandler({type: RouteCheckerEventType.DELETED})({...mockRouteCheckerEventData, coordinates: []})
        expect(deleteInterestingPlacesModelSpy).toHaveBeenCalledTimes(0)

    })

})