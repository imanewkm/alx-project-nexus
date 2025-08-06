import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Heart, MessageCircle, UserPlus } from 'lucide-react-native';

interface NotificationItem {
  id: string;
  type: 'like' | 'comment' | 'follow';
  user: {
    name: string;
    avatar: string;
  };
  message: string;
  timeAgo: string;
  read: boolean;
}

const mockNotifications: NotificationItem[] = [
  {
    id: '1',
    type: 'like',
    user: {
      name: 'Sarah Johnson',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    },
    message: 'liked your post',
    timeAgo: '5m',
    read: false,
  },
  {
    id: '2',
    type: 'comment',
    user: {
      name: 'Mike Chen',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    },
    message: 'commented on your post',
    timeAgo: '1h',
    read: false,
  },
  {
    id: '3',
    type: 'follow',
    user: {
      name: 'Emma Wilson',
      avatar: 'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    },
    message: 'started following you',
    timeAgo: '2h',
    read: true,
  },
];

export default function NotificationsScreen() {
  const renderIcon = (type: string) => {
    switch (type) {
      case 'like':
        return <Heart size={20} color="#EF4444" fill="#EF4444" />;
      case 'comment':
        return <MessageCircle size={20} color="#3B82F6" />;
      case 'follow':
        return <UserPlus size={20} color="#10B981" />;
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Notifications</Text>
      </View>
      
      <ScrollView style={styles.content}>
        {mockNotifications.map((notification) => (
          <TouchableOpacity
            key={notification.id}
            style={[
              styles.notificationItem,
              !notification.read && styles.unreadNotification
            ]}
          >
            <Image
              source={{ uri: notification.user.avatar }}
              style={styles.avatar}
            />
            
            <View style={styles.notificationContent}>
              <View style={styles.notificationHeader}>
                <Text style={styles.notificationText}>
                  <Text style={styles.userName}>{notification.user.name}</Text>
                  {' '}
                  <Text style={styles.action}>{notification.message}</Text>
                </Text>
                <Text style={styles.timeAgo}>{notification.timeAgo}</Text>
              </View>
            </View>
            
            <View style={styles.iconContainer}>
              {renderIcon(notification.type)}
            </View>
            
            {!notification.read && <View style={styles.unreadDot} />}
          </TouchableOpacity>
        ))}
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
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
  },
  content: {
    flex: 1,
  },
  notificationItem: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  unreadNotification: {
    backgroundColor: '#F0F9FF',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  notificationContent: {
    flex: 1,
  },
  notificationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  notificationText: {
    fontSize: 16,
    lineHeight: 22,
    flex: 1,
  },
  userName: {
    fontWeight: '600',
    color: '#111827',
  },
  action: {
    color: '#374151',
  },
  timeAgo: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 8,
  },
  iconContainer: {
    marginLeft: 12,
    marginRight: 8,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#3B82F6',
  },
});