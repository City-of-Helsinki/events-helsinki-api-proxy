import { LinkedEventsSource } from '../types/types';

export const basePaths = {
  [LinkedEventsSource.Linkedevents]: '/linkedevents/v1/',
  [LinkedEventsSource.Linkedcourses]: '/linkedcourses/v1/',
};

export type BasePathKeys = keyof typeof basePaths;
