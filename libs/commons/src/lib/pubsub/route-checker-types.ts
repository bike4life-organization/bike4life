import { Message } from "./client";

export type Coordinates = {
  lon: number;
  lat: number;
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
