// import { makeExecutableSchema } from "graphql-tools";
// import { messageResolvers, messageTypeDefs } from "./message.schema";
// import { userTypeDefs } from "../user/user.schema";
// import { rootTypeDefs } from "../root";
// import { workspaceTypeDefs } from "../workspace/workspace.schema";
// // tslint:disable-next-line:no-implicit-dependencies
// import EasyGraphQLTester = require("easygraphql-tester");
//
// const schema = makeExecutableSchema({
//   typeDefs: [rootTypeDefs, userTypeDefs, workspaceTypeDefs, messageTypeDefs],
//   resolvers: messageResolvers,
// });
//
// const messageFixture = {
//   text: "Test message text"
// };
//
// const filterFixture = {
//   filter: {
//     limit: 10,
//     skip: 0,
//     order: "asc"
//   }
// };
//
// describe("Test message queries, mutations and subscriptions", () => {
//   let tester;
//
//   beforeAll((done) => {
//     tester = new EasyGraphQLTester(schema);
//     done();
//   });
//
//   describe("Message Mutations",  () => {
//     test("Should be a valid createMessage mutation", () => {
//       const mutation = `
//         mutation CreateMessage($text: String!) {
//           createMessage(text: $text) {
//             id
//             text
//             createdAt
//             user {
//               id
//               email
//             }
//           }
//         }
//       `;
//       tester.test(true, mutation, messageFixture);
//     });
//   });
//
//   describe("Message Queries",  () => {
//     test("Should be a valid messages query", () => {
//       const query = `
//         query getMessages($skip: Int, $limit: Int, $order: String) {
//           stream($skip: Int, $limit: Int, $order: String) {
//             messages: {
//               id
//               text
//               createdAt
//               user {
//                 id
//                 email
//               }
//             }
//           }
//         }
//       `;
//       tester.test(true, query, filterFixture);
//     });
//     test("Should be a valid message query", () => {
//       const query = `
//         query getMessage($id: String!) {
//           message(id: $id) {
//             text
//             createdAt
//             user {
//               id
//               email
//             }
//           }
//         }
//       `;
//       tester.test(true, query, { id: "1"});
//     });
//   });
//
//   afterEach(async (done) => {
//     done();
//   });
//
// });