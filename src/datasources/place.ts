import DataSource from "./LinkedEventsDataSource";

class PlaceAPI extends DataSource {
  public async getPlaceList(query: string) {
    return this.get(`place${query}`);
  }
}

export default PlaceAPI;
