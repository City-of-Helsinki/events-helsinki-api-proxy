import DataSource from './CmsDataSource';

class LandingPageAPI extends DataSource {
  public async getLandingPage(id: string, query?: string) {
    return this.get(`landing-pages/${id}${query}`);
  }
  public async getLandingPages(query: string) {
    return this.get(`landing-pages${query}`);
  }
}

export default LandingPageAPI;
