import { Route, RouteModel } from "../models/route.model"
import { NotifierService } from "./notifier.service"

export class RoutesService {

    private notifierService: NotifierService

    constructor() {
        this.notifierService = new NotifierService()
    }

    async removeRoute(id: string): Promise<Route> {
        const result = await RouteModel
            .findByIdAndDelete(id)
        return result
    }

    async createRoute(newRoute: Route): Promise<Route> {
        const result = await RouteModel
            .create(newRoute)
        await this.notifierService.sendRouteCreatedNotification(result)
        return result
    }

    async getRouteById(id: string): Promise<Route> {
        return RouteModel
            .findById(id)
            .exec()
    }

    async updateRoute(putRoute: Route, id: string): Promise<Route> {
        const result = await RouteModel.findByIdAndUpdate(id, putRoute)
        return result
    }
}
