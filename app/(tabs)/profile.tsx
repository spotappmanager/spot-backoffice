import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  TouchableOpacity, 
  ScrollView,
  Platform
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Settings,
  Award,
  Calendar,
  Clock,
  Heart,
  ChevronRight,
  MapPin,
  Gift,
  Star,
  LogOut
} from 'lucide-react-native';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';
import { StatusBar } from 'expo-status-bar';
import { mockUsers, mockEvents } from '@/data';

// Using the first mock user for this demo
const currentUser = mockUsers[0];

export default function ProfileScreen() {
  // Filter to show just a few of the user's attended events
  const userEvents = mockEvents.slice(0, 3);
  
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar style="light" />
      
      <View style={styles.header}>
        <Image 
          source={{ uri: currentUser.profileImage || 'https://i.pravatar.cc/300?img=1' }}
          style={styles.coverImage}
        />
        <TouchableOpacity style={styles.settingsButton}>
          <Settings size={20} color={Colors.light.text} />
        </TouchableOpacity>
      </View>
      
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.profileHeader}>
          <Image 
            source={{ uri: currentUser.profileImage || 'https://i.pravatar.cc/300?img=1' }}
            style={styles.profileImage}
          />
          <Text style={styles.displayName}>{currentUser.displayName}</Text>
          <Text style={styles.username}>@{currentUser.username}</Text>
          
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{currentUser.eventsAttended}</Text>
              <Text style={styles.statLabel}>Events</Text>
            </View>
            <View style={[styles.statDivider]} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{currentUser.points}</Text>
              <Text style={styles.statLabel}>Points</Text>
            </View>
            <View style={[styles.statDivider]} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>12</Text>
              <Text style={styles.statLabel}>Rewards</Text>
            </View>
          </View>
          
          <View style={styles.badgesContainer}>
            <View style={styles.badge}>
              <Award size={16} color={Colors.light.text} />
              <Text style={styles.badgeText}>Top Explorer</Text>
            </View>
            {currentUser.isVerified && (
              <View style={[styles.badge, { backgroundColor: Colors.primary[500] }]}>
                <Star size={16} color={Colors.light.text} />
                <Text style={styles.badgeText}>Verified</Text>
              </View>
            )}
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Upcoming Events</Text>
          
          {userEvents.map((event) => (
            <TouchableOpacity key={event.id} style={styles.eventCard}>
              <Image 
                source={{ uri: event.coverImage || 'https://images.pexels.com/photos/2263436/pexels-photo-2263436.jpeg' }}
                style={styles.eventImage}
              />
              <View style={styles.eventInfo}>
                <Text style={styles.eventTitle} numberOfLines={2}>{event.title}</Text>
                <View style={styles.eventMeta}>
                  <MapPin size={14} color={Colors.gray[500]} />
                  <Text style={styles.eventMetaText} numberOfLines={1}>
                    {event.location.address}
                  </Text>
                </View>
                <View style={styles.eventMeta}>
                  <Calendar size={14} color={Colors.gray[500]} />
                  <Text style={styles.eventMetaText}>
                    {new Date(event.startTime).toLocaleDateString()}
                  </Text>
                </View>
                <View style={styles.eventMeta}>
                  <Clock size={14} color={Colors.gray[500]} />
                  <Text style={styles.eventMetaText}>
                    {new Date(event.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
          
          <TouchableOpacity style={styles.viewAllButton}>
            <Text style={styles.viewAllText}>View All Events</Text>
            <ChevronRight size={16} color={Colors.primary[500]} />
          </TouchableOpacity>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Rewards</Text>
          
          <View style={styles.rewardsCard}>
            <View style={styles.rewardPoints}>
              <Text style={styles.pointsValue}>{currentUser.points}</Text>
              <Text style={styles.pointsLabel}>Points</Text>
            </View>
            <View style={styles.rewardInfo}>
              <Text style={styles.rewardTitle}>You're a VIP!</Text>
              <Text style={styles.rewardDescription}>
                You've earned VIP status! Enjoy exclusive benefits at participating venues.
              </Text>
              <TouchableOpacity style={styles.redeemButton}>
                <Gift size={16} color={Colors.light.text} />
                <Text style={styles.redeemText}>View Rewards</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Settings</Text>
          
          <View style={styles.menuCard}>
            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuText}>Edit Profile</Text>
              <ChevronRight size={20} color={Colors.gray[400]} />
            </TouchableOpacity>
            
            <View style={styles.menuDivider} />
            
            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuText}>Notifications</Text>
              <ChevronRight size={20} color={Colors.gray[400]} />
            </TouchableOpacity>
            
            <View style={styles.menuDivider} />
            
            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuText}>Privacy</Text>
              <ChevronRight size={20} color={Colors.gray[400]} />
            </TouchableOpacity>
            
            <View style={styles.menuDivider} />
            
            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuText}>Help & Support</Text>
              <ChevronRight size={20} color={Colors.gray[400]} />
            </TouchableOpacity>
            
            <View style={styles.menuDivider} />
            
            <TouchableOpacity style={[styles.menuItem, styles.logoutItem]}>
              <LogOut size={20} color={Colors.error[500]} />
              <Text style={styles.logoutText}>Log Out</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  header: {
    position: 'relative',
    height: 150,
  },
  coverImage: {
    width: '100%',
    height: '100%',
    opacity: 0.7,
    backgroundColor: Colors.primary[500],
  },
  settingsButton: {
    position: 'absolute',
    top: Layout.spacing.md,
    right: Layout.spacing.md,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollView: {
    flex: 1,
    marginTop: -50,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: Layout.spacing.lg,
    paddingHorizontal: Layout.spacing.lg,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: Colors.light.background,
  },
  displayName: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    color: Colors.light.text,
    marginTop: Layout.spacing.sm,
  },
  username: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: Colors.gray[500],
    marginBottom: Layout.spacing.md,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    backgroundColor: Colors.light.card,
    borderRadius: Layout.borderRadius.lg,
    padding: Layout.spacing.md,
    marginBottom: Layout.spacing.md,
    ...Platform.select({
      web: {
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
      },
      default: {
        shadowColor: Colors.gray[900],
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 2,
      },
    }),
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: Colors.gray[200],
  },
  statValue: {
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
    color: Colors.light.text,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: Colors.gray[500],
  },
  badgesContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.secondary[500],
    paddingHorizontal: Layout.spacing.md,
    paddingVertical: Layout.spacing.xs,
    borderRadius: Layout.borderRadius.full,
    marginHorizontal: Layout.spacing.xs,
  },
  badgeText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: Colors.light.text,
    marginLeft: 4,
  },
  section: {
    paddingHorizontal: Layout.spacing.lg,
    marginBottom: Layout.spacing.xl,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: Colors.light.text,
    marginBottom: Layout.spacing.md,
  },
  eventCard: {
    flexDirection: 'row',
    backgroundColor: Colors.light.card,
    borderRadius: Layout.borderRadius.lg,
    marginBottom: Layout.spacing.md,
    overflow: 'hidden',
    ...Platform.select({
      web: {
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
      },
      default: {
        shadowColor: Colors.gray[900],
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 2,
      },
    }),
  },
  eventImage: {
    width: 80,
    height: 80,
  },
  eventInfo: {
    flex: 1,
    padding: Layout.spacing.md,
  },
  eventTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: Colors.light.text,
    marginBottom: Layout.spacing.xs,
  },
  eventMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  eventMetaText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: Colors.gray[500],
    marginLeft: 4,
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Layout.spacing.sm,
  },
  viewAllText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: Colors.primary[500],
    marginRight: 4,
  },
  rewardsCard: {
    flexDirection: 'row',
    backgroundColor: Colors.light.card,
    borderRadius: Layout.borderRadius.lg,
    overflow: 'hidden',
    ...Platform.select({
      web: {
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
      },
      default: {
        shadowColor: Colors.gray[900],
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 2,
      },
    }),
  },
  rewardPoints: {
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary[500],
    padding: Layout.spacing.md,
  },
  pointsValue: {
    fontSize: 22,
    fontFamily: 'Poppins-Bold',
    color: Colors.light.text,
  },
  pointsLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: Colors.light.text,
    opacity: 0.8,
  },
  rewardInfo: {
    flex: 1,
    padding: Layout.spacing.md,
  },
  rewardTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: Colors.light.text,
    marginBottom: 4,
  },
  rewardDescription: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: Colors.gray[600],
    marginBottom: Layout.spacing.sm,
  },
  redeemButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.secondary[500],
    paddingHorizontal: Layout.spacing.md,
    paddingVertical: Layout.spacing.xs,
    borderRadius: Layout.borderRadius.full,
    alignSelf: 'flex-start',
  },
  redeemText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: Colors.light.text,
    marginLeft: 4,
  },
  menuCard: {
    backgroundColor: Colors.light.card,
    borderRadius: Layout.borderRadius.lg,
    overflow: 'hidden',
    ...Platform.select({
      web: {
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
      },
      default: {
        shadowColor: Colors.gray[900],
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 2,
      },
    }),
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Layout.spacing.md,
  },
  menuText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: Colors.light.text,
  },
  menuDivider: {
    height: 1,
    backgroundColor: Colors.gray[200],
    marginHorizontal: Layout.spacing.md,
  },
  logoutItem: {
    justifyContent: 'flex-start',
  },
  logoutText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: Colors.error[500],
    marginLeft: Layout.spacing.sm,
  },
});