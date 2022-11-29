import {InterestingPlacesModel} from "../models/interesting.places.model";
import {InterestingPlaces} from "../types/types";


class InterestingPlacesService {

    createInterestingPlaces(places: InterestingPlaces[]) {
        InterestingPlacesModel.insertMany(places).then();
    }

    removeInterestingPlaces(id: string) {
        InterestingPlacesModel.deleteMany({routeId: id});
    }

}

const interestingPlacesService = new InterestingPlacesService();
export default interestingPlacesService;
