import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity, 
  Image,
  StatusBar 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, Edit } from 'lucide-react-native';
import { Conversation } from '@/types/graphql';

// Mock conversations data
const mockConversations: Conversation[] = [
  {
    id: '1',
    participants: [
      {
        id: '1',
        username: 'sarah_weaver',
        email: 'sarah@example.com',
        firstName: 'Sarah',
        lastName: 'Johnson',
        avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
      }
    ],
    lastMessage: {
      id: '1',
      content: 'Hi! I love your basket weaving work. Could you teach me the basics?',
      sender: {
        id: '1',
        username: 'sarah_weaver',
        email: 'sarah@example.com',
        firstName: 'Sarah',
        lastName: 'Johnson',
        avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
      },
      receiver: {
        id: 'current',
        username: 'maria_paints',
        email: 'maria@example.com',
        firstName: 'Maria',
        lastName: 'Rodriguez',
        avatar: 'https://images.pexels.com/photos/1239288/pexels-photo-1239288.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
      },
      createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
      isRead: false
    },
    unreadCount: 2,
    updatedAt: new Date(Date.now() - 1000 * 60 * 30).toISOString()
  },
  {
    id: '2',
    participants: [
      {
        id: '2',
        username: 'mike_potter',
        email: 'mike@example.com',
        firstName: 'Mike',
        lastName: 'Chen',
        avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
      }
    ],
    lastMessage: {
      id: '2',
      content: 'Thanks for the pottery tips! The workshop was amazing 🎨',
      sender: {
        id: '2',
        username: 'mike_potter',
        email: 'mike@example.com',
        firstName: 'Mike',
        lastName: 'Chen',
        avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
      },
      receiver: {
        id: 'current',
        username: 'maria_paints',
        email: 'maria@example.com',
        firstName: 'Maria',
        lastName: 'Rodriguez',
        avatar: 'https://images.pexels.com/photos/1239288/pexels-photo-1239288.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
      },
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
      isRead: true
    },
    unreadCount: 0,
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString()
  },
  {
    id: '3',
    participants: [
      {
        id: '3',
        username: 'emma_knits',
        email: 'emma@example.com',
        firstName: 'Emma',
        lastName: 'Wilson',
        avatar: 'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
      }
    ],
    lastMessage: {
      id: '3',
      content: 'Do you have any painting tutorials for beginners?',
      sender: {
        id: '3',
        username: 'emma_knits',
        email: 'emma@example.com',
        firstName: 'Emma',
        lastName: 'Wilson',
        avatar: 'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
      },
      receiver: {
        id: 'current',
        username: 'maria_paints',
        email: 'maria@example.com',
        firstName: 'Maria',
        lastName: 'Rodriguez',
        avatar: 'https://images.pexels.com/photos/1239288/pexels-photo-1239288.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
      },
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
      isRead: true
    },
    unreadCount: 0,
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString()
  },
  {
    id: '4',
    participants: [
      {
        id: '4',
        username: 'alex_carver',
        email: 'alex@example.com',
        firstName: 'Alex',
        lastName: 'Rodriguez',
        avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
      }
    ],
    lastMessage: {
      id: '4',
      content: 'I\'d love to collaborate on an art project! Are you interested?',
      sender: {
        id: '4',
        username: 'alex_carver',
        email: 'alex@example.com',
        firstName: 'Alex',
        lastName: 'Rodriguez',
        avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
      },
      receiver: {
        id: 'current',
        username: 'maria_paints',
        email: 'maria@example.com',
        firstName: 'Maria',
        lastName: 'Rodriguez',
        avatar: 'https://images.pexels.com/photos/1239288/pexels-photo-1239288.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
      },
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
      isRead: true
    },
    unreadCount: 0,
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString()
  }
];

export default function MessagesScreen() {
  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) return 'now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d`;
    return `${Math.floor(diffInSeconds / 604800)}w`;
  };

  const renderConversation = ({ item }: { item: Conversation }) => {
    const otherUser = item.participants[0];
    const isUnread = item.unreadCount > 0;

    return (
      <TouchableOpacity style={styles.conversationItem}>
        <Image
          source={{ uri: otherUser.avatar }}
          style={styles.avatar}
        />
        <View style={styles.conversationContent}>
          <View style={styles.conversationHeader}>
            <Text style={[styles.name, isUnread && styles.unreadName]}>
              {otherUser.firstName && otherUser.lastName
                ? `${otherUser.firstName} ${otherUser.lastName}`
                : otherUser.username
              }
            </Text>
            <Text style={styles.time}>
              {formatTimeAgo(item.updatedAt)}
            </Text>
          </View>
          <View style={styles.messageRow}>
            <Text style={[styles.lastMessage, isUnread && styles.unreadMessage]} numberOfLines={1}>
              {item.lastMessage.content}
            </Text>
            {item.unreadCount > 0 && (
              <View style={styles.unreadBadge}>
                <Text style={styles.unreadCount}>{item.unreadCount}</Text>
              </View>
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Messages</Text>
          <TouchableOpacity style={styles.newMessageButton}>
            <Edit size={20} color="#262626" />
          </TouchableOpacity>
        </View>

        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Search size={16} color="#8E8E8E" />
            <Text style={styles.searchPlaceholder}>Search conversations...</Text>
          </View>
        </View>

        <FlatList
          data={mockConversations}
          renderItem={renderConversation}
          keyExtractor={(item) => item.id}
          style={styles.conversationsList}
          showsVerticalScrollIndicator={false}
        />
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '600',
    color: '#262626',
    letterSpacing: -0.5,
    fontFamily: 'System',
  },
  newMessageButton: {
    padding: 8,
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchPlaceholder: {
    marginLeft: 8,
    color: '#8E8E8E',
    fontSize: 16,
  },
  conversationsList: {
    flex: 1,
  },
  conversationItem: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignItems: 'center',
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginRight: 12,
  },
  conversationContent: {
    flex: 1,
  },
  conversationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  name: {
    fontSize: 16,
    color: '#262626',
    fontWeight: '400',
  },
  unreadName: {
    fontWeight: '600',
  },
  time: {
    fontSize: 14,
    color: '#8E8E8E',
  },
  messageRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lastMessage: {
    fontSize: 14,
    color: '#8E8E8E',
    flex: 1,
    marginRight: 8,
  },
  unreadMessage: {
    color: '#262626',
    fontWeight: '500',
  },
  unreadBadge: {
    backgroundColor: '#007AFF',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
  },
  unreadCount: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
});
