import {InterestingPlacesModel} from "../models/interesting.places.model";
import {InterestingPlaces} from "../types/types";


class InterestingPlacesService {

    async createInterestingPlaces(places: InterestingPlaces[]) {
        await InterestingPlacesModel.insertMany(places);
    }

    async removeInterestingPlaces(id: string) {
        await InterestingPlacesModel.deleteMany({routeId: id});
    }

}

const interestingPlacesService = new InterestingPlacesService();
export default interestingPlacesService;
