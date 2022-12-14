import { Route, RouteModel } from "../models/route.model"
import { NotifierService } from "./notifier.service"
import { RouteCheckerService } from "./route-checker.service"

export class RoutesService {
    private notifierService: NotifierService
    private routeCheckerService: RouteCheckerService

    constructor() {
        this.notifierService = new NotifierService()
        this.routeCheckerService = new RouteCheckerService();
    }

    async removeRoute(id: string, loggedUserId: string): Promise<Route> {
        const route = await this.getRouteById(id)
        if (route.userId !== loggedUserId) {
            throw new Error('You are not allowed to access this resource')
        }
        const result = await RouteModel
            .findByIdAndDelete(id)

        return result
    }

    async createRoute(newRoute: Route): Promise<Route> {
        const result = await RouteModel
            .create(newRoute)
        await this.notifierService.sendRouteCreatedNotification(result)
        await this.routeCheckerService.sendRouteCreatedNotification(result)
        return result
    }

    async getRouteById(id: string): Promise<Route> {
        return RouteModel
            .findById(id)
            .exec()
    }

    async updateRoute(putRoute: Route, id: string, loggedUserId: string): Promise<Route> {
        const route = await this.getRouteById(id)
        if (route.userId !== loggedUserId) {
            throw new Error('You are not allowed to access this resource')
        }
        const result = await RouteModel
            .findByIdAndUpdate(id, putRoute)
        return result
    }

    async listRoutes(userId: string): Promise<Route[]> {
        return RouteModel.find({ userId }).exec()
    }
}
