import DataSource from "./LinkedEventsDataSource";

class KeywordAPI extends DataSource {
  public async getKeywordDetails(id: string) {
    return this.get(`keyword/${id}`);
  }

  public async getKeywordList(query: string) {
    return this.get(`keyword${query}`);
  }
}

export default KeywordAPI;
