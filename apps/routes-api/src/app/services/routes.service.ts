import {Route, RouteModel} from "../models/route.model"

export class RoutesService{

    async getRouteById(id: string): Promise<Route> {
        return RouteModel
          .findById(id)
          .exec()
    }
    async createRoute(newRoute: Route): Promise <Route> {
        const result = await RouteModel
         .create(newRoute)
        return result
    }
    async updateRoute(putRoute: Route,id: string): Promise <Route> {
            const result = await RouteModel
             .findByIdAndUpdate(id,putRoute)
            return result
        
    } 
}