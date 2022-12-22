import { Coordinates } from "@bike4life/commons"

export interface InterestingPlaces {
    "xid": string,
    "name": string,
    "kinds": string,
    "osm": string,
    "wikidata": string,
    "dist": number,
    "point": Coordinates
    "rate"?: number
    "routeId"?: string
}

