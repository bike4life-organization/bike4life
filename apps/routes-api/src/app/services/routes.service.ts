import {Route, RouteModel} from "../models/route.model"

export class RoutesService{

    async updateRoute(putRoute: Route,id: string): Promise <Route> {
            const result = await RouteModel.findByIdAndUpdate(id,putRoute)
            return result
        
    } 
}