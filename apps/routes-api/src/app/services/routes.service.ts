import { decryptString, encryptString, User } from '@bike4life/commons';
import { UserModel } from 'apps/auth-api/src/app/models/user.model';   
import { Route, RouteModel } from "../models/route.model"

export class RoutesService {

    async removeRoute(id: string): Promise<Route> {
        const result = await RouteModel
        const user = await UserModel
        if( result.userId = user._id){
            .findByIdAndDelete(id)
          }
            
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
        const result = await RouteModel
        const user = await UserModel
        if( result.userId = user._id){
            .findByIdAndUpdate(id, putRoute)
          }
        return result
    }
}
