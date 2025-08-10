import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  StatusBar,
  TextInput,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Send } from 'lucide-react-native';
import { Message, User } from '../types/graphql';
import { useLocalSearchParams, useRouter } from 'expo-router';

// Current user data
const currentUser: User = {
  id: 'current',
  username: 'maria_paints',
  email: 'maria@example.com',
  firstName: 'Maria',
  lastName: 'Rodriguez',
  avatar: 'https://images.pexels.com/photos/1239288/pexels-photo-1239288.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
};

// Mock conversations with different users and messages
const mockConversations: { [key: string]: { user: User; messages: Message[] } } = {
  '1': {
    user: {
      id: '1',
      username: 'sarah_weaver',
      email: 'sarah@example.com',
      firstName: 'Sarah',
      lastName: 'Johnson',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    },
    messages: [
      {
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
        receiver: currentUser,
        createdAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
        isRead: true
      },
      {
        id: '2',
        content: 'Hi Sarah! I\'d be happy to help you get started with basket weaving. It\'s such a relaxing and rewarding craft! 🧺',
        sender: currentUser,
        receiver: {
          id: '1',
          username: 'sarah_weaver',
          email: 'sarah@example.com',
          firstName: 'Sarah',
          lastName: 'Johnson',
          avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
        },
        createdAt: new Date(Date.now() - 1000 * 60 * 40).toISOString(),
        isRead: true
      },
      {
        id: '3',
        content: 'That would be amazing! What materials do I need to get started?',
        sender: {
          id: '1',
          username: 'sarah_weaver',
          email: 'sarah@example.com',
          firstName: 'Sarah',
          lastName: 'Johnson',
          avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
        },
        receiver: currentUser,
        createdAt: new Date(Date.now() - 1000 * 60 * 35).toISOString(),
        isRead: true
      },
      {
        id: '4',
        content: 'For beginners, I recommend starting with reed or willow. You\'ll also need basic tools like a bodkin and some clips. I can send you a list! 📝',
        sender: currentUser,
        receiver: {
          id: '1',
          username: 'sarah_weaver',
          email: 'sarah@example.com',
          firstName: 'Sarah',
          lastName: 'Johnson',
          avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
        },
        createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
        isRead: true
      },
      {
        id: '5',
        content: 'Perfect! Thank you so much. Would you be interested in doing a small workshop sometime?',
        sender: {
          id: '1',
          username: 'sarah_weaver',
          email: 'sarah@example.com',
          firstName: 'Sarah',
          lastName: 'Johnson',
          avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
        },
        receiver: currentUser,
        createdAt: new Date(Date.now() - 1000 * 60 * 25).toISOString(),
        isRead: false
      }
    ]
  },
  '2': {
    user: {
      id: '2',
      username: 'mike_potter',
      email: 'mike@example.com',
      firstName: 'Mike',
      lastName: 'Chen',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    },
    messages: [
      {
        id: '6',
        content: 'Hey Maria! I tried the glazing technique you showed us and it turned out amazing!',
        sender: {
          id: '2',
          username: 'mike_potter',
          email: 'mike@example.com',
          firstName: 'Mike',
          lastName: 'Chen',
          avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
        },
        receiver: currentUser,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
        isRead: true
      },
      {
        id: '7',
        content: 'That\'s wonderful to hear, Mike! I\'m so glad the technique worked well for you. Would you like to share a photo? �',
        sender: currentUser,
        receiver: {
          id: '2',
          username: 'mike_potter',
          email: 'mike@example.com',
          firstName: 'Mike',
          lastName: 'Chen',
          avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
        },
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2.5).toISOString(),
        isRead: true
      },
      {
        id: '8',
        content: 'Thanks for the pottery tips! The workshop was amazing 🎨',
        sender: {
          id: '2',
          username: 'mike_potter',
          email: 'mike@example.com',
          firstName: 'Mike',
          lastName: 'Chen',
          avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
        },
        receiver: currentUser,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
        isRead: true
      }
    ]
  },
  '3': {
    user: {
      id: '3',
      username: 'emma_knits',
      email: 'emma@example.com',
      firstName: 'Emma',
      lastName: 'Wilson',
      avatar: 'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    },
    messages: [
      {
        id: '9',
        content: 'Hi Maria! I saw your knitting pattern post. Could you help me with the cable stitch?',
        sender: {
          id: '3',
          username: 'emma_knits',
          email: 'emma@example.com',
          firstName: 'Emma',
          lastName: 'Wilson',
          avatar: 'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
        },
        receiver: currentUser,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
        isRead: true
      },
      {
        id: '10',
        content: 'Of course! Cable stitches can be tricky at first. The key is to keep consistent tension. Let me know which part you\'re struggling with! 🧶',
        sender: currentUser,
        receiver: {
          id: '3',
          username: 'emma_knits',
          email: 'emma@example.com',
          firstName: 'Emma',
          lastName: 'Wilson',
          avatar: 'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
        },
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
        isRead: true
      }
    ]
  },
  '4': {
    user: {
      id: '4',
      username: 'alex_carver',
      email: 'alex@example.com',
      firstName: 'Alex',
      lastName: 'Rodriguez',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    },
    messages: [
      {
        id: '11',
        content: 'I\'d love to collaborate on an art project! Are you interested?',
        sender: {
          id: '4',
          username: 'alex_carver',
          email: 'alex@example.com',
          firstName: 'Alex',
          lastName: 'Rodriguez',
          avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
        },
        receiver: currentUser,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
        isRead: true
      },
      {
        id: '12',
        content: 'That sounds amazing! I\'m always open to artistic collaborations. What kind of project do you have in mind? 🎨',
        sender: currentUser,
        receiver: {
          id: '4',
          username: 'alex_carver',
          email: 'alex@example.com',
          firstName: 'Alex',
          lastName: 'Rodriguez',
          avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
        },
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 47).toISOString(),
        isRead: true
      }
    ]
  }
};

