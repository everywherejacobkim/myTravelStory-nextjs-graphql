import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import { typeDefs, resolvers } from './graphql/schema.js';
import express from 'express';
import cors from 'cors';
import http from 'http';
import decodeToken from './utils/tokenValidator.js';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv'; 


const startApolloServer = async (typeDefs, resolvers) => {
    const app = express();
    const httpServer = http.createServer(app);
    
    dotenv.config()
    const MONGODB = process.env.MONGODB_URL;
    const port = process.env.PORT;

    const server = new ApolloServer({
        typeDefs,
        resolvers
    })

    await server.start();
    server.applyMiddleware({ app });

    app.use(cors);
    app.use(express.json());


    // user verification by JWT
    app.get("/verify", (req, res) => {
        console.log(req.headers);
        console.log(req.user);

        decodeToken(req, res)
        
        return res.json({
            message: "User verified"
        })
    })

    mongoose.set("strictQuery", false);
    mongoose.connect(MONGODB, { useNewUrlParser: true })
        .then(() => {
            console.log("MongoDB Connected");
            new Promise(resolve => httpServer.listen(port, resolve));
        })
        .then((res) => {
            console.log(`🚀 Server ready at ${port}${server.graphqlPath}`);
        });
}

startApolloServer(typeDefs, resolvers);