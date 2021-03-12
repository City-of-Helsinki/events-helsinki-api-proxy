import { ApolloServerPlugin } from 'apollo-server-plugin-base';
import { v4 as uuidv4 } from 'uuid';

import { X_REQUEST_ID } from '..';
import logger from './logger';

export default {
  requestDidStart({ request, context }) {
    const profiler = logger.startTimer();
    const requestId = request.http.headers.get(X_REQUEST_ID) || uuidv4();

    // Add request id to context so it can be passed upstream in datasources
    context[X_REQUEST_ID] = request.http.headers.get(X_REQUEST_ID);

    logger.info({
      message: 'GraphQL Request started',
      requestId,
      operationName: request.operationName,
      variables: request.variables,
    });

    return {
      didEncounterErrors({ request, errors }) {
        logger.error({
          message: 'Apollo encountered errors:',
          requestId: requestId,
          variables: request.variables,
          operationName: request.operationName,
          errors: errors,
        });
      },
      willSendResponse({ request }) {
        profiler.done({
          message: 'Sending response',
          requestId: requestId,
          operationName: request.operationName,
        });
      },
    };
  },
} as ApolloServerPlugin;
