const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');

const typeDefs = gql`
type Query {
    hello: String
}
`;

const resolvers = {
    Query: {
        hello: () => 'Hello world!',
    },
};

const startApolloServer = async (typeDefs, resolvers) => {

    const server = new ApolloServer({
        typeDefs,
        resolvers
    })

    await server.start();

    const app = express();
    const port = 8080;

    server.applyMiddleware({ app });

    app.use(express.json());
    app.use("/auth", require("./routes/auth"));


    app.listen(port, () => {
        console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`)
    });

}

startApolloServer(typeDefs, resolvers);
