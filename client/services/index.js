import { request, gql } from 'graphql-request';

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT;

export const getStories = async () => {
    const query = gql`
        query GetStories {
            storiesConnection {
                edges {
                    node {
                        categories {
                            name
                            slug
                        }
                        title
                        continent
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


export const getSimilarStories = async (slug, continents) => {
    const query = gql`
        query GetSimilarStories($slug: String!, $continents: [String!]) {
            stories(
                where: {slug_not: $slug, AND: {categories_some: {slug_in: $continents}}}
                last: 3
                ) {
                title
                featuredImage {
                    url
                }
                createdAt
                slug
                }
        }`;

    const result = await request(graphqlAPI, query, {slug, continents});
    const data = result.stories;
    
    return data;
}


export const getCategories = async () => {
    const query = gql`
        query GetCategories {
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


export const getStoryDetails = async ( slug ) => {
    const query = gql`
        query GetStoryDetails($slug: String!) {
        story(where: {slug: $slug}) {
                        traveler {
                            bio
                            name
                            id
                            photo {
                                url
                            }
                        }
                        categories {
                            name
                            slug
                        }
                        createdAt
                        title
                        date
                        slug
                        featuredImage {
                            url
                        }
                        content {
                            raw
                            text
                        }
                    }
                }
    `;

    const result = await request(graphqlAPI, query, { slug });
    const data = result.story;

    return data;
}


export const submitComment = async (obj) => {
    const result = await fetch('/api/comments', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(obj),
    });
    return result.json();
}