const usersResolvers = require('./users');
const storyResolvers = require('./story');

module.exports = {
    Query: {
        ...usersResolvers.Query,
        ...storyResolvers.Query
    },
    Mutation: {
        ...usersResolvers.Mutation,
        ...storyResolvers.Mutation
    }
}

