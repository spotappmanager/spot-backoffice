import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity, 
  Image,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, Filter, Bell } from 'lucide-react-native';
import { mockEvents } from '@/data';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';
import EventCard from '@/components/EventCard';
import { StatusBar } from 'expo-status-bar';

const CATEGORIES = [
  { id: 'all', name: 'All' },
  { id: 'party', name: 'Parties' },
  { id: 'concert', name: 'Concerts' },
  { id: 'club', name: 'Clubs' },
  { id: 'bar', name: 'Bars' },
  { id: 'food', name: 'Food' },
  { id: 'outdoor', name: 'Outdoor' },
  { id: 'culture', name: 'Culture' },
  { id: 'sport', name: 'Sports' },
  { id: 'meetup', name: 'Meetups' },
];

export default function DiscoverScreen() {
  const [selectedCategory, setSelectedCategory] = React.useState('all');
  
  const featuredEvents = mockEvents.filter(event => event.isFeatured);
  const liveEvents = mockEvents.filter(event => event.isLive);
  
  const filteredEvents = selectedCategory === 'all' 
    ? mockEvents 
    : mockEvents.filter(event => event.category === selectedCategory);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar style="dark" />
      
      <View style={styles.header}>
        <Text style={styles.title}>Discover</Text>
        <TouchableOpacity style={styles.notificationButton}>
          <Bell size={24} color={Colors.gray[800]} />
          <View style={styles.notificationBadge} />
        </TouchableOpacity>
      </View>
      
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Search size={20} color={Colors.gray[500]} />
          <Text style={styles.searchPlaceholder}>Search events, venues...</Text>
        </View>
        <TouchableOpacity style={styles.filterButton}>
          <Filter size={20} color={Colors.light.text} />
        </TouchableOpacity>
      </View>
      
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesContainer}
        contentContainerStyle={styles.categoriesContent}
      >
        {CATEGORIES.map(category => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.categoryButton,
              selectedCategory === category.id && styles.categoryButtonActive
            ]}
            onPress={() => setSelectedCategory(category.id)}
          >
            <Text 
              style={[
                styles.categoryText,
                selectedCategory === category.id && styles.categoryTextActive
              ]}
            >
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      
      {featuredEvents.length > 0 && (
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Featured Events</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.featuredContent}
          >
            {featuredEvents.map(event => (
              <TouchableOpacity 
                key={event.id}
                style={styles.featuredCard}
                activeOpacity={0.9}
              >
                <Image 
                  source={{ uri: event.coverImage || 'https://images.pexels.com/photos/2263436/pexels-photo-2263436.jpeg' }}
                  style={styles.featuredImage}
                />
                <View style={styles.featuredInfo}>
                  <Text style={styles.featuredTitle}>{event.title}</Text>
                  <Text style={styles.featuredLocation}>{event.location.address}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
      
      {liveEvents.length > 0 && (
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Happening Now</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.liveContent}
          >
            {liveEvents.map(event => (
              <TouchableOpacity 
                key={event.id}
                style={styles.liveCard}
                activeOpacity={0.9}
              >
                <Image 
                  source={{ uri: event.coverImage || 'https://images.pexels.com/photos/2263436/pexels-photo-2263436.jpeg' }}
                  style={styles.liveImage}
                />
                <View style={styles.liveBadge}>
                  <View style={styles.liveIndicator} />
                  <Text style={styles.liveText}>LIVE</Text>
                </View>
                <View style={styles.liveInfo}>
                  <Text style={styles.liveTitle}>{event.title}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
      
      <View style={styles.eventsContainer}>
        <Text style={styles.sectionTitle}>All Events</Text>
        <FlatList
          data={filteredEvents}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <EventCard event={item} />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.eventsList}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Layout.spacing.lg,
    paddingVertical: Layout.spacing.md,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Poppins-Bold',
    color: Colors.light.text,
  },
  notificationButton: {
    position: 'relative',
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.light.card,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notificationBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.error[500],
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: Layout.spacing.lg,
    marginBottom: Layout.spacing.md,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.light.card,
    borderRadius: Layout.borderRadius.lg,
    paddingHorizontal: Layout.spacing.md,
    paddingVertical: Layout.spacing.sm,
  },
  searchPlaceholder: {
    flex: 1,
    marginLeft: Layout.spacing.sm,
    color: Colors.gray[400],
    fontFamily: 'Inter-Regular',
  },
  filterButton: {
    width: 44,
    height: 44,
    borderRadius: Layout.borderRadius.md,
    backgroundColor: Colors.primary[500],
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: Layout.spacing.sm,
  },
  categoriesContainer: {
    maxHeight: 48,
    marginBottom: Layout.spacing.md,
  },
  categoriesContent: {
    paddingHorizontal: Layout.spacing.lg,
  },
  categoryButton: {
    paddingHorizontal: Layout.spacing.md,
    paddingVertical: Layout.spacing.xs,
    borderRadius: Layout.borderRadius.full,
    backgroundColor: Colors.light.card,
    marginRight: Layout.spacing.sm,
  },
  categoryButtonActive: {
    backgroundColor: Colors.primary[500],
  },
  categoryText: {
    color: Colors.gray[600],
    fontFamily: 'Inter-Medium',
  },
  categoryTextActive: {
    color: Colors.light.text,
  },
  sectionContainer: {
    marginBottom: Layout.spacing.lg,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    marginHorizontal: Layout.spacing.lg,
    marginBottom: Layout.spacing.sm,
    color: Colors.light.text,
  },
  featuredContent: {
    paddingHorizontal: Layout.spacing.lg,
  },
  featuredCard: {
    width: 280,
    height: 160,
    borderRadius: Layout.borderRadius.lg,
    overflow: 'hidden',
    marginRight: Layout.spacing.md,
  },
  featuredImage: {
    width: '100%',
    height: '100%',
  },
  featuredInfo: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: Layout.spacing.md,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  featuredTitle: {
    color: Colors.light.background,
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    marginBottom: 4,
  },
  featuredLocation: {
    color: Colors.gray[200],
    fontSize: 12,
    fontFamily: 'Inter-Regular',
  },
  liveContent: {
    paddingHorizontal: Layout.spacing.lg,
  },
  liveCard: {
    width: 160,
    height: 180,
    borderRadius: Layout.borderRadius.lg,
    overflow: 'hidden',
    marginRight: Layout.spacing.md,
    backgroundColor: Colors.light.card,
  },
  liveImage: {
    width: '100%',
    height: 120,
  },
  liveBadge: {
    position: 'absolute',
    top: Layout.spacing.sm,
    right: Layout.spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.error[500],
    paddingHorizontal: Layout.spacing.sm,
    paddingVertical: Layout.spacing.xs,
    borderRadius: Layout.borderRadius.full,
  },
  liveIndicator: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.light.text,
    marginRight: 4,
  },
  liveText: {
    color: Colors.light.text,
    fontSize: 10,
    fontWeight: '600',
  },
  liveInfo: {
    padding: Layout.spacing.sm,
  },
  liveTitle: {
    color: Colors.light.text,
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
  },
  eventsContainer: {
    flex: 1,
  },
  eventsList: {
    paddingHorizontal: Layout.spacing.lg,
    paddingBottom: Layout.spacing.xl,
  },
});