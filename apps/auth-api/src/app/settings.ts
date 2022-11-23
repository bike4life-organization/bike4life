const {
  MONGO_DB_HOST,
  MONGO_DB_PORT,
  MONGO_DB_USER,
  MONGO_DB_PASSWORD,
  MONGO_DB_DATABASE,
  JWT_SECRET
} = process.env


export const mongoConnectionSettings = {
  url: `mongodb://${MONGO_DB_USER}:${MONGO_DB_PASSWORD}@${MONGO_DB_HOST}:${MONGO_DB_PORT}/${MONGO_DB_DATABASE}?authSource=admin`,
}

export const avatarSettings = {
  defaultAvatar: 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png',
}

export const secretSettings = {
  jwt: JWT_SECRET
}
