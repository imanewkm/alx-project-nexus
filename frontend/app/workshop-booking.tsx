import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  StatusBar,
  Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Calendar, Clock, MapPin, Users, Star } from 'lucide-react-native';
import { useRouter } from 'expo-router';

interface Workshop {
  id: string;
  title: string;
  description: string;
  instructor: string;
  instructorAvatar: string;
  date: string;
  time: string;
  duration: string;
  location: string;
  price: number;
  maxParticipants: number;
  currentParticipants: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  image: string;
  materials: string[];
  rating: number;
  reviews: number;
}

const mockWorkshops: Workshop[] = [
  {
    id: '1',
    title: 'Watercolor Landscapes for Beginners',
    description: 'Learn the fundamentals of watercolor painting while creating beautiful landscape scenes. Perfect for those new to watercolors!',
    instructor: 'Maria Rodriguez',
    instructorAvatar: 'https://images.pexels.com/photos/1239288/pexels-photo-1239288.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    date: '2025-08-15',
    time: '10:00 AM',
    duration: '3 hours',
    location: 'Art Studio Downtown',
    price: 75,
    maxParticipants: 12,
    currentParticipants: 8,
    difficulty: 'Beginner',
    image: 'https://images.pexels.com/photos/1266808/pexels-photo-1266808.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
    materials: ['Watercolor paints', 'Brushes', 'Watercolor paper', 'Palette'],
    rating: 4.8,
    reviews: 24
  },
  {
    id: '2',
    title: 'Advanced Acrylic Techniques',
    description: 'Explore advanced acrylic painting techniques including texture creation, color mixing, and abstract composition.',
    instructor: 'Maria Rodriguez',
    instructorAvatar: 'https://images.pexels.com/photos/1239288/pexels-photo-1239288.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    date: '2025-08-22',
    time: '2:00 PM',
    duration: '4 hours',
    location: 'Art Studio Downtown',
    price: 95,
    maxParticipants: 10,
    currentParticipants: 5,
    difficulty: 'Advanced',
    image: 'https://images.pexels.com/photos/1053687/pexels-photo-1053687.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
    materials: ['Acrylic paints', 'Canvas', 'Various brushes', 'Palette knife', 'Mediums'],
    rating: 4.9,
    reviews: 18
  },
  {
    id: '3',
    title: 'Portrait Painting Workshop',
    description: 'Learn the art of portrait painting with step-by-step guidance on proportions, shading, and capturing likeness.',
    instructor: 'Maria Rodriguez',
    instructorAvatar: 'https://images.pexels.com/photos/1239288/pexels-photo-1239288.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    date: '2025-08-29',
    time: '11:00 AM',
    duration: '5 hours',
    location: 'Art Studio Downtown',
    price: 120,
    maxParticipants: 8,
    currentParticipants: 3,
    difficulty: 'Intermediate',
    image: 'https://images.pexels.com/photos/1742370/pexels-photo-1742370.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
    materials: ['Oil or acrylic paints', 'Canvas', 'Brushes', 'Charcoal for sketching'],
    rating: 4.7,
    reviews: 31
  }
];

