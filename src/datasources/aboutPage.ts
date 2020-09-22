import DataSource from './CmsDataSource';

class AboutPageAPI extends DataSource {
  public async getAboutPages() {
    return this.get('static-pages/about');
  }
}

export default AboutPageAPI;
