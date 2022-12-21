import { Message } from "./client";

export enum NotifierMessageTypes {
  ROUTE_CREATED = "ROUTE_CREATED",
  ROUTE_UPDATED = "ROUTE_UPDATED",
  ROUTE_DELETED = "ROUTE_DELETED",
  USER_CREATED = "USER_CREATED",
  ROUTE_OPTIMIZED = "ROUTE_OPTIMIZED",
}

export interface NotifierMessage extends Message {
  attributes: {
    type: NotifierMessageTypes;
  };
  payload: {
    to: string;
    route: {
      name: string;
      description: string;
      date: Date;
    };
  };
}
