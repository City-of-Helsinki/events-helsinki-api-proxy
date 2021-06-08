import AboutPageAPI from './datasources/aboutPage';
import AccessibilityPageAPI from './datasources/accessibilityPage';
import CollectionAPI from './datasources/collection';
import EventAPI from './datasources/event';
import KeywordAPI from './datasources/keyword';
import LandingPageAPI from './datasources/landingPage';
import NeighborhoodAPI from './datasources/neighborhood';
import OrganizationAPI from './datasources/organization';
import PlaceAPI from './datasources/place';
import {
  EventDetailsResolvers as GeneratedEventDetailsResolvers,
  QueryResolvers as GeneratedQueryResolvers,
} from './types/types';

export type DataSources = {
  aboutPageAPI: AboutPageAPI;
  accessibilityPageAPI: AccessibilityPageAPI;
  collectionAPI: CollectionAPI;
  eventAPI: EventAPI;
  keywordAPI: KeywordAPI;
  landingPageAPI: LandingPageAPI;
  neighborhoodAPI: NeighborhoodAPI;
  organizationAPI: OrganizationAPI;
  placeAPI: PlaceAPI;
};

type Context = {
  dataSources: DataSources;
};

export type QueryResolvers = GeneratedQueryResolvers<Context>;
export type EventDetailsResolvers = GeneratedEventDetailsResolvers<Context>;
