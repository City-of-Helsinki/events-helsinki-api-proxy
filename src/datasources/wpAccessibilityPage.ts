import WPDataSource from './WPCmsDataSource';

class WpAccessibilityPageAPI extends WPDataSource {
  public async getWpAccessibilityPages() {
    return this.get('pages?slug=etusivu');
  }
}

export default WpAccessibilityPageAPI;
