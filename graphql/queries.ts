import { gql } from '@apollo/client';

export const GET_POSTS = gql`
  query GetPosts($first: Int, $after: String) {
    posts(first: $first, after: $after) {
      edges {
        node {
          id
          content
          image
          createdAt
          likesCount
          commentsCount
          sharesCount
          isLiked
          author {
            id
            username
            firstName
            lastName
            avatar
          }
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

export const GET_POST_COMMENTS = gql`
  query GetPostComments($postId: ID!) {
    post(id: $postId) {
      id
      comments {
        id
        content
        createdAt
        author {
          id
          username
          firstName
          lastName
          avatar
        }
      }
    }
  }
`;