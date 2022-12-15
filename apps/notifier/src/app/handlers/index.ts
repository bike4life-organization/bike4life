import { routeOptimizedHandler } from "./route-optimized";
import { userCreatedHandler } from "./user-created";
import { routeCreatedHandler } from "./route-created";


export enum EventType {
  USER_CREATED = 'UserCorrectlyCreated',
  ROUTE_OPTIMIZED = 'RouteOptimizedNotification',
  ROUTE_CREATED = 'RouteCorrectlyCreated',
}

const handlers: Record<EventType, (payload: Record<string, unknown>) => void> = {
  [EventType.USER_CREATED]: userCreatedHandler,
  [EventType.ROUTE_OPTIMIZED]: routeOptimizedHandler,
  [EventType.ROUTE_CREATED]: routeCreatedHandler,
}

export function getMessageHandler(type: EventType) {
  return handlers[type];
}
