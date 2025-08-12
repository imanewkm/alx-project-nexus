import React from 'react';
import { 
  View, 
  FlatList, 
  Text, 
  StyleSheet, 
  RefreshControl,
  ActivityIndicator,
  StatusBar 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Post } from '@/types/graphql';
import PostCard from '@/components/PostCard';
import PostSkeleton from '@/components/PostSkeleton';
import { useMockData } from '@/hooks/useMockData';

export default function HomeScreen() {
  const { posts, loading, hasNextPage, loadMore, refetch } = useMockData();

  console.log('HomeScreen render - posts.length:', posts.length, 'loading:', loading);

  const handleRefresh = () => {
    refetch();
  };

  const handleLoadMore = () => {
    loadMore();
  };

  const renderPost = ({ item }: { item: Post }) => (
    <PostCard post={item} />
  );

  const renderFooter = () => {
    if (!hasNextPage) return null;
    
    return (
      <View style={styles.loadingFooter}>
        <ActivityIndicator size="small" color="#8E8E8E" />
      </View>
    );
  };

  const renderSkeleton = () => (
    <View>
      {Array.from({ length: 3 }).map((_, index) => (
        <PostSkeleton key={index} />
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Text style={styles.appName}>SocialCrafters</Text>
        </View>
        
        <View style={styles.feedContainer}>
          {loading && posts.length === 0 ? (
            renderSkeleton()
          ) : (
            <FlatList
              data={posts}
              renderItem={renderPost}
              keyExtractor={(item) => item.id}
              onEndReached={handleLoadMore}
              onEndReachedThreshold={0.1}
              refreshControl={
                <RefreshControl
                  refreshing={loading && posts.length > 0}
                  onRefresh={handleRefresh}
                  colors={['#8E8E8E']}
                />
              }
              ListFooterComponent={renderFooter}
              showsVerticalScrollIndicator={false}
              style={styles.feed}
              contentContainerStyle={styles.feedContent}
            />
          )}
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#DBDBDB',
    alignItems: 'center',
  },
  appName: {
    fontSize: 28,
    fontWeight: '600',
    color: '#262626',
    letterSpacing: -0.5,
    fontFamily: 'System',
  },
  feedContainer: {
    flex: 1,
    alignItems: 'center',
  },
  feed: {
    flex: 1,
    width: '100%',
    maxWidth: 470, // Similar to mobile app max width
  },
  feedContent: {
    paddingBottom: 100,
  },
  loadingFooter: {
    paddingVertical: 20,
    alignItems: 'center',
  },
});