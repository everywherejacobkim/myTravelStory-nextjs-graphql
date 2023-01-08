const { ApolloServer } = require('apollo-server-express');
const typeDefs  = require('./graphql/typeDefs.js');
const resolvers  = require('./graphql/resolvers/index.js');
const express = require('express');
const cors = require('cors');
const http = require('http');
const mongoose = require('mongoose');
const dotenv = require('dotenv');


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