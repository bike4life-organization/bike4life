import { logger, PubSubClient } from '@bike4life/commons'
import { Message } from '@google-cloud/pubsub'
import pullListenerService from '../services/pull.listener.service';
import { pubsubSettings as pbs } from '../settings';

export default async function startPullListener(): Promise<void> {

  try {
    const pubsubClient = new PubSubClient(pbs.projectId, logger)
    const subscription = await pubsubClient.getSubscription(pbs.topicName, pbs.subscriptionName)
    logger.info('listening messages from topics')

    subscription.on('message', async (message: Message) => {
      await pullListenerService.handleEvents(message.attributes?.type, JSON.parse(message.data.toString()))
      message.ack()
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

