import DataSource from "./CmsDataSource";

class LandingPageAPI extends DataSource {
  public async getLandingPage() {
    return this.get(`landing-page`);
  }
}

export default LandingPageAPI;
