import { request, gql } from 'graphql-request';

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT;

export const getStories = async () => {
    const query = gql`
        query MyQuery {
            storiesConnection {
                edges {
                    node {
                        categories {
                            name
                            slug
                        }
                        title
                        date
                        slug
                        excerpt
                        featuredImage {
                            url
                        }
                        traveler {
                            bio
                            name
                            id
                            photo {
                                url
                            }
                        }
                        content {
                            text
                        }
                    }
                }
            }
        }
    `;

    const result = await request(graphqlAPI, query);
    const data = result.storiesConnection.edges;
    
    return data;

}


export const getRecentStories = async () => {
    const query = gql`
        query GetStoryDetails() {
            stories(orderBy: createdAt_ASC, last: 3) {
                title
                slug
                featuredImage {
                    url
                }
                createdAt
                date
                country
                area
        }
        }`;

    const result = await request(graphqlAPI, query);
    const data = result.stories;
    
    return data;
}


export const getSimilarStories = async () => {
    const query = gql`
        query GetStoryDetails($slug: String!, $continents: [String!]) {
            stories(
                where: {slug_not: $slug, AND: {continents_some: {slug_in: $continents}}}
                last: 3
                ) {
                title
                slug
                featuredImage {
                    url
                }
                createdAt
                date
                country
                area
                }
        }`;

    const result = await request(graphqlAPI, query);
    const data = result.stories;
    
    return data;
}


export const getCategories = async () => {
    const query = gql`
        query getCategories {
            continents {
                name
                slug
            }
        }
    `;

    const result = await request(graphqlAPI, query);
    const data = result.continents;
    
    return data;
}