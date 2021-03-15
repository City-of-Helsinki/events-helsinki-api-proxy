import { RESTDataSource } from 'apollo-datasource-rest';

import { X_REQUEST_ID } from '../constants';

class DataSource extends RESTDataSource {
  public baseURL = process.env.GRAPHQL_PROXY_API_BASE_URL;

  public willSendRequest(request) {
    if (this.context.token) {
      request.headers.set('Authorization', this.context.token);
    }

    if (this.context[X_REQUEST_ID]) {
      request.headers.set(X_REQUEST_ID, this.context[X_REQUEST_ID]);
    }

    request.headers.set('Content-Type', 'application/json');
    request.headers.set('Connection', 'keep-alive');
  }
}
export default DataSource;
