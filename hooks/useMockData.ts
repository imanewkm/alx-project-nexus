import { useState, useEffect } from 'react';
import { Post } from '@/types/graphql';

const mockPosts: Post[] = [
  {
    id: '1',
    content: 'Just finished this beautiful hand-woven handbag using natural willow branches! 🧺 Took me 3 days but so worth it ✨',
    image: 'https://images.pexels.com/photos/6044266/pexels-photo-6044266.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop',
    location: 'Artisan Workshop',
    author: {
      id: '1',
      username: 'sarah_weaver',
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
    content: 'It is time to create something beautiful! Painting workshop this weekend',
    image: 'https://images.pexels.com/photos/1047540/pexels-photo-1047540.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop',
    location: 'Art Studio',
    author: {
      id: '2',
      username: 'mike_potter',
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
    content: 'Welcome to my shop where we sell your favourate handmade clothing pieces ✨',
    image: 'https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop',
    location: 'Shop',
    author: {
      id: '3',
      username: 'emma_knits',
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
    content: 'I really love stumbling upon these interesting architectures around town',
    image: 'https://images.pexels.com/photos/1738986/pexels-photo-1738986.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop',
    location: 'Somewhere',
    author: {
      id: '4',
      username: 'alex_carver',
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