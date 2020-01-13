import DataSource from "./LinkedEventsDataSource";

class PlaceAPI extends DataSource {
  public async getPlaceDetails(id: string) {
    return this.get(`place/${id}`);
  }
  public async getPlaceList(query: string) {
    return this.get(`place${query}`);
  }
}

export default PlaceAPI;
