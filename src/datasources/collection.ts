import DataSource from "./CmsDataSource";

class CollectionAPI extends DataSource {
  public async getCollectionDetails(id: string) {
    return this.get(`collections/${id}`);
  }

  public async getCollectionList() {
    return this.get("collections");
  }
}

export default CollectionAPI;
