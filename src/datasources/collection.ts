import DataSource from './CmsDataSource';

class CollectionAPI extends DataSource {
  public async getCollectionDetails(id: string, query?: string) {
    return this.get(`collections/${id}${query}`);
  }

  public async getCollectionList(query: string) {
    return this.get(`collections${query}`);
  }
}

export default CollectionAPI;
