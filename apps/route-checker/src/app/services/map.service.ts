import axios, { AxiosPromise, AxiosRequestConfig } from 'axios';
import { mapSettings } from "../../../settings";
import { findMax, findMin } from "../util/utils";
import { Coordinates, InterestingPlaces } from "@bike4life/commons";

const config: AxiosRequestConfig = {
    headers: {
        'Content-Type': 'application/json',
        'Accept-Encoding': 'application/json',
    }
};

class MapService {
    findPlacesByRadius(coordinates: Coordinates, radius = 1000): AxiosPromise<InterestingPlaces[]> {
        return axios
            .get(`${mapSettings.url}/radius?apikey=${mapSettings.key}&radius=${radius}&lon=${coordinates.lon}&lat=${coordinates.lat}&format=json`, config);
    }

    findPlacesByBBox(coordinates: Coordinates[]): AxiosPromise<InterestingPlaces[]> {
        if (!coordinates?.length)
            return Promise.resolve(null);

        const lonMin = findMin("lon", coordinates);
        const lonMax = findMax("lon", coordinates);
        const latMin = findMin("lat", coordinates);
        const latMax = findMax("lat", coordinates);

        return axios
            .get(`${mapSettings.url}/bbox?apikey=${mapSettings.key}&lon_min=${lonMin}&lon_max=${lonMax}&lat_min=${latMin}&lat_max=${latMax}&kinds=interesting_places&format=json`, config);
    }

}

const mapService = new MapService();
export default mapService;
