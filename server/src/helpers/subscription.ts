import { PubSub } from 'apollo-server';

export const EVENTS = {
  MESSAGE: {
    CREATED: 'CREATED',
    DELETED: 'DELETED',
    UPDATED: 'UPDATED'
  }
};

export default new PubSub();