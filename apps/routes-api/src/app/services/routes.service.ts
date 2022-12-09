import { Route, RouteModel } from "../models/route.model"

export class RoutesService {

    async removeRoute(id: string): Promise<Route> {
        const result = await RouteModel
            .findByIdAndDelete(id)
        return result
    }

    async createRoute(newRoute: Route): Promise<Route> {
        const result = await RouteModel
            .create(newRoute)
        return result
    }

    async getRouteById(id: string): Promise<Route> {
        return RouteModel
            .findById(id)
            .exec()
    }

    async updateRoute(putRoute: Route, id: string): Promise<Route> {
        const result = await RouteModel.findByIdAndUpdate(id, putRoute, {new:true})
        return result
    }
}
