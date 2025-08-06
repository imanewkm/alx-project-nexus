import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Settings, CreditCard as Edit } from 'lucide-react-native';

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity style={styles.settingsButton}>
          <Settings size={24} color="#6B7280" />
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.content}>
        <View style={styles.profileSection}>
          <Image
            source={{
              uri: 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
            }}
            style={styles.profileImage}
          />
          <Text style={styles.name}>John Doe</Text>
          <Text style={styles.username}>@johndoe</Text>
          <Text style={styles.bio}>
            Software developer passionate about creating amazing mobile experiences. 
            Love React Native and GraphQL!
          </Text>
          
          <TouchableOpacity style={styles.editButton}>
            <Edit size={16} color="#3B82F6" />
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.statsSection}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>42</Text>
            <Text style={styles.statLabel}>Posts</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>1.2K</Text>
            <Text style={styles.statLabel}>Followers</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>348</Text>
            <Text style={styles.statLabel}>Following</Text>
          </View>
        </View>
      </ScrollView>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
  },
  settingsButton: {
    padding: 8,
  },
  content: {
    flex: 1,
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
  },
  editButtonText: {
    color: '#3B82F6',
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
});