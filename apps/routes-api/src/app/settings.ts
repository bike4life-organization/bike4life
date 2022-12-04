const {
  MONGO_DB_HOST,
  MONGO_DB_PORT,
  MONGO_DB_USER,
  MONGO_DB_PASSWORD,
  MONGO_DB_DATABASE
} = process.env


export const mongoConnectionSettings = {
  url: `mongodb://${MONGO_DB_USER}:${MONGO_DB_PASSWORD}@${MONGO_DB_HOST}:${MONGO_DB_PORT}/${MONGO_DB_DATABASE}?authSource=admin`,
}
