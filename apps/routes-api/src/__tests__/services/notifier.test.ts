import { PubSubClient } from '@bike4life/commons';
import { NotifierService } from '../../app/services/notifier.service'
import { mockRoute } from '../support/routes'

describe('Notifier service', () => {
  const service = new NotifierService();
  const publishMessageSpy = jest.spyOn(PubSubClient.prototype, 'publishMessage')

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('should send a PubSub message when a route is created', async () => {
    await service.sendRouteCreatedNotification(mockRoute)

    expect(publishMessageSpy).toHaveBeenCalledTimes(1)
  })
})
