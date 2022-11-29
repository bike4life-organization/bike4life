export type Coordinates = {
    lon: number;
    lat: number;
}

export interface EventData {
    _id: string;
    coordinates: Coordinates[];
}

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

export enum EventType {
    CREATED = 'routeCreated',
    UPDATED = 'routeUpdated'
}

