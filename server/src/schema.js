import { gql } from 'apollo-server-express';
import pkg from 'lodash';
import { allStories_data, allTravelers_data, categories_data } from './defaultData.js';

const { find } = pkg;

const typeDefs = gql`
    type Story {
        id: String!
        date: String!
        title: String!
        continent: String!
        slug: String!
        excerpt: String!
        content: String!
        featuredImage: String
    }

    type Traveler {
        id: String!
        name: String!
        bio: String!
        photo: String!
    }

    type Category {
        id: String!
        name: String!
        slug: String!
    }

    type User {
        username: String!
        email: String!
        password: String!
        token: String!
    }

    input RegisterInput {
        username: String!
        email: String!
        password: String!
    }

    input LoginInput {
        email: String!
        password: String!
    }

    type Query {
        story(slug: String!): Story
        allStories: [Story]
        categorizedStory(continent: String!): Story
        traveler(id: String!): Traveler
        allTravelers: [Traveler]
        categories: [Category]
        user(id: ID!): User
    }

    type Mutation {
        addStory(id: String!, date: String!, title: String!, continent: String!, slug: String!, excerpt: String!, content: String!, featuredImage: String): Story,
        addTraveler(id: String!, name: String!, bio: String!, photo: String!): Traveler,
        registerUser(registerInput: RegisterInput): User
        loginUser(loginInput: LoginInput): User
    }
`

const resolvers = {
    Query: {
        allStories: () => allStories_data,
        story(parent, args, context, info) {
            return find(allStories_data, { slug: args.slug })
        },
        categorizedStory(parent, args, context, info) {
            return find(allStories_data, { continent: args.continent })
        },
        allTravelers: () => allTravelers_data,
        traveler(parent, args, context, info) {
            return find(allTravelers_data, { id: args.id })
        },
        categories: () => categories_data,
    },
    Mutation: {
        addStory: (root, args) => {
            const newStory = {
                id: args.id,
                date: args.date,
                title: args.title,
                continent: args.continent,
                slug: args.slug,
                excerpt: args.excerpt,
                content: args.content,
                featuredImage: args.featuredImage,
            }
            allStories_data.push(newStory)
            return newStory
        },

        addTraveler: (root, args) => {
            const newTraveler = {
                id: args.id,
                name: args.name,
                bio: args.bio,
                photo: args.photo
            }
            allTravelers_data.push(newTraveler)
            return newTraveler
        },
    }
}

export { typeDefs, resolvers }

