import React, { useState } from 'react';
import { 
  View, 
  Text, 
  Image, 
  TouchableOpacity, 
  StyleSheet, 
  Alert 
} from 'react-native';
import { Heart, MessageCircle, Share, MoveHorizontal as MoreHorizontal } from 'lucide-react-native';
import { Post } from '@/types/graphql';

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  const [isLiked, setIsLiked] = useState(post.isLiked);
  const [likesCount, setLikesCount] = useState(post.likesCount);
  const [sharesCount, setSharesCount] = useState(post.sharesCount);

  const handleLike = async () => {
    // Optimistic update
    setIsLiked(!isLiked);
    setLikesCount(isLiked ? likesCount - 1 : likesCount + 1);
  };

  const handleComment = () => {
    // Navigate to comments screen - implement navigation
    Alert.alert('Comments', 'Comments feature coming soon');
  };

  const handleShare = async () => {
    setSharesCount(sharesCount + 1);
    Alert.alert('Success', 'Post shared successfully');
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) return 'just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h`;
    return `${Math.floor(diffInSeconds / 86400)}d`;
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <Image
            source={{
              uri: post.author.avatar || 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
            }}
            style={styles.avatar}
          />
          <View style={styles.userDetails}>
            <Text style={styles.username}>
              {post.author.firstName && post.author.lastName 
                ? `${post.author.firstName} ${post.author.lastName}`
                : post.author.username
              }
            </Text>
            <Text style={styles.timeAgo}>{formatTimeAgo(post.createdAt)}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.moreButton}>
          <MoreHorizontal size={20} color="#6B7280" />
        </TouchableOpacity>
      </View>

      {/* Content */}
      <Text style={styles.content}>{post.content}</Text>

      {/* Image */}
      {post.image && (
        <Image
          source={{ uri: post.image }}
          style={styles.postImage}
          resizeMode="cover"
        />
      )}

      {/* Actions */}
      <View style={styles.actions}>
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={handleLike}
        >
          <Heart 
            size={24} 
            color={isLiked ? '#EF4444' : '#6B7280'} 
            fill={isLiked ? '#EF4444' : 'none'}
          />
          <Text style={[styles.actionText, isLiked && styles.likedText]}>
            {likesCount}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.actionButton}
          onPress={handleComment}
        >
          <MessageCircle size={24} color="#6B7280" />
          <Text style={styles.actionText}>{post.commentsCount}</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.actionButton}
          onPress={handleShare}
        >
          <Share size={24} color="#6B7280" />
          <Text style={styles.actionText}>{sharesCount}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    marginBottom: 8,
    paddingVertical: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  userDetails: {
    flex: 1,
  },
  username: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 2,
  },
  timeAgo: {
    fontSize: 14,
    color: '#6B7280',
  },
  moreButton: {
    padding: 4,
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
    color: '#111827',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  postImage: {
    width: '100%',
    height: 300,
    marginBottom: 12,
  },
  actions: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    justifyContent: 'space-around',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  actionText: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 8,
    fontWeight: '500',
  },
  likedText: {
    color: '#EF4444',
  },
});