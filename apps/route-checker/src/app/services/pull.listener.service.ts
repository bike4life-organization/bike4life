import {EventData, EventType} from "../types/types";
import interestingPlacesService from "./interesting.places.service";
import mapService from "./map.service";

class PullListenerService {

    async handleEvents(type: string, event: EventData) {
        if (EventType.CREATED !== type && EventType.UPDATED !== type)
            return;
        if (!event?._id?.length || !event?.coordinates?.length)
            return;
        if (EventType.UPDATED === type)
            await interestingPlacesService.removeInterestingPlaces(event._id);
        mapService.findPlacesByBBox(event.coordinates).then(response => {
            if (!this.isOK(response))
                return;
            response.data.forEach(value => value.routeId = event._id);
            interestingPlacesService.createInterestingPlaces(response.data);
        });
    }

    isOK(response: any) {
        return response?.status === 200 && response.data?.length > 0;
    }

}

const pullListenerService = new PullListenerService();
export default pullListenerService;
