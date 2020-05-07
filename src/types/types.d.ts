export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
};

export type CollectionDetails = {
   __typename?: 'CollectionDetails',
  id: Scalars['ID'],
  boxColor?: Maybe<Scalars['String']>,
  contentType?: Maybe<Scalars['Int']>,
  curatedEvents: Array<Scalars['String']>,
  curatedEventsTitle: LocalizedObject,
  depth?: Maybe<Scalars['Int']>,
  description: LocalizedObject,
  draftTitle?: Maybe<Scalars['String']>,
  eventListQuery?: Maybe<Scalars['String']>,
  eventListTitle: LocalizedObject,
  expireAt?: Maybe<Scalars['String']>,
  expired?: Maybe<Scalars['Boolean']>,
  firstPublishedAt?: Maybe<Scalars['String']>,
  goLiveAt?: Maybe<Scalars['String']>,
  hasUnpublishedChanges?: Maybe<Scalars['Boolean']>,
  heroImage?: Maybe<Scalars['String']>,
  lastPublishedAt?: Maybe<Scalars['String']>,
  latestRevisionCreatedAt?: Maybe<Scalars['String']>,
  linkText: LocalizedObject,
  linkUrl: LocalizedObject,
  live?: Maybe<Scalars['Boolean']>,
  liveRevision?: Maybe<Scalars['Int']>,
  locked?: Maybe<Scalars['Boolean']>,
  lockedAt?: Maybe<Scalars['String']>,
  lockedBy?: Maybe<Scalars['Int']>,
  numchild?: Maybe<Scalars['Int']>,
  owner?: Maybe<Scalars['Int']>,
  path?: Maybe<Scalars['String']>,
  searchDescription?: Maybe<Scalars['String']>,
  seoTitle?: Maybe<Scalars['String']>,
  showInMenus?: Maybe<Scalars['Boolean']>,
  slug?: Maybe<Scalars['String']>,
  socialMediaDescription?: Maybe<LocalizedObject>,
  subtitles: LocalizedObject,
  title: LocalizedObject,
  urlPath?: Maybe<Scalars['String']>,
};

export type CollectionListResponse = {
   __typename?: 'CollectionListResponse',
  data: Array<CollectionDetails>,
};

export type Division = {
   __typename?: 'Division',
  type: Scalars['String'],
  ocdId?: Maybe<Scalars['String']>,
  municipality?: Maybe<Scalars['String']>,
  name?: Maybe<LocalizedObject>,
};

export type EventDetails = {
   __typename?: 'EventDetails',
  id: Scalars['ID'],
  location?: Maybe<Place>,
  keywords: Array<Keyword>,
  superEvent?: Maybe<InternalIdObject>,
  eventStatus?: Maybe<Scalars['String']>,
  externalLinks: Array<ExternalLink>,
  offers: Array<Offer>,
  dataSource?: Maybe<Scalars['String']>,
  publisher?: Maybe<Scalars['ID']>,
  subEvents: Array<InternalIdObject>,
  images: Array<Image>,
  inLanguage: Array<InLanguage>,
  audience: Array<InternalIdObject>,
  createdTime?: Maybe<Scalars['String']>,
  lastModifiedTime?: Maybe<Scalars['String']>,
  datePublished?: Maybe<Scalars['String']>,
  startTime?: Maybe<Scalars['String']>,
  endTime?: Maybe<Scalars['String']>,
  customData?: Maybe<Scalars['String']>,
  audienceMinAge?: Maybe<Scalars['String']>,
  audienceMaxAge?: Maybe<Scalars['String']>,
  superEventType?: Maybe<Scalars['String']>,
  extensionCourse?: Maybe<ExtensionCourse>,
  name: LocalizedObject,
  locationExtraInfo?: Maybe<LocalizedObject>,
  shortDescription?: Maybe<LocalizedObject>,
  provider?: Maybe<LocalizedObject>,
  infoUrl?: Maybe<LocalizedObject>,
  providerContactInfo?: Maybe<Scalars['String']>,
  description?: Maybe<LocalizedObject>,
  internalId?: Maybe<Scalars['String']>,
  internalContext?: Maybe<Scalars['String']>,
  internalType?: Maybe<Scalars['String']>,
};

export type EventListResponse = {
   __typename?: 'EventListResponse',
  meta: Meta,
  data: Array<EventDetails>,
};

