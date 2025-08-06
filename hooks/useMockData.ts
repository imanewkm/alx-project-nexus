import { useState, useEffect } from 'react';
import { Post } from '@/types/graphql';

const mockPosts: Post[] = [
  {
    id: '1',
    content: 'Just finished building an amazing React Native app! The new architecture is incredible 🚀',
    image: 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    author: {
      id: '1',
      username: 'sarah_dev',
      email: 'sarah@example.com',
      firstName: 'Sarah',
      lastName: 'Johnson',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    },
    createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
    likesCount: 24,
    commentsCount: 8,
    sharesCount: 3,
    isLiked: false,
    comments: []
  },
  {
    id: '2',
    content: 'Beautiful sunset from my morning run today. Nature never fails to inspire! 🌅',
    image: 'https://images.pexels.com/photos/96622/pexels-photo-96622.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    author: {
      id: '2',
      username: 'mike_runner',
      email: 'mike@example.com',
      firstName: 'Mike',
      lastName: 'Chen',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    },
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    likesCount: 156,
    commentsCount: 23,
    sharesCount: 12,
    isLiked: true,
    comments: []
  },
  {
    id: '3',
    content: 'Working on some exciting new features for our app. Can\'t wait to share what we\'re building! 💻✨',
    author: {
      id: '3',
      username: 'emma_designer',
      email: 'emma@example.com',
      firstName: 'Emma',
      lastName: 'Wilson',
      avatar: 'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    },
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(), // 4 hours ago
    likesCount: 89,
    commentsCount: 15,
    sharesCount: 7,
    isLiked: false,
    comments: []
  },
  {
    id: '4',
    content: 'Coffee and code - the perfect combination for a productive day! ☕️ What\'s your favorite coding fuel?',
    image: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    author: {
      id: '4',
      username: 'alex_coffee',
      email: 'alex@example.com',
      firstName: 'Alex',
      lastName: 'Rodriguez',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    },
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(), // 6 hours ago
    likesCount: 67,
    commentsCount: 31,
    sharesCount: 5,
    isLiked: true,
    comments: []
  }
];

export function useMockData() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasNextPage, setHasNextPage] = useState(true);

  useEffect(() => {
    // Simulate network delay
    const timer = setTimeout(() => {
      setPosts(mockPosts);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const loadMore = () => {
    if (hasNextPage && !loading) {
      setLoading(true);
      // Simulate loading more posts
      setTimeout(() => {
        const newPosts = mockPosts.map(post => ({
          ...post,
          id: post.id + '_' + Date.now(),
          createdAt: new Date(Date.now() - Math.random() * 1000 * 60 * 60 * 24).toISOString()
        }));
        setPosts(prev => [...prev, ...newPosts]);
        setLoading(false);
        setHasNextPage(posts.length < 20); // Stop after 20 posts
      }, 1000);
    }
  };

  const refetch = () => {
    setLoading(true);
    setTimeout(() => {
      setPosts([...mockPosts]);
      setLoading(false);
    }, 500);
  };

  return {
    posts,
    loading,
    hasNextPage,
    loadMore,
    refetch
  };
}