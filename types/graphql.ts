export interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  firstName?: string;
  lastName?: string;
}

export interface Post {
  id: string;
  content: string;
  image?: string;
  author: User;
  createdAt: string;
  likesCount: number;
  commentsCount: number;
  sharesCount: number;
  isLiked: boolean;
  comments: Comment[];
}

export interface Comment {
  id: string;
  content: string;
  author: User;
  post: string;
  createdAt: string;
}

export interface Like {
  id: string;
  user: User;
  post: Post;
  createdAt: string;
}

export interface Share {
  id: string;
  user: User;
  post: Post;
  createdAt: string;
}

export interface PostsResponse {
  posts: {
    edges: {
      node: Post;
    }[];
    pageInfo: {
      hasNextPage: boolean;
      endCursor: string;
    };
  };
}