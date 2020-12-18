import { LinkedEventsSource } from '../types/types';
import { basePaths } from './constants';
import DataSource from './LinkedEventsDataSource';

class PlaceAPI extends DataSource {
  private defaultSource = LinkedEventsSource.Linkedevents;

  public async getPlaceDetails(
    id: string,
    source: LinkedEventsSource = this.defaultSource
  ) {
    return this.get(`${basePaths[source]}place/${id}`);
  }
  public async getPlaceList(
    query: string,
    source: LinkedEventsSource = this.defaultSource
  ) {
    return this.get(`${basePaths[source]}place${query}`);
  }
}

export default PlaceAPI;
