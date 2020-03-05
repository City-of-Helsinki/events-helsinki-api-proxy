import { RESTDataSource } from "apollo-datasource-rest";

class DataSource extends RESTDataSource {
  public baseURL = process.env.GRAPHQL_PROXY_CMS_API_BASE_URL;
  public willSendRequest(request) {
    request.headers.set("Content-Type", "application/json");
  }
}

export default DataSource;
