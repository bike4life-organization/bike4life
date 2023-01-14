import { PubSubClient, logger, RouteCheckerEventType, RouteCheckerMessage, InterestingPlaces } from "@bike4life/commons"
import axios from "axios"
import { Route } from "../models/route.model"
import { pubsubSettings, routeCheckerAPISecretKey } from '../settings'

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

  async getRouteInterestingPlaces(routeId: string): Promise<InterestingPlaces[]> {
    try {
      const interestingPlaces = await axios.get<InterestingPlaces[]>(`${process.env.ROUTE_CHECKER_URL}/places/${routeId}`, {
        headers: {
          secret_key: routeCheckerAPISecretKey
        }
      })
        .then((response) => response.data)
      return interestingPlaces
    } catch (error) {
      return []
    }
  }
}