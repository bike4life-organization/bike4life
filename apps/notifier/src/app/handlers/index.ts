import { routeOptimizedHandler } from "./route-optimized";
import { userCreatedHandler } from "./user-created";
import { routeCreatedHandler } from "./route-created";
import { NotifierMessageTypes } from '@bike4life/commons'

const handlers: Record<NotifierMessageTypes, (payload: Record<string, unknown>) => void> = {
  [NotifierMessageTypes.USER_CREATED]: userCreatedHandler,
  [NotifierMessageTypes.ROUTE_OPTIMIZED]: routeOptimizedHandler,
  [NotifierMessageTypes.ROUTE_CREATED]: routeCreatedHandler
}

export function getMessageHandler(type: NotifierMessageTypes) {
  return handlers[type];
}
