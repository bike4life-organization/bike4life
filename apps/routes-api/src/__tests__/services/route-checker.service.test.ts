import { PubSubClient } from '@bike4life/commons';
import { RouteCheckerService } from '../../app/services/route-checker.service'
import { mockRoute } from '../support/routes'

describe('Notifier service', () => {
  const service = new RouteCheckerService();
  const publishMessageSpy = jest.spyOn(PubSubClient.prototype, 'publishMessage')

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('should send a PubSub message when a route is created', async () => {
    await service.sendRouteCreatedNotification(mockRoute)

    expect(publishMessageSpy).toHaveBeenCalledTimes(1)
  })
})
