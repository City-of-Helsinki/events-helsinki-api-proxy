import { LinkedEventsSource } from '../types/types';
import { basePaths } from './constants';
import DataSource from './LinkedEventsDataSource';

class KeywordAPI extends DataSource {
  private defaultSource = LinkedEventsSource.Linkedevents;

  public async getKeywordDetails(
    id: string,
    source: LinkedEventsSource = this.defaultSource
  ) {
    return this.get(`${basePaths[source]}keyword/${id}`);
  }

  public async getKeywordList(
    query: string,
    source: LinkedEventsSource = this.defaultSource
  ) {
    return this.get(`${basePaths[source]}keyword${query}`);
  }
}

export default KeywordAPI;
