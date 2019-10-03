import { makeExecutableSchema } from 'graphql-tools';
import { userResolvers, userTypeDefs } from './user.schema';
import { workspaceTypeDefs } from '../workspace/workspace.schema';
import { rootTypeDefs } from '../root';
import EasyGraphQLTester = require('easygraphql-tester');

const schema = makeExecutableSchema({
  typeDefs: [rootTypeDefs, userTypeDefs, workspaceTypeDefs],
  resolvers: userResolvers,
});

const userFixture = {
  user: {
    email: "demo@demo.com",
    password: "demo123",
    firstName: "demo",
    lastName: "demo"
  }
};

const filterFixture = {
  filter: {
    limit: 10
  }
};

describe('Test user queries, mutations and subscriptions', () => {
  let tester;

  beforeAll((done) => {
    tester = new EasyGraphQLTester(schema);
    done();
  });

  describe("User Mutations",  () => {
    test("Should be a valid addUser mutation", () => {
      const mutation = `
         mutation AddUser($user: UserInput!) {
           addUser(input: $user) {
             id
             email
           }
         }
      `;
      tester.test(true, mutation, userFixture);

    });
    test("Should be a valid sign in mutation", () => {
      const mutation = `
         mutation SignInUser($email: String!, $password: String!) {
           signInUser(email: $email, password: $password)
         }
      `;
      tester.test(true, mutation, {
        email: userFixture.user.email,
        password: userFixture.user.password
      });
    });
    test("Should be a sign up mutation", () => {
      const mutation = `
         mutation SignUpUser($email: String!, $password: String!, $firstName: String!, $lastName: String) {
           signUpUser(email: $email, password: $password, firstName: $firstName, lastName: $lastName)
         }
      `;
      tester.test(true, mutation, {
        email: userFixture.user.email,
        password: userFixture.user.password,
        firstName: userFixture.user.firstName,
        lastName: userFixture.user.lastName,
      });
    });
  });

  describe("User Queries",  () => {
    test("Should be a valid users query", () => {
      const query = `
        query getUsers($filter: UserFilterInput) {
          users(filter: $filter) {
            id
            email
          }
        }
      `;
      tester.test(true, query, filterFixture);
    });
    test("Should be a valid user query", () => {
      const query = `
        query getUser($id: String!) {
          user(id: $id) {
            email
          }
        }
      `;
      tester.test(true, query, { id: '1'});
    });
  });

  afterEach(async (done) => {
    done();
  });

});