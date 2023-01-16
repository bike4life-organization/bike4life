import { Message } from "./client";

export type Coordinates = {
  lon: number;
  lat: number;
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

export enum RouteCheckerEventType {
  CREATED = 'routeCreated',
  UPDATED = 'routeUpdated',
  DELETED = 'routeDeleted'
}

export interface RouteCheckerEventData {
  _id: string;
  coordinates: Coordinates[];
}

export interface RouteCheckerMessage extends Message {
  attributes: {
    type: RouteCheckerEventType
  }
  payload: RouteCheckerEventData
}
