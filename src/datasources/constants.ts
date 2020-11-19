import { LinkedEventsSource } from '../types/types';

export const basePaths = {
  [LinkedEventsSource.Linkedevents]:
    process.env.GRAPHQL_PROXY_LINKED_EVENTS_API_BASE_PATH,
  [LinkedEventsSource.Linkedcourses]:
    process.env.GRAPHQL_PROXY_LINKED_COURSES_API_BASE_PATH,
};

export type BasePathKeys = keyof typeof basePaths;