export type ExtensionCourse = {
   __typename?: 'ExtensionCourse',
  enrolmentStartTime?: Maybe<Scalars['String']>,
  enrolmentEndTime?: Maybe<Scalars['String']>,
  maximumAttendeeCapacity?: Maybe<Scalars['Int']>,
  minimumAttendeeCapacity?: Maybe<Scalars['Int']>,
  remainingAttendeeCapacity?: Maybe<Scalars['Int']>,
};

export type ExternalLink = {
   __typename?: 'ExternalLink',
  name?: Maybe<Scalars['String']>,
  link?: Maybe<Scalars['String']>,
  language?: Maybe<Scalars['String']>,
};

export type Image = {
   __typename?: 'Image',
  id: Scalars['ID'],
  license?: Maybe<Scalars['String']>,
  createdTime?: Maybe<Scalars['String']>,
  lastModifiedTime?: Maybe<Scalars['String']>,
  name: Scalars['String'],
  url: Scalars['String'],
  cropping?: Maybe<Scalars['String']>,
  photographerName?: Maybe<Scalars['String']>,
  dataSource?: Maybe<Scalars['String']>,
  publisher?: Maybe<Scalars['String']>,
  internalId?: Maybe<Scalars['String']>,
  internalContext?: Maybe<Scalars['String']>,
  internalType?: Maybe<Scalars['String']>,
};

export type InLanguage = {
   __typename?: 'InLanguage',
  id?: Maybe<Scalars['ID']>,
  translationAvailable?: Maybe<Scalars['Boolean']>,
  name?: Maybe<LocalizedObject>,
  internalId?: Maybe<Scalars['String']>,
  internalContext?: Maybe<Scalars['String']>,
  internalType?: Maybe<Scalars['String']>,
};

export type InternalIdObject = {
   __typename?: 'InternalIdObject',
  internalId?: Maybe<Scalars['String']>,
};

export type Keyword = {
   __typename?: 'Keyword',
  id: Scalars['ID'],
  altLabels?: Maybe<Array<Maybe<Scalars['String']>>>,
  createdTime?: Maybe<Scalars['String']>,
  lastModifiedTime?: Maybe<Scalars['String']>,
  aggregate?: Maybe<Scalars['Boolean']>,
  deprecated?: Maybe<Scalars['Boolean']>,
  nEvents?: Maybe<Scalars['Int']>,
  image?: Maybe<Image>,
  dataSource?: Maybe<Scalars['String']>,
  publisher?: Maybe<Scalars['ID']>,
  name?: Maybe<LocalizedObject>,
  internalId?: Maybe<Scalars['String']>,
  internalContext?: Maybe<Scalars['String']>,
  internalType?: Maybe<Scalars['String']>,
};

export type KeywordListResponse = {
   __typename?: 'KeywordListResponse',
  meta: Meta,
  data: Array<Keyword>,
};

export type LandingPage = {
   __typename?: 'LandingPage',
  id: Scalars['ID'],
  path?: Maybe<Scalars['String']>,
  depth?: Maybe<Scalars['Int']>,
  numchild?: Maybe<Scalars['Int']>,
  draftTitle?: Maybe<Scalars['String']>,
  slug?: Maybe<Scalars['String']>,
  live?: Maybe<Scalars['Boolean']>,
  hasUnpublishedChanges?: Maybe<Scalars['Boolean']>,
  urlPath?: Maybe<Scalars['String']>,
  seoTitle?: Maybe<Scalars['String']>,
  showInMenus?: Maybe<Scalars['Boolean']>,
  searchDescription?: Maybe<Scalars['String']>,
  goLiveAt?: Maybe<Scalars['String']>,
  expireAt?: Maybe<Scalars['String']>,
  expired?: Maybe<Scalars['Boolean']>,
  locked?: Maybe<Scalars['Boolean']>,
  lockedAt?: Maybe<Scalars['String']>,
  firstPublishedAt?: Maybe<Scalars['String']>,
  lastPublishedAt?: Maybe<Scalars['String']>,
  latestRevisionCreatedAt?: Maybe<Scalars['String']>,
  title?: Maybe<LocalizedObject>,
  description?: Maybe<LocalizedObject>,
  buttonText?: Maybe<LocalizedObject>,
  buttonUrl?: Maybe<LocalizedObject>,
  heroBackgroundImage?: Maybe<LocalizedObject>,
  heroTopLayerImage?: Maybe<LocalizedObject>,
  metaInformation?: Maybe<LocalizedObject>,
  pageTitle?: Maybe<LocalizedObject>,
  contentType?: Maybe<Scalars['Int']>,
  owner?: Maybe<Scalars['Int']>,
  lockedBy?: Maybe<Scalars['Int']>,
  liveRevision?: Maybe<Scalars['Int']>,
};