export default function WorkshopBookingScreen() {
  const router = useRouter();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return '#4CAF50';
      case 'Intermediate':
        return '#FF9800';
      case 'Advanced':
        return '#F44336';
      default:
        return '#757575';
    }
  };

  const handleBookWorkshop = (workshop: Workshop) => {
    Alert.alert(
      'Confirm Booking',
      `Would you like to book "${workshop.title}" for $${workshop.price}?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Book Now',
          onPress: () => {
            Alert.alert(
              'Booking Confirmed!',
              `Your spot in "${workshop.title}" has been reserved. You'll receive a confirmation email shortly.`,
              [{ text: 'OK', onPress: () => router.back() }]
            );
          },
        },
      ]
    );
  };

  const renderWorkshop = (workshop: Workshop) => (
    <View key={workshop.id} style={styles.workshopCard}>
      <Image source={{ uri: workshop.image }} style={styles.workshopImage} />
      
      <View style={styles.workshopContent}>
        <View style={styles.workshopHeader}>
          <Text style={styles.workshopTitle}>{workshop.title}</Text>
          <View style={[styles.difficultyBadge, { backgroundColor: getDifficultyColor(workshop.difficulty) }]}>
            <Text style={styles.difficultyText}>{workshop.difficulty}</Text>
          </View>
        </View>

        <Text style={styles.workshopDescription}>{workshop.description}</Text>

        <View style={styles.instructorRow}>
          <Image source={{ uri: workshop.instructorAvatar }} style={styles.instructorAvatar} />
          <Text style={styles.instructorName}>with {workshop.instructor}</Text>
          <View style={styles.ratingRow}>
            <Star size={14} color="#FFD700" fill="#FFD700" />
            <Text style={styles.rating}>{workshop.rating} ({workshop.reviews})</Text>
          </View>
        </View>

        <View style={styles.detailsGrid}>
          <View style={styles.detailItem}>
            <Calendar size={16} color="#666666" />
            <Text style={styles.detailText}>{formatDate(workshop.date)}</Text>
          </View>
          <View style={styles.detailItem}>
            <Clock size={16} color="#666666" />
            <Text style={styles.detailText}>{workshop.time} ({workshop.duration})</Text>
          </View>
          <View style={styles.detailItem}>
            <MapPin size={16} color="#666666" />
            <Text style={styles.detailText}>{workshop.location}</Text>
          </View>
          <View style={styles.detailItem}>
            <Users size={16} color="#666666" />
            <Text style={styles.detailText}>
              {workshop.currentParticipants}/{workshop.maxParticipants} spots filled
            </Text>
          </View>
        </View>

        <View style={styles.materialsSection}>
          <Text style={styles.materialsTitle}>Materials Included:</Text>
          <Text style={styles.materialsList}>{workshop.materials.join(' • ')}</Text>
        </View>

        <View style={styles.workshopFooter}>
          <View style={styles.priceContainer}>
            <Text style={styles.price}>${workshop.price}</Text>
            <Text style={styles.priceLabel}>per person</Text>
          </View>
          <TouchableOpacity
            style={[
              styles.bookButton,
              workshop.currentParticipants >= workshop.maxParticipants && styles.bookButtonDisabled
            ]}
            onPress={() => handleBookWorkshop(workshop)}
            disabled={workshop.currentParticipants >= workshop.maxParticipants}
          >
            <Text style={styles.bookButtonText}>
              {workshop.currentParticipants >= workshop.maxParticipants ? 'Sold Out' : 'Book Now'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <ArrowLeft size={24} color="#262626" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Workshops</Text>
          <View style={styles.headerRight} />
        </View>

        <View style={styles.feedContainer}>
          <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
            <View style={styles.content}>
              <Text style={styles.pageTitle}>Book a Workshop</Text>
              <Text style={styles.pageSubtitle}>
                Join Maria&apos;s painting workshops and improve your artistic skills in a supportive environment.
              </Text>

              {mockWorkshops.map(renderWorkshop)}
            </View>
          </ScrollView>
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
  feedContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
  },
  scrollView: {
    flex: 1,
    width: '100%',
    maxWidth: 470, // Similar to mobile app max width
  },
  content: {
    padding: 16,
  },
  pageTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#262626',
    marginBottom: 8,
  },
  pageSubtitle: {
    fontSize: 16,
    color: '#666666',
    lineHeight: 22,
    marginBottom: 24,
  },
  workshopCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  workshopImage: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  workshopContent: {
    padding: 16,
  },
  workshopHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  workshopTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#262626',
    marginRight: 12,
  },
  difficultyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  difficultyText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  workshopDescription: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
    marginBottom: 12,
  },
  instructorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  instructorAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 8,
  },
  instructorName: {
    fontSize: 14,
    color: '#262626',
    fontWeight: '500',
    flex: 1,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 12,
    color: '#666666',
    marginLeft: 4,
  },
  detailsGrid: {
    marginBottom: 16,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailText: {
    fontSize: 14,
    color: '#666666',
    marginLeft: 8,
  },
  materialsSection: {
    marginBottom: 20,
  },
  materialsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#262626',
    marginBottom: 4,
  },
  materialsList: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
  },
  workshopFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceContainer: {
    flex: 1,
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#262626',
  },
  priceLabel: {
    fontSize: 12,
    color: '#666666',
  },
  bookButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  bookButtonDisabled: {
    backgroundColor: '#CCCCCC',
  },
  bookButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});
