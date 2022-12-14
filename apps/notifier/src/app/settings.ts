const {
  PUBSUB_PROJECT_ID,
  NOTIFIER_PUBSUB_SUBSCRIPTION_NAME,
  NOTIFIER_PUBSUB_TOPIC_NAME,
  TO_REPLY_TO_EMAIL_SENDGRID,
  SENDGRID_API_KEY,
  NOTIFIER_DATABASE_URL,
  MONGO_DB_HOST,
  MONGO_DB_PORT,
  MONGO_DB_USER,
  MONGO_DB_PASSWORD,
  NOTIFIER_DATABASE_NAME,
  NOTIFIER_DOCS_PORT
} = process.env;

export const pubsubSettings = {
  projectId: PUBSUB_PROJECT_ID,
  subscriptionName: NOTIFIER_PUBSUB_SUBSCRIPTION_NAME,
  topicName: NOTIFIER_PUBSUB_TOPIC_NAME
}

export const sendgridSettings = {
  PUBSUB_PROJECT_ID,
  NOTIFIER_PUBSUB_SUBSCRIPTION_NAME,
  NOTIFIER_PUBSUB_TOPIC_NAME,
  TO_REPLY_TO_EMAIL_SENDGRID,
  SENDGRID_API_KEY,
};

export const mongoConnectionSettings = {
  url: NOTIFIER_DATABASE_URL ? NOTIFIER_DATABASE_URL : `mongodb://${MONGO_DB_USER}:${MONGO_DB_PASSWORD}@${MONGO_DB_HOST}:${MONGO_DB_PORT}/${NOTIFIER_DATABASE_NAME}?authSource=admin`,
}

export const publicDocSettings = {
  port: NOTIFIER_DOCS_PORT
}
