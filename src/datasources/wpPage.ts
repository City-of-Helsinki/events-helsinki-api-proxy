import WPDataSource from './WPCmsDataSource';

class WpPageAPI extends WPDataSource {
  public async getWpPages(slug: string, query?: string) {
    return this.get(`pages?slug=${slug}`);
  }
}

export default WpPageAPI;
