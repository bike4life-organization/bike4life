import {PubSubClient} from '@bike4life/commons';
import {NotifierService} from "../app/services/notifier.service";
import {mockRouteCheckerEventData} from "./support/route.checker.event.data";

describe('Notifier service', () => {
    const service = new NotifierService();
    const publishMessageSpy = jest.spyOn(PubSubClient.prototype, 'publishMessage')

    afterEach(() => {
        jest.restoreAllMocks()
    })

    it('should send a PubSub message when a route is created', async () => {
        await service.sendInterestingPlacesNotification(mockRouteCheckerEventData)
        expect(publishMessageSpy).toHaveBeenCalledTimes(1)
    })
})
