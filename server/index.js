import { ApolloServer, gql } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import { typeDefs, resolvers } from './src/schema.js';
import express from 'express';
import http from 'http';
import authRouter from './routes/auth.js';


const startApolloServer = async (typeDefs, resolvers) => {
    const app = express();
    const httpServer = http.createServer(app)
    const port = 8080;

    const server = new ApolloServer({
        typeDefs,
        resolvers,
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]
    })

    await server.start();

    server.applyMiddleware({ app });

    app.use(express.json());
    app.use("/auth", authRouter);

    await new Promise(resolve => httpServer.listen(port, resolve));
    console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`);
}

startApolloServer(typeDefs, resolvers);