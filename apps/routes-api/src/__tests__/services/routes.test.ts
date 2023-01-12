import { RouteModel } from '../../../src/app/models/route.model';
import { RoutesService } from '../../../src/app/services/routes.service'
import * as mockingoose from 'mockingoose'
import { mockRoute } from '../support/routes'
import { Route } from "../../app/models/route.model";

describe('Route service', () => {
  const service = new RoutesService();

  afterEach(() => {
    jest.restoreAllMocks()
    mockingoose.resetAll()
  })

  it('getUserById should return a route', async () => {
    mockingoose(RouteModel).toReturn(mockRoute, 'findOne');

    const result = await service.getRouteById(mockRoute._id)
    expect(result.name).toBe(mockRoute.name)
  })

  it('ListRoutes should return a list of routes', async () => {
    mockingoose(RouteModel).toReturn(mockRoute, 'find');

    const result = await service.listRoutes(mockRoute.userId)
    expect(result).toHaveProperty('name', mockRoute.name)
  })

  xit('createRoute should create a new route', async () => {
    mockingoose(RouteModel).toReturn(mockRoute, 'create');

    const result = await service.createRoute(mockRoute)
    expect(result.name).toBe(mockRoute.name)
  })

  it('updateRoute should update an existing route', async () => {
    mockingoose(RouteModel).toReturn(mockRoute, 'findOne')
    mockingoose(RouteModel).toReturn(mockRoute, 'findOneAndUpdate')

    const result = await service.updateRoute(mockRoute, mockRoute.userId, mockRoute.userId)
    expect(result.name).toMatch(mockRoute.name)
  })

  it('removeRoute should delete a route', async () => {
    mockingoose(RouteModel).toReturn(mockRoute, 'findOne')
    mockingoose(RouteModel).toReturn(mockRoute, 'delete')

    const result = await service.removeRoute(mockRoute._id, mockRoute.userId)
    expect(result).toBeNull
  })

})
