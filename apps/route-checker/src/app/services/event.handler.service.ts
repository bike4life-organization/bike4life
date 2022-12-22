import mapService from "./map.service";
import interestingPlacesService from "./interesting.places.service";
import {RouteCheckerEventData, RouteCheckerEventType} from "@bike4life/commons";

const eventsHandlers = {
    [RouteCheckerEventType.CREATED]: routeCreatedHandler,
    [RouteCheckerEventType.UPDATED]: routeUpdatedHandler,
    [RouteCheckerEventType.DELETED]: routeDeletedHandler,
}

function routeCreatedHandler(event: RouteCheckerEventData) {
    mapService.findPlacesByBBox(event.coordinates).then(response => {
        if (!isOK(response) || !event?._id?.length)
            return;
        createInterestingPlaces(response, event);
    });
}

function routeUpdatedHandler(event: RouteCheckerEventData) {
    mapService.findPlacesByBBox(event.coordinates).then(response => {
        if (!isOK(response) || !event?._id?.length)
            return;
        routeDeletedHandler(event);
        createInterestingPlaces(response, event);
    });
}

async function routeDeletedHandler(event: RouteCheckerEventData) {
    await interestingPlacesService.removeInterestingPlaces(event._id);
}

function createInterestingPlaces(response: any, event: RouteCheckerEventData) {
    response.data.forEach(value => value.routeId = event._id);
    interestingPlacesService.createInterestingPlaces(response.data);
}

function isOK(response: any) {
    return response?.status === 200 && response.data?.length > 0;
}

export function getEventHandler(attributes: any): (payload: string) => Promise<void> {
    const {type} = attributes
    return eventsHandlers[type]
}
