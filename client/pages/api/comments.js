import { GraphQLClient, gql } from "graphql-request";

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT;



export default async function comments(req, res) {
  const GraphQLClient = new GraphQLClient(graphqlAPI, {
    headers: {
      authorization: `Bearer ${process.env.NEXT_PUBLIC_GRAPHQL_TOKEN}`,
    },
  });

  const query = gql`
    mutation CreateComment($name: String!, $email: String!, $comment: String!, $slug: String!) {
      createComment(data: { name: $name, email: $email, comment: $comment, slug: $slug, story: { connect: { slug: $slug } } }) {
        id}
    }`
  
  const result = await GraphQLClient.request(query, {
    name: req.body.name,
    email: req.body.email,
    comment: req.body.comment,
    slug: req.body.slug
  });

  return res.status(200).send(result);
}