export default function ConversationScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  
  // Get conversation ID from params, default to '1' if not provided
  const conversationId = (params.id as string) || '1';
  const conversationData = mockConversations[conversationId];
  
  // If no conversation data found, fallback to first conversation
  const activeConversation = conversationData || mockConversations['1'];
  const otherUser = activeConversation.user;
  
  const [messages, setMessages] = useState<Message[]>(activeConversation.messages);
  const [newMessage, setNewMessage] = useState('');

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const sendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: Date.now().toString(),
        content: newMessage.trim(),
        sender: currentUser,
        receiver: otherUser,
        createdAt: new Date().toISOString(),
        isRead: false
      };
      
      setMessages([...messages, message]);
      setNewMessage('');
    }
  };

  const renderMessage = ({ item }: { item: Message }) => {
    const isCurrentUser = item.sender.id === currentUser.id;
    
    return (
      <View style={[styles.messageContainer, isCurrentUser ? styles.sentMessage : styles.receivedMessage]}>
        {!isCurrentUser && (
          <Image source={{ uri: item.sender.avatar }} style={styles.messageAvatar} />
        )}
        <View style={[styles.messageBubble, isCurrentUser ? styles.sentBubble : styles.receivedBubble]}>
          <Text style={[styles.messageText, isCurrentUser ? styles.sentText : styles.receivedText]}>
            {item.content}
          </Text>
          <Text style={[styles.messageTime, isCurrentUser ? styles.sentTime : styles.receivedTime]}>
            {formatTime(item.createdAt)}
          </Text>
        </View>
        {isCurrentUser && (
          <Image source={{ uri: item.sender.avatar }} style={styles.messageAvatar} />
        )}
      </View>
    );
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <ArrowLeft size={24} color="#262626" />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.headerUser}
            onPress={() => router.push(`/user-profile?id=${otherUser.id}`)}
          >
            <Image source={{ uri: otherUser.avatar }} style={styles.headerAvatar} />
            <Text style={styles.headerName}>
              {otherUser.firstName && otherUser.lastName
                ? `${otherUser.firstName} ${otherUser.lastName}`
                : otherUser.username
              }
            </Text>
          </TouchableOpacity>
          <View style={styles.headerRight} />
        </View>

        {/* Messages */}
        <FlatList
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id}
          style={styles.messagesList}
          contentContainerStyle={styles.messagesContent}
          showsVerticalScrollIndicator={false}
        />

        {/* Input */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            value={newMessage}
            onChangeText={setNewMessage}
            placeholder="Type a message..."
            placeholderTextColor="#8E8E8E"
            multiline
          />
          <TouchableOpacity 
            style={[styles.sendButton, newMessage.trim() ? styles.sendButtonActive : styles.sendButtonInactive]}
            onPress={sendMessage}
            disabled={!newMessage.trim()}
          >
            <Send size={20} color={newMessage.trim() ? "#FFFFFF" : "#8E8E8E"} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
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
  headerUser: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 12,
  },
  headerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#262626',
  },
  headerRight: {
    width: 40,
  },
  messagesList: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  messagesContent: {
    padding: 16,
  },
  messageContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'flex-end',
  },
  sentMessage: {
    justifyContent: 'flex-end',
  },
  receivedMessage: {
    justifyContent: 'flex-start',
  },
  messageAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginHorizontal: 8,
  },
  messageBubble: {
    maxWidth: '70%',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
  },
  sentBubble: {
    backgroundColor: '#007AFF',
    borderBottomRightRadius: 6,
  },
  receivedBubble: {
    backgroundColor: '#E5E5EA',
    borderBottomLeftRadius: 6,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 20,
  },
  sentText: {
    color: '#FFFFFF',
  },
  receivedText: {
    color: '#000000',
  },
  messageTime: {
    fontSize: 12,
    marginTop: 4,
    opacity: 0.7,
  },
  sentTime: {
    color: '#FFFFFF',
  },
  receivedTime: {
    color: '#000000',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#DBDBDB',
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#DBDBDB',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 16,
    maxHeight: 100,
    marginRight: 8,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonActive: {
    backgroundColor: '#007AFF',
  },
  sendButtonInactive: {
    backgroundColor: '#F0F0F0',
  },
});
