###################
# BUILD FOR PRODUCTION
###################

FROM node:19-alpine As build

WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./

RUN npm ci

COPY --chown=node:node . .

# Run the build command which creates the production bundle
RUN npm run build auth-api

###################
# PRODUCTION
###################

FROM node:19-alpine As production

COPY --chown=node:node package*.json ./

# Set NODE_ENV environment variable
ENV NODE_ENV production

# Running `npm ci` removes the existing node_modules directory and passing in --only=production ensures that only the production dependencies are installed. This ensures that the node_modules directory is as optimized as possible
RUN npm ci --only=production && npm cache clean --force

# Copy the bundled code from the build stage to the production image
COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/dist/apps/auth-api ./dist

# Start the server using the production build
CMD [ "node", "dist/main.js" ]
