const {
  ROUTES_API_DATABASE_URL,
  MONGO_DB_HOST,
  MONGO_DB_PORT,
  MONGO_DB_USER,
  MONGO_DB_PASSWORD,
  ROUTES_API_PORT,
  ROUTES_API_DATABASE_NAME,
  NOTIFIER_PUBSUB_TOPIC_NAME,
  ROUTE_CHECKER_PUBSUB_TOPIC_NAME,
  PUBSUB_PROJECT_ID
} = process.env


export const mongoConnectionSettings = {
  url: ROUTES_API_DATABASE_URL ? ROUTES_API_DATABASE_URL : `mongodb://${MONGO_DB_USER}:${MONGO_DB_PASSWORD}@${MONGO_DB_HOST}:${MONGO_DB_PORT}/${ROUTES_API_DATABASE_NAME}?authSource=admin`,
}

export const apiSettings = {
  port: ROUTES_API_PORT
}

export const pubsubSettings = {
  projectId: PUBSUB_PROJECT_ID,
  notifierTopic: NOTIFIER_PUBSUB_TOPIC_NAME,
  routeCheckerTopic: ROUTE_CHECKER_PUBSUB_TOPIC_NAME
}

export const routeCheckerAPIUri = process.env.ROUTE_CHECKER_URL
export const routeCheckerAPISecretKey = process.env.API_SECRET_KEY
