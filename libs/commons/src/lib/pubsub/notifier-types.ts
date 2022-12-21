import { Message } from "./client";

export enum NotifierMessageTypes {
  ROUTE_CREATED = "ROUTE_CREATED",
  USER_CREATED = "USER_CREATED",
  ROUTE_OPTIMIZED = "ROUTE_OPTIMIZED",
}

export interface NotifierMessage extends Message {
  attributes: {
    type: NotifierMessageTypes
  }
  payload: any
}

export interface Notification {
  messageType: string;
  payload: Record<string, unknown>;
  date?: Date;
}
