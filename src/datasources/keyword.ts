import DataSource from "./LinkedEventsDataSource";

class KeywordAPI extends DataSource {
  public async getKeywordList(query: string) {
    return this.get(`keyword${query}`);
  }
}

export default KeywordAPI;
