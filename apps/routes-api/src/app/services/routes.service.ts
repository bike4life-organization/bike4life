import { encryptString } from '@bike4life/commons';
import { Route, RouteModel } from '../models/route.model';

export class RouteService {
  async getRouteById(id: string): Promise<Route> {
    return RouteModel
      .findById(id)
      .exec()
  }
}
