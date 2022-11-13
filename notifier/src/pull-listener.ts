import { PubSub } from '@google-cloud/pubsub'
import { logger } from '@utils/logger';

export default async function startPullListener(): Promise<void> {
  try {
    const projectId = 'your-project-id' // Your Google Cloud Platform project ID
    const topicNameOrId = 'my-topic' // Name for the new topic to create
    const subscriptionName = 'my-sub' // Name for the new subscription to create

    const pubsub = new PubSub({ projectId })

    // Creates a new topic
    const [topic] = await pubsub.createTopic(topicNameOrId)
    console.log(`Topic ${topic.name} created.`)

    // Creates a subscription on that new topic
    const [subscription] = await topic.createSubscription(subscriptionName)

    // Receive callbacks for new messages on the subscription
    subscription.on('message', message => {
      logger.log('Received message:', message.data.toString())
      process.exit(0)
    })

    // Receive callbacks for errors on the subscription
    subscription.on('error', error => {
      logger.error('Received error:', error)
      process.exit(1)
    })

    // Send a message to the topic
    topic.publish(Buffer.from("Test message!"));
  } catch (err) {
    logger.error({ error: err })
    throw err
  }
}
