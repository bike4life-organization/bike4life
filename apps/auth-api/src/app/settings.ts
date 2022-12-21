const {
  MONGO_DB_HOST,
  MONGO_DB_PORT,
  MONGO_DB_USER,
  MONGO_DB_PASSWORD,
  AUTH_API_PORT,
  AUTH_API_DATABASE_NAME,
  JWT_SECRET,
  PUBSUB_PROJECT_ID,
  NOTIFIER_PUBSUB_TOPIC_NAME
} = process.env


export const mongoConnectionSettings = {
  url: `mongodb://${MONGO_DB_USER}:${MONGO_DB_PASSWORD}@${MONGO_DB_HOST}:${MONGO_DB_PORT}/${AUTH_API_DATABASE_NAME}?authSource=admin`,
}

export const avatarSettings = {
  defaultAvatar: 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png',
}

export const secretSettings = {
  jwt: JWT_SECRET
}

export const apiSettings = {
  port: AUTH_API_PORT
}

export const pubsubSettings = {
  projectId: PUBSUB_PROJECT_ID,
  notifierTopic: NOTIFIER_PUBSUB_TOPIC_NAME
}
