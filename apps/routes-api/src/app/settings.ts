const {
  MONGO_DB_HOST,
  MONGO_DB_PORT,
  MONGO_DB_USER,
  MONGO_DB_PASSWORD,
  MONGO_DB_DATABASE,
  NOTIFIER_PUBSUB_TOPIC_NAME,
  PUBSUB_PROJECT_ID
} = process.env


export const mongoConnectionSettings = {
  url: `mongodb://${MONGO_DB_USER}:${MONGO_DB_PASSWORD}@${MONGO_DB_HOST}:${MONGO_DB_PORT}/${MONGO_DB_DATABASE}?authSource=admin`,
}

export const pubsubSettings = {
  projectId: PUBSUB_PROJECT_ID,
  notifierTopic: NOTIFIER_PUBSUB_TOPIC_NAME
}
