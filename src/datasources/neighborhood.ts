import DataSource from './MapOpenDataDataSource';

class NeighborhoodAPI extends DataSource {
  public async getNeighborhoodList() {
    return this.get(
      `/wfs?request=getFeature&typeName=avoindata:Kaupunginosajako&outputFormat=json`
    );
  }
}

export default NeighborhoodAPI;
