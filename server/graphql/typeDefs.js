const { gql } = require('apollo-server-express');

module.exports = gql`
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
        password: String!,
        confirmPassword: String!
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


