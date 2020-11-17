import DataSource from './LinkedCoursesDataSource';

class EventAPI extends DataSource {
  public async getCourseDetails(id: string, query: string) {
    return this.get(`event/${id}${query}`);
  }

  public async getCourseList(query: string) {
    return this.get(`event${query}`);
  }
}

export default EventAPI;
