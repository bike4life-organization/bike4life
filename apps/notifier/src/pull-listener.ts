import { logger, PubSubClient } from '@bike4life/commons'
import { Message } from '@google-cloud/pubsub'

const { PUBSUB_PROJECT_ID, PUBSUB_SUBSCRIPTION_NAME, PUBSUB_TOPIC_NAME } = process.env

const pubsubSettings = {
  projectId: PUBSUB_PROJECT_ID,
  subscriptionName: PUBSUB_SUBSCRIPTION_NAME,
  topicName: PUBSUB_TOPIC_NAME
}

export default async function startPullListener(): Promise<void> {
  const pubsubClient = new PubSubClient(pubsubSettings.projectId, logger)
  try {
    const subscription = await pubsubClient.getSubscription(pubsubSettings.topicName, pubsubSettings.subscriptionName)
    logger.info('listening messages from topics')

    subscription.on('message', async (message: Message) => {
      const { attributes } = message

      logger.info(`received message from topic ${attributes.topic}: ${message.id}, ${message.data.toString()}`)
      message.ack() // we ack or we will get it redelivered
    })


    // Receive callbacks for errors on the subscription
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