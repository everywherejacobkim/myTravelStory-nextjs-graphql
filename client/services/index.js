import { request, gql } from 'graphql-request';
const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT;

export const GET_ALL_STORIES = async () => {
    const query = gql`
        query GetAllStories {
                allStories {
                    id
                    title
                    continent
                    date
                    slug    
                    excerpt
                    content
                    featuredImage
                }
        }
    `;

    const result = await request(graphqlAPI, query);
    const data = result.allStories;

    return data;
}

export const GET_CATEGORY_STORIES = async (continent) => {
    const query = gql`
        query GetCategorizedStories($continent: String!) {
            categorizedStory(
                where: {continent: $continent}
                ) {
                    id
                    title
                    continent
                    date
                    slug    
                    excerpt
                    content
                    featuredImage
                }
        }
    `;

    const result = await request(graphqlAPI, query);
    const data = result.allStories;

    return data;
}

export const GET_TRAVELER = async () => {
    const query = gql`
        query GetTraveler {
                allTravelers {
                    id
                    name
                    bio
                    photo
                }
        }
    `;

    const result = await request(graphqlAPI, query);
    const data = result.allTravelers;

    return data;
}

export const getCategories = async () => {
    const query = gql`
        query GetCategories {
            categories {
                id
                name
                slug
            }
        }
    `;

    const result = await request(graphqlAPI, query);
    const data = result.categories;

    return data;
}


export const getRecentStories = async () => {
    const query = gql`
        query GetStoryDetails() {
            allStories(orderBy: createdAt_ASC, last: 3) {
                id
                title
                continent
                date
                slug    
                excerpt
                content
                featuredImage
        }
        }`;

    const result = await request(graphqlAPI, query);
    const data = result.allStories;
    
    return data;
}


export const getSimilarStories = async (slug, continent) => {
    const query = gql`
        query GetSimilarStories($slug: String!, $continent: [String!]) {
            allStories(
                where: {slug_not: $slug, AND: {categories_some: {slug_in: $continent}}}
                last: 3
                ) {
                id
                title
                continent
                date
                slug    
                excerpt
                content
                }
        }`;

    const result = await request(graphqlAPI, query, {slug, continent});
    const data = result.allStories;
    
    return data;
}


export const getStoryDetails = async (slug) => {
    const query = gql`
        query GetStoryDetails($slug: String!) {
            story(slug: $slug) {
                id
                title
                continent
                date
                slug        
                excerpt
                content
                featuredImage
            }   
        }
    `;

    const result = await request(graphqlAPI, query, {slug});
    const data = result.story;

    return data;
}

export const ADD_STORY = async () => {
    const mutation = gql`
    mutation AddStory($id: String!, $title: String!, $slug: String!, $continent: String!, $date: String!, $excerpt: String!, $content: String!, $featuredImage: String) {
        addStory(id: $id, date: $date, title: $title, slug: $slug, continent: $continent, excerpt: $excerpt, content: $content, featuredImage: $featuredImage) {
            id
            date
            title
            slug
            continent
            excerpt
            content
            featuredImage
        }
    }
`;

    const result = await request(graphqlAPI, mutation);
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