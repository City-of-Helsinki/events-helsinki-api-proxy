import DataSource from "./CmsDataSource";

class LandingPageAPI extends DataSource {
  public async getLandingPage(query: string) {
    return this.get(`landing-page${query}`);
  }
}

export default LandingPageAPI;
