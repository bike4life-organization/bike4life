import {logger, PubSubClient} from '@bike4life/commons'
import {Message} from '@google-cloud/pubsub'
import {pubSubSettings} from "../../../settings";
import {getEventHandler} from "../services/event.handler.service";

export default async function startPullListener(): Promise<void> {
    try {
        const pubSubClient = new PubSubClient(pubSubSettings.projectId, logger)
        const subscription = await pubSubClient.getSubscription(pubSubSettings.topicName, pubSubSettings.subscriptionName)

        subscription.on('message', messageOn)
        subscription.on('error', errorOn)
    } catch (err) {
        logError(err)
        process.exit(1)
    }
}

async function messageOn(message: Message) {
    const eventHandler = getEventHandler(message.attributes)
    await eventHandler?.(JSON.parse(message.data.toString()))
    message.ack()
}

function errorOn(err) {
    logger.error('error received from subscription')
    logError(err)
}

function logError(err) {
    console.log(err)
    logger.error({error: err})
}