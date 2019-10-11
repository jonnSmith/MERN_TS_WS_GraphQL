import { PubSub } from 'apollo-server';

export const EVENTS = {
  MESSAGE: {
    CREATED: 'CREATED'
  }
};

export default new PubSub();