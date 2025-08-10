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
            {post.location && (
              <Text style={styles.location}>{post.location}</Text>
            )}
          </View>
        </View>
        <TouchableOpacity style={styles.moreButton}>
          <MoreHorizontal size={20} color="#262626" />
        </TouchableOpacity>
      </View>

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
        <View style={styles.leftActions}>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={handleLike}
          >
            <Heart 
              size={24} 
              color={isLiked ? '#ED4956' : '#262626'} 
              fill={isLiked ? '#ED4956' : 'none'}
            />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.actionButton}
            onPress={handleComment}
          >
            <MessageCircle size={24} color="#262626" />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.actionButton}
            onPress={handleShare}
          >
            <Share size={24} color="#262626" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Likes count */}
      <View style={styles.likesContainer}>
        <Text style={styles.likesText}>{likesCount} likes</Text>
      </View>

      {/* Content */}
      <View style={styles.contentContainer}>
        <Text style={styles.content}>
          <Text style={styles.username}>
            {post.author.firstName && post.author.lastName 
              ? `${post.author.firstName} ${post.author.lastName}`
              : post.author.username
            }
          </Text>
          <Text style={styles.captionText}> {post.content}</Text>
        </Text>
      </View>

      {/* Comments preview */}
      {post.commentsCount > 0 && (
        <TouchableOpacity style={styles.commentsPreview}>
          <Text style={styles.viewCommentsText}>View all {post.commentsCount} comments</Text>
        </TouchableOpacity>
      )}

      {/* Time ago */}
      <View style={styles.timeContainer}>
        <Text style={styles.timeText}>{formatTimeAgo(post.createdAt).toUpperCase()}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 12,
  },
  userDetails: {
    flex: 1,
  },
  username: {
    fontSize: 14,
    fontWeight: '600',
    color: '#262626',
    lineHeight: 18,
  },
  location: {
    fontSize: 12,
    color: '#262626',
    lineHeight: 16,
  },
  moreButton: {
    padding: 8,
  },
  postImage: {
    width: '100%',
    aspectRatio: 1,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  leftActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    marginRight: 16,
    padding: 8,
  },
  likesContainer: {
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  likesText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#262626',
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingBottom: 4,
  },
  content: {
    fontSize: 14,
    lineHeight: 18,
    color: '#262626',
  },
  captionText: {
    fontWeight: '400',
  },
  commentsPreview: {
    paddingHorizontal: 16,
    paddingVertical: 4,
  },
  viewCommentsText: {
    fontSize: 14,
    color: '#8E8E8E',
  },
  timeContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  timeText: {
    fontSize: 10,
    color: '#8E8E8E',
    fontWeight: '400',
    letterSpacing: 0.2,
  },
});