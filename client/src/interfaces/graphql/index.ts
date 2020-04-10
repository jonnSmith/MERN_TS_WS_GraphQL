export interface IMutationInterface {
  data?: any;
  loading: any;
  error?: any;
}

export interface ISubscriptionInterface {
  data?: any;
  loading: any;
  error?: any;
  fetchMore: any;
  subscribeToMore: any;
}
