import DataSource from './CmsDataSource';

class CollectionAPI extends DataSource {
  public async getCollectionDetails(slug: string, query?: string) {
    return this.get(`collections/${slug}${query}`);
  }

  public async getCollectionList(query: string) {
    return this.get(`collections${query}`);
  }
}

export default CollectionAPI;
