# Our First stage, that builds the application
FROM helsinkitest/node:16-slim AS graphql-builder

# Use non-root user
USER appuser

# Install dependencies
COPY --chown=appuser:appuser package.json yarn.lock /app/
RUN yarn

# Copy all files 
COPY --chown=appuser:appuser . .

# Copy enviromental variables
ARG GRAPHQL_PROXY_DEBUG

# set graphql proxy server port
ARG GRAPHQL_PROXY_PORT


# set cms api base url
ARG GRAPHQL_PROXY_CMS_API_BASE_URL

# set linked events api base url
ARG GRAPHQL_PROXY_API_BASE_URL

# set map open data base url
ARG GRAPHQL_PROXY_MAP_OPEN_DATA_API_BASE_URL

ARG GRAPHQL_PROXY_API_BASE_URL
ARG GRAPHQL_PROXY_LINKED_EVENTS_API_BASE_PATH
ARG GRAPHQL_PROXY_LINKED_COURSES_API_BASE_PATH

# Set Sentry DSN
ARG GRAPHQL_PROXY_SENTRY_DSN

#Set Sentry environment
ARG GRAPHQL_PROXY_SENTRY_ENVIRONMENT

ARG GRAPHQL_PROXY_DISABLE_WINSTON_LOGGING

# Build application
RUN yarn build


# Our Second stage, that creates an image for production
FROM helsinkitest/node:16-slim AS graphql-prod

# Use non-root user
USER appuser

# Copy build folder from stage 1
COPY --chown=appuser:appuser --from=graphql-builder /app/build /app/build

# Copy package.json and yarn.lock files
COPY --chown=appuser:appuser package.json yarn.lock /app/

# Install production dependencies
RUN yarn install --production

# Expose port
EXPOSE $GRAPHQL_PROXY_PORT

# Start graphql proxy server
CMD yarn start:prod
