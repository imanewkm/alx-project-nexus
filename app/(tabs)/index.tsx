import React from 'react';
import { 
  View, 
  FlatList, 
  Text, 
  StyleSheet, 
  RefreshControl,
  ActivityIndicator 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Post } from '@/types/graphql';
import PostCard from '@/components/PostCard';
import PostSkeleton from '@/components/PostSkeleton';
import { useMockData } from '@/hooks/useMockData';

export default function HomeScreen() {
  const { posts, loading, hasNextPage, loadMore, refetch } = useMockData();

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
        <ActivityIndicator size="small" color="#3B82F6" />
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
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Social Feed</Text>
      </View>
      
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
              colors={['#3B82F6']}
            />
          }
          ListFooterComponent={renderFooter}
          showsVerticalScrollIndicator={false}
          style={styles.feed}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
  },
  feed: {
    flex: 1,
  },
  loadingFooter: {
    paddingVertical: 20,
    alignItems: 'center',
  },
});