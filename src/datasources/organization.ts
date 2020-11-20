import { LinkedEventsSource } from '../types/types';
import { BasePathKeys, basePaths } from './constants';
import DataSource from './LinkedEventsDataSource';

class OrganizationAPI extends DataSource {
  private defaultSource = LinkedEventsSource.Linkedevents;

  public async getOrganizationDetails(
    id: string,
    source: BasePathKeys = this.defaultSource
  ) {
    return this.get(`${basePaths[source]}organization/${id}`);
  }
}

export default OrganizationAPI;
