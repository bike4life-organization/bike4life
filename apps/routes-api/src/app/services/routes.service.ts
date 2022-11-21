import {Route, RouteModel} from "../models/route.model"

export class RoutesService{


    async createRoute(newRoute: Route): Promise <Route> {
            const result = await RouteModel
             .create(newRoute)
            return result
        
    } 
}