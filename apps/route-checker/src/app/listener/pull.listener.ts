import {logger, PubSubClient, RouteCheckerEventData} from '@bike4life/commons'
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
    try {
        const eventHandler = getEventHandler(message.attributes)
        const data: RouteCheckerEventData = getEventData(message);
        data && await eventHandler?.(data);
        message.ack()
    } catch (error) {
        message.ack()
        logError(error)
    }
}

function errorOn(err) {
    logger.error('error received from subscription')
    logError(err)
}

function logError(err) {
    console.log(err)
    logger.error({error: err})
}

export function getEventData(message: Message): RouteCheckerEventData {
    try {
        return JSON.parse(message.data.toString());
    } catch (err) {
        logError(err)
        return null;
    }
}