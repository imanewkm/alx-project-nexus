import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Dimensions, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Calendar } from 'lucide-react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { User } from '@/types/graphql';

const { width: screenWidth } = Dimensions.get('window');
const isTablet = screenWidth >= 768;

// Mock user data for different users
const mockUsers: { [key: string]: User & { 
  bio: string; 
  posts: number; 
  followers: number; 
  following: number;
  isInstructor: boolean;
  artworks: string[];
} } = {
  '1': {
    id: '1',
    username: 'sarah_weaver',
    email: 'sarah@example.com',
    firstName: 'Sarah',
    lastName: 'Johnson',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    bio: '🧺 Basket Weaving Enthusiast\n📍 Portland, Oregon\n🌿 Sustainable crafts & natural materials\n✨ Learning traditional techniques\n💚 Eco-friendly lifestyle',
    posts: 12,
    followers: 856,
    following: 234,
    isInstructor: false,
    artworks: [
      'https://images.pexels.com/photos/4792065/pexels-photo-4792065.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
      'https://images.pexels.com/photos/5699456/pexels-photo-5699456.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
      'https://images.pexels.com/photos/6238050/pexels-photo-6238050.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
      'https://images.pexels.com/photos/4947663/pexels-photo-4947663.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
      'https://images.pexels.com/photos/4553618/pexels-photo-4553618.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
      'https://images.pexels.com/photos/5699462/pexels-photo-5699462.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop'
    ]
  },
  '2': {
    id: '2',
    username: 'mike_potter',
    email: 'mike@example.com',
    firstName: 'Mike',
    lastName: 'Chen',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    bio: '🏺 Ceramic Artist & Potter\n📍 San Francisco, CA\n🎨 Functional pottery & sculptural pieces\n✨ 8 years of throwing experience\n🔥 High-fire stoneware specialist',
    posts: 28,
    followers: 1234,
    following: 345,
    isInstructor: true,
    artworks: [
      'https://images.pexels.com/photos/1117481/pexels-photo-1117481.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
      'https://images.pexels.com/photos/1373736/pexels-photo-1373736.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
      'https://images.pexels.com/photos/1094767/pexels-photo-1094767.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
      'https://images.pexels.com/photos/1010519/pexels-photo-1010519.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
      'https://images.pexels.com/photos/1462724/pexels-photo-1462724.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
      'https://images.pexels.com/photos/1462725/pexels-photo-1462725.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop'
    ]
  },
  '3': {
    id: '3',
    username: 'emma_knits',
    email: 'emma@example.com',
    firstName: 'Emma',
    lastName: 'Wilson',
    avatar: 'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    bio: '🧶 Knitting & Crochet Designer\n📍 London, UK\n🌈 Colorwork & cable specialist\n✨ Creating patterns for 5+ years\n📚 Self-taught fiber artist',
    posts: 35,
    followers: 2156,
    following: 567,
    isInstructor: false,
    artworks: [
      'https://images.pexels.com/photos/1445502/pexels-photo-1445502.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
      'https://images.pexels.com/photos/1445505/pexels-photo-1445505.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
      'https://images.pexels.com/photos/1445504/pexels-photo-1445504.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
      'https://images.pexels.com/photos/6697662/pexels-photo-6697662.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
      'https://images.pexels.com/photos/6032896/pexels-photo-6032896.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
      'https://images.pexels.com/photos/6697659/pexels-photo-6697659.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop'
    ]
  },
  '4': {
    id: '4',
    username: 'alex_carver',
    email: 'alex@example.com',
    firstName: 'Alex',
    lastName: 'Rodriguez',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    bio: '🪚 Wood Carving & Sculpture\n📍 Denver, Colorado\n🌲 Working with reclaimed wood\n✨ Traditional hand carving techniques\n🏔️ Mountain-inspired art',
    posts: 18,
    followers: 987,
    following: 198,
    isInstructor: true,
    artworks: [
      'https://images.pexels.com/photos/162553/keys-workshop-mechanic-tools-162553.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
      'https://images.pexels.com/photos/1251175/pexels-photo-1251175.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
      'https://images.pexels.com/photos/1251176/pexels-photo-1251176.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
      'https://images.pexels.com/photos/1022923/pexels-photo-1022923.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
      'https://images.pexels.com/photos/1251177/pexels-photo-1251177.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
      'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop'
    ]
  }
};

export default function UserProfileScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  
  // Get user ID from params, default to '1' if not provided
  const userId = (params.id as string) || '1';
  const user = mockUsers[userId] || mockUsers['1'];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <ArrowLeft size={24} color="#262626" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Profile</Text>
          <View style={styles.headerRight} />
        </View>
        
        <ScrollView style={styles.content}>
          <View style={styles.profileSection}>
            <Image
              source={{ uri: user.avatar }}
              style={styles.profileImage}
            />
            <Text style={styles.name}>
              {user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : user.username}
            </Text>
            <Text style={styles.username}>@{user.username}</Text>
            <Text style={styles.bio}>{user.bio}</Text>
            
            {user.isInstructor && (
              <View style={[styles.buttonRow, isTablet ? styles.buttonRowDesktop : styles.buttonRowMobile]}>
                <TouchableOpacity 
                  style={[styles.workshopButton, isTablet ? styles.workshopButtonDesktop : styles.workshopButtonMobile]}
                  onPress={() => router.push('/workshop-booking')}
                >
                  <Calendar size={16} color="#FFFFFF" />
                  <Text style={styles.workshopButtonText}>Book Workshop</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
          
          <View style={styles.statsSection}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{user.posts}</Text>
              <Text style={styles.statLabel}>Posts</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{user.followers >= 1000 ? `${(user.followers / 1000).toFixed(1)}K` : user.followers}</Text>
              <Text style={styles.statLabel}>Followers</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{user.following}</Text>
              <Text style={styles.statLabel}>Following</Text>
            </View>
          </View>

          {/* Posts Grid */}
          <View style={styles.postsSection}>
            <Text style={styles.postsTitle}>Recent Artwork</Text>
            <View style={styles.postsGrid}>
              {user.artworks.map((artwork, index) => (
                <TouchableOpacity key={index} style={styles.postItem}>
                  <Image
                    source={{ uri: artwork }}
                    style={styles.postImage}
                  />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </ScrollView>
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
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#DBDBDB',
    backgroundColor: '#FFFFFF',
  },
  backButton: {
    padding: 8,
    marginRight: 8,
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '600',
    color: '#262626',
    textAlign: 'center',
  },
  headerRight: {
    width: 40,
  },
  content: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  profileSection: {
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  username: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 16,
  },
  bio: {
    fontSize: 16,
    color: '#374151',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 24,
  },
  buttonRow: {
    width: '100%',
  },
  buttonRowDesktop: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonRowMobile: {
    flexDirection: 'column',
  },
  workshopButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#007AFF',
    borderRadius: 20,
    justifyContent: 'center',
  },
  workshopButtonDesktop: {
    width: 150,
  },
  workshopButtonMobile: {
    width: '100%',
  },
  workshopButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  statsSection: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 24,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
  postsSection: {
    backgroundColor: '#FFFFFF',
    paddingTop: 24,
  },
  postsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  postsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
  },
  postItem: {
    width: '31%',
    aspectRatio: 1,
    marginRight: '3.5%',
    marginBottom: 14,
  },
  postImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
});
