import {EventData, EventType} from "../types/types";
import mapService from "./map.service";
import interestingPlacesService from "./interesting.places.service";

const eventsHandlers = {
    [EventType.CREATED]: routeCreatedHandler,
    [EventType.UPDATED]: routeUpdatedHandler,
    [EventType.DELETED]: routeDeletedHandler,
}

function routeCreatedHandler(event: EventData) {
    mapService.findPlacesByBBox(event.coordinates).then(response => {
        if (!isOK(response) || !event?._id?.length)
            return;
        createInterestingPlaces(response, event);
    });
}

function routeUpdatedHandler(event: EventData) {
    mapService.findPlacesByBBox(event.coordinates).then(response => {
        if (!isOK(response) || !event?._id?.length)
            return;
        routeDeletedHandler(event);
        createInterestingPlaces(response, event);
    });
}

async function routeDeletedHandler(event: EventData) {
    await interestingPlacesService.removeInterestingPlaces(event._id);
}

function createInterestingPlaces(response: any, event: EventData) {
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
