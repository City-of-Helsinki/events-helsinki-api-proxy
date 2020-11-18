import { basePaths } from './constants';
import DataSource from './LinkedEventsDataSource';

class CourseAPI extends DataSource {
  public basePath = basePaths.LINKEDCOURSES;

  public get(path: string) {
    return super.get(`${this.basePath}${path}`);
  }

  public async getCourseDetails(id: string, query: string) {
    return this.get(`event/${id}${query}`);
  }

  public async getCourseList(query: string) {
    return this.get(`event${query}`);
  }
}

export default CourseAPI;
