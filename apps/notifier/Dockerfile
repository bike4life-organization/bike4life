# Common build stage
FROM node:19.0.0-alpine as common-build-stage

COPY ./apps/notifier ./app
COPY ./package.json ./app

WORKDIR /app

RUN npm install

EXPOSE 3000

# Production build stage
FROM common-build-stage as production-build-stage

ENV NODE_ENV production

CMD ["npm", "run", "start", "notifier"]