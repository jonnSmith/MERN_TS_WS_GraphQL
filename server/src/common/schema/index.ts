import { IExecutableSchemaDefinition } from "graphql-tools";
import { merge } from "lodash";

import { userResolvers, userTypeDefs } from "@backchat/common/user";
import { workspaceResolvers, workspaceTypeDefs } from "@backchat/common/workspace";
import { messageResolvers, messageTypeDefs } from "@backchat/common/message";
import { rootTypeDefs } from "@backchat/common/root";

const ExecutableSchema: IExecutableSchemaDefinition = {
  typeDefs: [rootTypeDefs, userTypeDefs, workspaceTypeDefs, messageTypeDefs],
  resolvers: merge(userResolvers, workspaceResolvers, messageResolvers),
};

export { ExecutableSchema };