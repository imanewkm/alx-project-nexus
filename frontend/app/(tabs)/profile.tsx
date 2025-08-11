import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Settings, Edit3, Calendar } from 'lucide-react-native';

const { width: screenWidth } = Dimensions.get('window');
const isTablet = screenWidth >= 768;

export default function ProfileScreen() {
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft} />
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity style={styles.settingsButton}>
          <Settings size={24} color="#6B7280" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.feedContainer}>
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.profileSection}>
          <Image
            source={{
              uri: 'https://images.pexels.com/photos/1239288/pexels-photo-1239288.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
            }}
            style={styles.profileImage}
          />
          <Text style={styles.name}>Maria Rodriguez</Text>
          <Text style={styles.username}>@maria_paints</Text>
          <Text style={styles.bio}>
            🎨 Professional Artist & Workshop Instructor{'\n'}
            📍 Downtown Art Studio{'\n'}
            🖌️ Watercolor • Acrylic • Oil Painting{'\n'}
            ✨ Teaching art for 15+ years{'\n'}
            📅 Weekend workshops available
          </Text>
          
          <View style={[styles.buttonRow, isTablet ? styles.buttonRowDesktop : styles.buttonRowMobile]}>
            <TouchableOpacity style={[styles.editButton, isTablet ? styles.editButtonDesktop : styles.editButtonMobile]}>
              <Edit3 size={16} color="#3B82F6" />
              <Text style={styles.editButtonText}>Edit Profile</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.workshopButton, isTablet ? styles.workshopButtonDesktop : styles.workshopButtonMobile]}
            >
              <Calendar size={16} color="#FFFFFF" />
              <Text style={styles.workshopButtonText}>Add Workshop</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.statsSection}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>5</Text>
            <Text style={styles.statLabel}>Posts</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>2.8K</Text>
            <Text style={styles.statLabel}>Followers</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>421</Text>
            <Text style={styles.statLabel}>Following</Text>
          </View>
        </View>

        {/* Posts Grid */}
        <View style={styles.postsSection}>
          <Text style={styles.postsTitle}>Recent Artwork</Text>
          <View style={styles.postsGrid}>
            <TouchableOpacity style={styles.postItem}>
              <Image
                source={{ uri: 'https://images.pexels.com/photos/1572386/pexels-photo-1572386.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop' }}
                style={styles.postImage}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.postItem}>
              <Image
                source={{ uri: 'https://images.pexels.com/photos/1194420/pexels-photo-1194420.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop' }}
                style={styles.postImage}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.postItem}>
              <Image
                source={{ uri: 'https://images.pexels.com/photos/1565982/pexels-photo-1565982.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop' }}
                style={styles.postImage}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.postItem}>
              <Image
                source={{ uri: 'https://images.pexels.com/photos/1509534/pexels-photo-1509534.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop' }}
                style={styles.postImage}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.postItem}>
              <Image
                source={{ uri: 'https://images.pexels.com/photos/1266808/pexels-photo-1266808.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop' }}
                style={styles.postImage}
              />
            </TouchableOpacity>
          </View>
        </View>
        </ScrollView>
      </View>
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
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#DBDBDB',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerLeft: {
    width: 32, // Match the settings button width for balance
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '600',
    color: '#262626',
    letterSpacing: -0.5,
    fontFamily: 'System',
  },
  settingsButton: {
    padding: 8,
  },
  feedContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
  },
  content: {
    flex: 1,
    width: '100%',
    maxWidth: 470,
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
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#3B82F6',
    borderRadius: 20,
    justifyContent: 'center',
  },
  editButtonDesktop: {
    width: 140,
    marginRight: 8,
  },
  editButtonMobile: {
    width: '100%',
    marginBottom: 12,
  },
  editButtonText: {
    color: '#3B82F6',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
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
    marginLeft: 8,
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
    paddingTop: 20,
  },
  postsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  postsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 12,
    paddingBottom: 20,
  },
  postItem: {
    width: '33.33%',
    aspectRatio: 1,
    padding: 2,
  },
  postImage: {
    width: '100%',
    height: '100%',
    borderRadius: 4,
  },
});