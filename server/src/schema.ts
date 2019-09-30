import { IExecutableSchemaDefinition } from 'graphql-tools';
import { merge } from 'lodash';

import { userResolvers, userTypeDefs } from './common/user/user.schema';
import { workspaceResolvers, workspaceTypeDefs } from './common/workspace/workspace.schema';
import { rootTypeDefs } from './common/root';

const ExecutableSchema: IExecutableSchemaDefinition = {
  typeDefs: [rootTypeDefs, userTypeDefs, workspaceTypeDefs],
  resolvers: merge(userResolvers, workspaceResolvers),
};

export default ExecutableSchema;