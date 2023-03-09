import { PubSubClient, logger, RouteCheckerEventType, RouteCheckerMessage, InterestingPlaces } from "@bike4life/commons"
import axios from "axios"
import { Route } from "../models/route.model"
import { pubsubSettings, routeCheckerAPISecretKey } from '../settings'

export class RouteCheckerService {

  private pubSubClient: PubSubClient

  constructor() {
    this.pubSubClient = new PubSubClient(pubsubSettings.projectId, logger)
  }

  async sendRouteNotification(route: Route, type: RouteCheckerEventType): Promise<void> {
    try {
      if (!route.userId || !route.userEmail) {
        throw new Error('The user data is not valid')
      }
      const message: RouteCheckerMessage = {
          attributes: {
              type
          },
          payload: {
              _id: route._id,
              coordinates: route.coordinates.map((coordinate) => {
                  return {lat: coordinate[1], lon: coordinate[0]}
              }),
              user_id: route.userId,
              user_email: route.userEmail
          }
      }
      await this.pubSubClient.publishMessage(pubsubSettings.routeCheckerTopic, message)
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