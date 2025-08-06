import { gql } from '@apollo/client';

export const LIKE_POST = gql`
  mutation LikePost($postId: ID!) {
    likePost(postId: $postId) {
      success
      post {
        id
        likesCount
        isLiked
      }
    }
  }
`;

export const UNLIKE_POST = gql`
  mutation UnlikePost($postId: ID!) {
    unlikePost(postId: $postId) {
      success
      post {
        id
        likesCount
        isLiked
      }
    }
  }
`;

export const CREATE_COMMENT = gql`
  mutation CreateComment($postId: ID!, $content: String!) {
    createComment(postId: $postId, content: $content) {
      success
      comment {
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

export const SHARE_POST = gql`
  mutation SharePost($postId: ID!) {
    sharePost(postId: $postId) {
      success
      post {
        id
        sharesCount
      }
    }
  }
`;