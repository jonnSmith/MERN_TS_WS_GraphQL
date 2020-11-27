import { ForbiddenError } from 'apollo-server';
import { combineResolvers, skip } from 'graphql-resolvers';
import Message from '../common/message/message.model';

export const isAuthenticated = (parent, args, data) => {
  return data.id ? skip : new ForbiddenError('Not authenticated as user.');
}

export const isMessageOwner = async (
  parent,
  { id },
  { user },
) => {
  const message = await Message.findById(id);
  if(!message) {
    throw new ForbiddenError('No message founded');
  }
  const messageObject = message.toObject();
  if (String(messageObject.userId) !== String(user.id)) {
    throw new ForbiddenError('Not authenticated as owner.');
  }

  return skip;
};