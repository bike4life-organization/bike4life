import { PubSubClient, logger, NotifierMessage, NotifierMessageTypes } from "@bike4life/commons"
import { Route } from "../models/route.model"
import { pubsubSettings } from '../settings'

export class NotifierService {

  private pubSubClient: PubSubClient

  constructor() {
    this.pubSubClient = new PubSubClient(pubsubSettings.projectId, logger)
  }

  async sendRouteCreatedNotification(route: Route): Promise<void> {
    try {
      if (!route.userId) {
        throw new Error('The route does not belong to a user')
      }
      const routeCreatedMessage: NotifierMessage = {
        attributes: {
          type: NotifierMessageTypes.ROUTE_CREATED
        },
        payload: {
          route_id: route._id,
          user_id: route.userId,
          user_email: route.userEmail
        }
      }
      await this.pubSubClient.publishMessage(pubsubSettings.notifierTopic, routeCreatedMessage)
    } catch (error) {
      // If that fails, we should silently fail as this shouldn't block the request flow
      logger.error(error)
    }
  }
}