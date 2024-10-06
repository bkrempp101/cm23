import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { Pool } from 'pg';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

import typeDefs from './schema/schema';
import userResolvers from './resolvers/userResolvers';
import messageResolvers from './resolvers/messageResolvers';
import emailResolvers from './resolvers/emailResolvers';

const app = express();

async function startServer() {
  try {
    const pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false
      }
    });

    console.log('Attempting to connect to PostgreSQL...');
    const client = await pool.connect();
    console.log('Connected to PostgreSQL successfully');
    client.release();

    const server = new ApolloServer({
      typeDefs,
      resolvers: [userResolvers, messageResolvers, emailResolvers],
      context: ({ req }) => {
        return { pool };
      },
    });

    await server.start();
    server.applyMiddleware({ app });

    const PORT = process.env.PORT || 8000;

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}${server.graphqlPath}`);
    });
  } catch (error) {
    console.error('Error starting server:', error);
    if (error instanceof Error) {
      console.error('Error details:', error.message);
    }
    process.exit(1);
  }
}

startServer();
