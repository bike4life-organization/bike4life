import {logger, PubSubClient} from '@bike4life/commons'
import {Message} from '@google-cloud/pubsub'
import {pubSubSettings} from "../../../settings";
import pullListenerService from "../services/pull.listener.service";

export default async function startPullListener(): Promise<void> {
    try {
        const pubSubClient = new PubSubClient(pubSubSettings.projectId, logger)
        const subscription = await pubSubClient.getSubscription(pubSubSettings.topicName, pubSubSettings.subscriptionName)

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
        logger.error({error: err})
        process.exit(1)
    }

}