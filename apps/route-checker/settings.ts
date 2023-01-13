const {
    MONGO_DB_HOST,
    MONGO_DB_PORT,
    MONGO_DB_USER,
    MONGO_DB_PASSWORD,
    MONGO_DB_DATABASE,
    PUBSUB_PROJECT_ID,
    ROUTE_CHECKER_PUBSUB_SUBSCRIPTION_NAME,
    ROUTE_CHECKER_PUBSUB_TOPIC_NAME,
    OPEN_TRIP_MAP_URL,
    ROUTE_CHECKER_API_KEY,
    ROUTE_CHECKER_PORT
} = process.env


export const mongoConnectionSettings = {
    url: `mongodb://${MONGO_DB_USER}:${MONGO_DB_PASSWORD}@${MONGO_DB_HOST}:${MONGO_DB_PORT}/${MONGO_DB_DATABASE}?authSource=admin`,
}

export const pubSubSettings = {
    projectId: PUBSUB_PROJECT_ID,
    subscriptionName: ROUTE_CHECKER_PUBSUB_SUBSCRIPTION_NAME,
    topicName: ROUTE_CHECKER_PUBSUB_TOPIC_NAME
}

export const mapSettings = {
    url: OPEN_TRIP_MAP_URL,
    key: ROUTE_CHECKER_API_KEY,
}

export const apiSettings = {
    port: ROUTE_CHECKER_PORT
}
