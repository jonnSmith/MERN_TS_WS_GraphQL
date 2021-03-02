// import { makeExecutableSchema } from 'graphql-tools';
// import { userTypeDefs } from '../user/user.schema';
// import { workspaceTypeDefs, workspaceResolvers } from './workspace.schema';
// import { rootTypeDefs } from '../root';
// import EasyGraphQLTester = require('easygraphql-tester');
//
// const schema = makeExecutableSchema({
//   typeDefs: [rootTypeDefs, userTypeDefs, workspaceTypeDefs],
//   resolvers: workspaceResolvers,
// });
//
// const workspaceFixture = {
//   workspace: {
//     name: "demo",
//     rating: 10
//   }
// };
//
// const filterFixture = {
//   filter: {
//     limit: 10
//   }
// };
//
// describe('Test workspace queries, mutations and subscriptions', () => {
//   let tester;
//
//   beforeAll((done) => {
//     tester = new EasyGraphQLTester(schema);
//     done();
//   });
//
//   describe("Workspace Mutations",  () => {
//     test("Should be a valid addWorkspace mutation", () => {
//       const mutation = `
//          mutation AddWorkspace($workspace: WorkspaceInput!) {
//            addWorkspace(input: $workspace) {
//              id
//              name
//            }
//          }
//       `;
//       tester.test(true, mutation, workspaceFixture);
//     });
//   });
//
//   describe("Workspace Queries",  () => {
//     test("Should be a valid workspaces query", () => {
//       const query = `
//         query getWorkspaces($filter: WorkspaceFilterInput) {
//           workspaces(filter: $filter) {
//             id
//             name
//           }
//         }
//       `;
//       tester.test(true, query, filterFixture);
//     });
//     test("Should be a valid workspace query", () => {
//       const query = `
//         query getWorkspace($id: String!) {
//           workspace(id: $id) {
//             name
//             rating
//           }
//         }
//       `;
//       tester.test(true, query, { id: '1'});
//     });
//   });
//
//   afterEach(async (done) => {
//     done();
//   });
//
// });