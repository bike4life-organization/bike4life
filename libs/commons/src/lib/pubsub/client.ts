import { Attributes, PublishError, PubSub, Subscription, Topic } from '@google-cloud/pubsub'
import { Logger } from 'winston'

export interface Message {
  payload: unknown
  attributes: Attributes
}

export class PubSubClient {
  projectId: string
  client: PubSub
  logger: Logger

  constructor(projectId: string, logger?: Logger) {
    this.projectId = projectId
    this.client = new PubSub({ projectId })
    if (logger) {
      this.logger = logger
    }
  }

  async publishMessage(
    topicName: string,
    message: Message
  ): Promise<string | undefined> {
    const { payload, attributes } = message

    const topic = await this.getTopic(topicName)
    const messageBuffer = Buffer.from(JSON.stringify(payload), 'utf8')

    const messageId = await topic.publish(messageBuffer, attributes)
    await topic.flush()

    return messageId
  }

  /**
  *
  * @param maxInProgress Limit how many messages can have the subscription in progress. 0 means unlimited
  * @returns A PubSub subscription
  */
  async getSubscription(topicName: string, subscriptionName: string): Promise<Subscription> {
    const topic = await this.getTopic(topicName)

    let subscription: Subscription

    try {
      [subscription] = await topic.createSubscription(subscriptionName)
      this.logger.info({ subscription: subscriptionName, message: 'subscription created' })
    } catch (err) {
      const castedErr = err as PublishError
      if (castedErr.code === 6) { // Already exists
        subscription = topic.subscription(subscriptionName)
      } else {
        this.logger.error({ error: err, message: 'error creating subscription' })
        throw err
      }
    }


    return subscription
  }

  private async getTopic(topicName: string): Promise<Topic> {
    let topic: Topic
    try {
      [topic] = await this.client.createTopic(topicName)
      this.logger.info({ topic: topic.name, message: 'topic created' })
    } catch (err) {
      const castedErr = err as PublishError
      if (castedErr.code === 6) { // Already exists
        topic = this.client.topic(topicName)
      } else {
        this.logger.error({ error: err, topic: topicName, message: 'error creating topic' })
        throw err
      }
    }

    return topic
  }
}
