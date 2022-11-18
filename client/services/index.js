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
                        createdAt
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
                    }
                }
            }
        }
    `;

    const result = await request(graphqlAPI, query);
    const data = result.storiesConnection.edges;
    
    return data;

}