export type LandingPageResponse = {
   __typename?: 'LandingPageResponse',
  data: Array<LandingPage>,
};

export type LocalizedObject = {
   __typename?: 'LocalizedObject',
  fi?: Maybe<Scalars['String']>,
  sv?: Maybe<Scalars['String']>,
  en?: Maybe<Scalars['String']>,
};

export type Meta = {
   __typename?: 'Meta',
  count: Scalars['Int'],
  next?: Maybe<Scalars['String']>,
  previous?: Maybe<Scalars['String']>,
};

export type Mutation = {
   __typename?: 'Mutation',
  _empty?: Maybe<Scalars['String']>,
};

export type Neighborhood = {
   __typename?: 'Neighborhood',
  id: Scalars['ID'],
  name: LocalizedObject,
};

export type NeighborhoodListResponse = {
   __typename?: 'NeighborhoodListResponse',
  meta: Meta,
  data: Array<Neighborhood>,
};

export type Offer = {
   __typename?: 'Offer',
  isFree?: Maybe<Scalars['Boolean']>,
  description?: Maybe<LocalizedObject>,
  price?: Maybe<LocalizedObject>,
  infoUrl?: Maybe<LocalizedObject>,
};

export type OrganizationDetails = {
   __typename?: 'OrganizationDetails',
  id: Scalars['ID'],
  dataSource?: Maybe<Scalars['String']>,
  classification?: Maybe<Scalars['String']>,
  name?: Maybe<Scalars['String']>,
  foundingDate?: Maybe<Scalars['String']>,
  dissolutionDate?: Maybe<Scalars['String']>,
  parentOrganization?: Maybe<Scalars['String']>,
  subOrganizations?: Maybe<Array<Maybe<Scalars['String']>>>,
  affiliatedOrganizations?: Maybe<Array<Maybe<Scalars['String']>>>,
  createdTime?: Maybe<Scalars['String']>,
  lastModifiedTime?: Maybe<Scalars['String']>,
  isAffiliated: Scalars['Boolean'],
  replacedBy?: Maybe<Scalars['String']>,
  internalId?: Maybe<Scalars['String']>,
  internalContext?: Maybe<Scalars['String']>,
  internalType?: Maybe<Scalars['String']>,
};

export type Place = {
   __typename?: 'Place',
  id: Scalars['ID'],
  divisions?: Maybe<Array<Division>>,
  createdTime?: Maybe<Scalars['String']>,
  lastModifiedTime?: Maybe<Scalars['String']>,
  customData?: Maybe<Scalars['String']>,
  email?: Maybe<Scalars['String']>,
  contactType?: Maybe<Scalars['String']>,
  addressRegion?: Maybe<Scalars['String']>,
  postalCode?: Maybe<Scalars['String']>,
  postOfficeBoxNum?: Maybe<Scalars['String']>,
  addressCountry?: Maybe<Scalars['String']>,
  deleted?: Maybe<Scalars['Boolean']>,
  nEvents?: Maybe<Scalars['Int']>,
  image?: Maybe<Image>,
  dataSource?: Maybe<Scalars['String']>,
  publisher?: Maybe<Scalars['ID']>,
  parent?: Maybe<Scalars['ID']>,
  replacedBy?: Maybe<Scalars['String']>,
  position?: Maybe<PlacePosition>,
  name?: Maybe<LocalizedObject>,
  description?: Maybe<Scalars['String']>,
  telephone?: Maybe<LocalizedObject>,
  addressLocality?: Maybe<LocalizedObject>,
  streetAddress?: Maybe<LocalizedObject>,
  infoUrl?: Maybe<LocalizedObject>,
  internalId?: Maybe<Scalars['String']>,
  internalContext?: Maybe<Scalars['String']>,
  internalType?: Maybe<Scalars['String']>,
};

export type PlaceListResponse = {
   __typename?: 'PlaceListResponse',
  meta: Meta,
  data: Array<Place>,
};

export type PlacePosition = {
   __typename?: 'PlacePosition',
  type: Scalars['String'],
  coordinates: Array<Scalars['Float']>,
};

export type Query = {
   __typename?: 'Query',
  _empty?: Maybe<Scalars['String']>,
};

export type Subscription = {
   __typename?: 'Subscription',
  _empty?: Maybe<Scalars['String']>,
};

