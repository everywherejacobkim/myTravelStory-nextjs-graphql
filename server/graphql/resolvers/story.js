const {allStories_data, allTravelers_data, categories_data } = require('../defaultData');
const pkg = require('lodash');

const { find } = pkg;

module.exports = {
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