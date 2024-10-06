import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    billingPeriod: String!
    renewalDate: String!
    endDate: String
  }

  type Message {
    id: ID!
    content: String!
    sender: String!
    timestamp: String!
    userId: ID!
  }

  type Email {
    id: ID!
    subject: String!
    sender: String!
    received: String!
    content: String!
    userId: ID!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Query {
    getUser(id: ID!): User
    getMessages(userId: ID!): [Message!]!
    getEmails(userId: ID!): [Email!]!
  }

  type Mutation {
    signUp(name: String!, email: String!, password: String!, billingPeriod: String!): AuthPayload!
    login(email: String!, password: String!): AuthPayload!
    changePassword(userId: ID!, newPassword: String!): Boolean!
    sendMessage(content: String!, userId: ID!): [Message!]!
    addEmail(subject: String!, sender: String!, content: String!, userId: ID!): Email!
  }
`;

export default typeDefs;
