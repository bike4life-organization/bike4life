import { Message } from "./client"

export enum NotifierMessageTypes {
  ROUTE_CREATED = 'ROUTE_CREATED',
  ROUTE_UPDATED = 'ROUTE_UPDATED',
  ROUTE_DELETED = 'ROUTE_DELETED',
}

export interface NotifierMessage extends Message {
  attributes: {
    type: NotifierMessageTypes
  }
  payload: {
    to: string,
    route: {
      name: string,
      description: string,
      date: Date
    }
  }
}
