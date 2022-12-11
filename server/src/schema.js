import { gql } from 'apollo-server-express';
import pkg from 'lodash';

const { find, remove } = pkg;

const allStories_data = [
    {
        id: '1',
        title: 'One night in onsen village',
        continent: 'asia',
        date: '2020-10-13',
        slug: 'fukuoka-onsen',
        excerpt: 'The small hot spring village near Fukuoka, where I arrived at dawn, welcomed me with a quiet atmosphere and a snuggly morning fog.',
        featuredImage: { url: 'https://media.graphassets.com/BptkVbK9RAeBjPY7YjwF' },
        content: 'The small hot spring village near Fukuoka, where I arrived at dawn, welcomed me with a quiet atmosphere and a snuggly morning fog. It felt like all the stress was gone. I found the onsen house I had reserved, and it was early in the morning, but I was super lucky that the owner of the onsen place opened the door and welcomed me. I sat alone in a quiet hot spring and enjoyed the silence of the peaceful hot spring village. '
        }
]

const allTravelers_data = [
    {
        id: '1',
        bio: 'Love to travel, a passionate hitchhiker. Always dreaming digital nomad life.',
        photo: { url: 'https://media.graphassets.com/xE3XtybOQ2yIdn3d32wW' }
    }
]

const typeDefs = gql`
    type Story {
        id: String!
        date: String!
        title: String!
        continent: String!
        slug: String!
        excerpt: String!
        content: String!
        featuredImage: String!
    }

    type Traveler {
        id: String!
        bio: String!
        photo: String!
    }

    type Query {
        story(id: String!): Story
        allStories: [Story]
        traveler(id: String!): Traveler
        allTravelers: [Traveler]
    }

    type Mutation {
        addStory(id: String!, date: String!, title: String!, continent: String!, slug: String!, excerpt: String!, content: String!, featuredImage: String!): Story,

        addTraveler(id: String!, bio: String!, photo: String!): Traveler,
    }
`

const resolvers = {
    Query: {
        allStories: () => allStories_data,
        story(parent, args, context, info) {
            return find(allStories_data, { id: args.id })
        },
        allTravelers: () => allTravelers_data,
        traveler(parent, args, context, info) {
            return find(allTravelers_data, { id: args.id })
        }
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
                bio: args.bio,
                photo: args.photo
            }
            allTravelers_data.push(newTraveler)
            return newCar
        },
    }
}

export { typeDefs, resolvers }

