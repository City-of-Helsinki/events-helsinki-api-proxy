import { basePaths } from './constants';
import DataSource from './LinkedEventsDataSource';

class EventAPI extends DataSource {
  public basePath = basePaths.LINKEDEVENTS;

  public get(path: string) {
    return super.get(`${this.basePath}${path}`);
  }

  public async getEventDetails(id: string, query: string) {
    return this.get(`event/${id}${query}`);
  }

  public async getEventList(query: string) {
    return this.get(`event${query}`);
  }
}

export default EventAPI;
