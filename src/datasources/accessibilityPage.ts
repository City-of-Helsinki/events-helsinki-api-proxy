import DataSource from './CmsDataSource';

class AccessibilityPageAPI extends DataSource {
  public async getAccessibilityPages() {
    return this.get('static-pages/accessibility');
  }
}

export default AccessibilityPageAPI;
