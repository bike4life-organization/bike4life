import {Route, RouteModel} from "../models/route.model"

export class RoutesService{

    async removeRoute(id: string): Promise <Route> {
        const result = await RouteModel
        .findByIdAndDelete(id)
        return result
    } 
}
