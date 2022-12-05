import { routeOptimizedHandler } from "./route-optimized";
import { userCreatedHandler } from "./user-created";

export enum EventType {
  USER_CREATED = 'UserCorrectlyCreated',
  ROUTE_OPTIMIZED = 'RouteOptimizedNotification'
}

const handlers: Record<EventType, (payload: Record<string, unknown>) => void> = {
  [EventType.USER_CREATED]: userCreatedHandler,
  [EventType.ROUTE_OPTIMIZED]: routeOptimizedHandler,
}

export function getMessageHandler(type: EventType) {
  return handlers[type];
}
