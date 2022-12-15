import { logger, PubSubClient } from '@bike4life/commons'
import { Message } from '@google-cloud/pubsub'
import { EventType, getMessageHandler } from '../handlers';
import { pubsubSettings as pbs } from '../settings';

export default async function startPullListener(): Promise<void> {
  try {
    const pubsubClient = new PubSubClient(pbs.projectId, logger)
    const subscription = await pubsubClient.getSubscription(pbs.topicName, pbs.subscriptionName)
    logger.info('listening messages from topics')

    subscription.on('message', async (message: Message) => {
      try {
        if (!message.attributes.type) {
          throw new Error('Message type is not defined')
        }
        const handler = getMessageHandler(message.attributes.type as EventType)
        await handler(JSON.parse(message.data.toString()))

        message.ack()
      } catch (err) {
        const error = err as Error
        if (error.message === 'Invalid payload') {
          message.ack()
        }
        throw err
      }
    })
    subscription.on('error', err => {
      console.log(err)
      logger.error('error received from subscription')
    })
  } catch (err) {
    console.log(err)
    logger.error({ error: err })
    process.exit(1)
  }
}

