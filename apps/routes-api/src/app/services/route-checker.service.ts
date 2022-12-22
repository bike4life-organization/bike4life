import { PubSubClient, logger, RouteCheckerEventType, RouteCheckerMessage } from "@bike4life/commons"
import { Route } from "../models/route.model"
import { pubsubSettings } from '../settings'

export class RouteCheckerService {

  private pubSubClient: PubSubClient

  constructor() {
    this.pubSubClient = new PubSubClient(pubsubSettings.projectId, logger)
  }

  async sendRouteCreatedNotification(route: Route): Promise<void> {
    try {
      if (!route.userId) {
        throw new Error('The route does not belong to a user')
      }
      const routeCreatedMessage: RouteCheckerMessage = {
        attributes: {
          type: RouteCheckerEventType.CREATED
        },
        payload: {
          _id: route._id,
          coordinates: route.coordinates.map((coordinate) => { return { lat: coordinate[0], lon: coordinate[1] } })
        }
      }
      await this.pubSubClient.publishMessage(pubsubSettings.routeCheckerTopic, routeCreatedMessage)
    } catch (error) {
      // If that fails, we should silently fail as this shouldn't block the request flow
      logger.error(error)
    }
  }
}
