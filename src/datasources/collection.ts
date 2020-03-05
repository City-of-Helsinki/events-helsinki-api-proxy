import DataSource from "./CmsDataSource";

class CollectionAPI extends DataSource {
  public async getCollectionList() {
    return this.get("collections");
  }
}

export default CollectionAPI;
