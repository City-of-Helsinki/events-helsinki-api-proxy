import DataSource from "./CmsDataSource";

class LandingPageAPI extends DataSource {
  public async getLandingPages(query: string) {
    return this.get(`landing-pages${query}`);
  }
}

export default LandingPageAPI;
