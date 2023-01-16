import {PubSubClient, logger, NotifierMessage, NotifierMessageTypes, RouteCheckerEventData} from "@bike4life/commons"
import {pubSubSettings} from "../../../settings";

export class NotifierService {

    private pubSubClient: PubSubClient

    constructor() {
        this.pubSubClient = new PubSubClient(pubSubSettings.projectId, logger)
    }

    async sendInterestingPlacesNotification(event: RouteCheckerEventData): Promise<void> {
        try {
            if (!event.user_id || !event.user_email)
                throw new Error('The user data is not valid')

            const message: NotifierMessage = {
                attributes: {
                    type: NotifierMessageTypes.ROUTE_OPTIMIZED
                },
                payload: {
                    route_id: event._id,
                    user_id: event.user_id,
                    user_email: event.user_email
                }
            }
            await this.pubSubClient.publishMessage(pubSubSettings.notifierTopic, message)
        } catch (error) {
            console.log(error)
            logger.error(error)
        }
    }
}

const notifierService = new NotifierService();
export default notifierService;
