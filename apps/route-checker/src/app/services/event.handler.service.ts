import mapService from "./map.service";
import interestingPlacesService from "./interesting.places.service";
import {InterestingPlaces, logger, RouteCheckerEventData, RouteCheckerEventType} from "@bike4life/commons";
import notifierService from "./notifier.service";

const eventsHandlers = {
    [RouteCheckerEventType.CREATED]: routeCreatedHandler,
    [RouteCheckerEventType.UPDATED]: routeUpdatedHandler,
    [RouteCheckerEventType.DELETED]: routeDeletedHandler,
}

function routeCreatedHandler(event: RouteCheckerEventData) {
    if (!event?._id?.length || !event?.coordinates?.length)
        return;
    mapService.findPlacesByBBox(event.coordinates).then(response => {
        if (isOK(response)) {
            createInterestingPlaces(response, event);
        }
    }).catch(err => {
        console.log(err);
        logger.error({error: err});
    });
}

function routeUpdatedHandler(event: RouteCheckerEventData) {
    if (!event?._id?.length || !event?.coordinates?.length)
        return;
    mapService.findPlacesByBBox(event.coordinates).then(response => {
        if (!isOK(response))
            return;
        routeDeletedHandler(event);
        createInterestingPlaces(response, event);
    }).catch(err => {
        console.log(err);
        logger.error({error: err});
    });
}

async function routeDeletedHandler(event: RouteCheckerEventData) {
    if (!event?._id?.length || !event?.coordinates?.length )
        return;
    await interestingPlacesService.removeInterestingPlaces(event._id);
}

function createInterestingPlaces(response: any, event: RouteCheckerEventData) {
    const data = response?.data.filter((place: InterestingPlaces) => place?.name.length > 0);
    if (!data?.length)
        return;
    data.forEach((place: InterestingPlaces) => place.routeId = event._id);
    interestingPlacesService.createInterestingPlaces(data);
    notifierService.sendInterestingPlacesNotification(event)
}

function isOK(response: any) {
    return response?.status === 200;
}

export function getEventHandler(attributes: any): (event: RouteCheckerEventData) => Promise<void> {
    const {type} = attributes
    return eventsHandlers[type]
}
