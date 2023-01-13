import {InterestingPlacesModel} from "../models/interesting.places.model";
import {InterestingPlaces} from "../types/types";


class InterestingPlacesService {

    async createInterestingPlaces(places: InterestingPlaces[]) {
        await InterestingPlacesModel.insertMany(places);
    }

    async removeInterestingPlaces(id: string) {
        await InterestingPlacesModel.deleteMany({routeId: id});
    }

    async listInterestingPlaces(id: string): Promise<InterestingPlaces[]> {
        return InterestingPlacesModel.find({routeId: id}).exec()
    }

}

const interestingPlacesService = new InterestingPlacesService();
export default interestingPlacesService;
