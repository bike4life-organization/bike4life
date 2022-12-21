import { PubSubClient, logger, NotifierMessage, NotifierMessageTypes, User, UserCreatedEventMessage } from "@bike4life/commons"
import { pubsubSettings } from '../settings'

export class NotifierService {

  private pubSubClient: PubSubClient

  constructor() {
    this.pubSubClient = new PubSubClient(pubsubSettings.projectId, logger)
  }

  async sendUserCreatedEvent(user: User): Promise<void> {
    try {
      if (!user._id) {
        throw new Error('The user is not valid')
      }
      const userCreatedPayload: UserCreatedEventMessage = {
        user_email: user.email,
        user_id: user._id
      }
      const userCreatedMessage: NotifierMessage = {
        attributes: {
          type: NotifierMessageTypes.USER_CREATED
        },
        payload: userCreatedPayload
      }
      await this.pubSubClient.publishMessage(pubsubSettings.notifierTopic, userCreatedMessage)
    } catch (error) {
      // If that fails, we should silently fail as this shouldn't block the request flow
      logger.error(error)
    }
  }
}
