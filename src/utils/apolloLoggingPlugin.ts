import { v4 as uuidv4 } from 'uuid';

import { X_REQUEST_ID } from '../constants';
import logger from './logger';

export default {
  async requestDidStart({ request, context }) {
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
      async didEncounterErrors({ request, errors }) {
        logger.error({
          message: 'Apollo encountered errors:',
          requestId: requestId,
          variables: request.variables,
          operationName: request.operationName,
          errors: errors,
        });
      },
      async willSendResponse({ request }) {
        profiler.done({
          message: 'Sending response',
          requestId: requestId,
          operationName: request.operationName,
        });
      },
    };
  },
};
