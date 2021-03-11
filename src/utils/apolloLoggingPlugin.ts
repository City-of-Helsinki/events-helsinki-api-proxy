import { ApolloServerPlugin } from 'apollo-server-plugin-base';
import { v4 as uuidv4 } from 'uuid';

import { X_REQUEST_ID } from '..';
import logger from './logger';

export default {
  requestDidStart({ request, context }) {
    const profiler = logger.startTimer();
    const profilerRequestId = uuidv4();

    // Add request id to context so it can be passed upstream in datasources
    context[X_REQUEST_ID] = request.http.headers.get(X_REQUEST_ID);

    logger.info('GraphQL Request started', {
      operationName: request.operationName,
      variables: request.variables,
      requestId: request.http.headers.get(X_REQUEST_ID),
      profilerRequestId,
    });

    return {
      didEncounterErrors({ request, errors }) {
        logger.error('Apollo encountered errors: \n', {
          variables: request.variables,
          operationName: request.operationName,
          errors: errors,
          query: request.query,
        });
      },
      willSendResponse({ request }) {
        profiler.done({
          message: 'Sending response',
          operationName: request.operationName,
          requestId: request.http.headers.get(X_REQUEST_ID),
          profilerRequestId,
        });
      },
    };
  },
} as ApolloServerPlugin;
