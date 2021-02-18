import { RESTDataSource } from 'apollo-datasource-rest';

class DataSource extends RESTDataSource {
  public baseURL = process.env.GRAPHQL_PROXY_API_BASE_URL;

  public willSendRequest(request) {
    if (this.context.token) {
      request.headers.set('Authorization', this.context.token);
    }

    request.headers.set('Content-Type', 'application/json');
    request.headers.set('Connection', 'keep-alive');
  }
}

export default DataSource;
