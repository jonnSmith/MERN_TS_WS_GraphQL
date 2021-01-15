interface IUserQueryData {
  user: any;
  map: any;
  online: boolean;
  pubsub: any;
}

interface IUserSignData {
  doc: any;
  token: any;
  refresh: boolean;
  password: any;
}

interface IDocumentQueryData {
  document: any;
}

interface IPublishData {
  document: any;
  pubsub: any;
}
