const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");

async function startServer() {
  const app = express();

  const typeDefs = gql`
    type User {
      id: ID!
      name: String!
      userName: String!
      email: String!
      phone: String!
      website: String!
    }
    type Todo {
      id: ID!
      title: String!
      completed: Boolean
      user: User
    }
    type Query {
      getTodos: [Todo]
      getAllUser: [User]
      getUser(id: ID!): User
    }
  `;

  const resolvers = {
    Todo: {
      user: async (todo) => (await axios.get(`https://jsonplaceholder.typicode.com/users/${todo.userId}`)).data,
    },
    Query: {
      getTodos: async () => (await axios.get("https://jsonplaceholder.typicode.com/todos")).data,
      getAllUser: async () => (await axios.get("https://jsonplaceholder.typicode.com/users")).data,
      getUser: async (parent, { id }) => (await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)).data,
    },
  };

  const server = new ApolloServer({ typeDefs, resolvers });

  app.use(bodyParser.json());
  app.use(cors());

  await server.start();

  server.applyMiddleware({ app, path: '/graphql' });

  const PORT = 8000;
  app.listen(PORT, () => {
    console.log(`Server started at port: ${PORT}`);
  });
}

startServer();
