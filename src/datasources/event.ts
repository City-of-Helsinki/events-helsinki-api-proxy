import { LinkedEventsSource } from '../types/types';
import { basePaths } from './constants';
import DataSource from './LinkedEventsDataSource';

class EventAPI extends DataSource {
  private defaultSource = LinkedEventsSource.Linkedevents;

  public get(path: string, source: LinkedEventsSource = this.defaultSource) {
    return super.get(`${basePaths[source]}${path}`);
  }

  public async getEventDetails(
    id: string,
    query: string,
    source: LinkedEventsSource = this.defaultSource
  ) {
    return this.get(`event/${id}${query}`, source);
  }

  public async getEventList(
    query: string,
    source: LinkedEventsSource = this.defaultSource
  ) {
    return this.get(`event${query}`, source);
  }
}

export default EventAPI;
