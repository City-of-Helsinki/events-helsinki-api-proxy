import { RESTDataSource } from 'apollo-datasource-rest';

import { X_REQUEST_ID } from '../constants';

class WPDataSource extends RESTDataSource {
  public baseURL = process.env.GRAPHQL_PROXY_WP_CMS_API_BASE_URL;
  public willSendRequest(request) {
    if (this.context[X_REQUEST_ID]) {
      request.headers.set(X_REQUEST_ID, this.context[X_REQUEST_ID]);
    }

    request.headers.set('Content-Type', 'application/json');
  }
}

export default WPDataSource;
