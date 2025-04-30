import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView,
  Image,
  FlatList
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TrendingUp, ChartBar as BarChart, Users, Calendar, Settings, Plus, ArrowRight, CircleDollarSign, Clock } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';
import { StatusBar } from 'expo-status-bar';
import { mockEvents } from '@/data';

export default function BusinessScreen() {
  // Filter to just a few events for the business dashboard
  const businessEvents = mockEvents.slice(0, 3);
  
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar style="dark" />
      
      <View style={styles.header}>
        <View>
          <Text style={styles.welcomeText}>Welcome back,</Text>
          <Text style={styles.businessName}>Night Owl Promotions</Text>
        </View>
        <TouchableOpacity style={styles.settingsButton}>
          <Settings size={24} color={Colors.gray[800]} />
        </TouchableOpacity>
      </View>
      
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <View style={styles.statIconContainer}>
              <CircleDollarSign size={20} color={Colors.success[500]} />
            </View>
            <Text style={styles.statValue}>$1,250</Text>
            <Text style={styles.statLabel}>Revenue</Text>
          </View>
          
          <View style={styles.statCard}>
            <View style={styles.statIconContainer}>
              <Users size={20} color={Colors.primary[500]} />
            </View>
            <Text style={styles.statValue}>348</Text>
            <Text style={styles.statLabel}>Attendees</Text>
          </View>
          
          <View style={styles.statCard}>
            <View style={styles.statIconContainer}>
              <Calendar size={20} color={Colors.secondary[500]} />
            </View>
            <Text style={styles.statValue}>5</Text>
            <Text style={styles.statLabel}>Events</Text>
          </View>
        </View>
        
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Revenue Overview</Text>
            <TouchableOpacity>
              <BarChart size={20} color={Colors.primary[500]} />
            </TouchableOpacity>
          </View>
          
          <View style={styles.graphPlaceholder}>
            <Text style={styles.graphText}>Revenue Chart Placeholder</Text>
            <Text style={styles.graphSubtext}>Weekly revenue trending up by 15%</Text>
          </View>
        </View>
        
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Your Events</Text>
            <TouchableOpacity style={styles.viewAllButton}>
              <Text style={styles.viewAllText}>View All</Text>
              <ArrowRight size={16} color={Colors.primary[500]} />
            </TouchableOpacity>
          </View>
          
          <FlatList
            data={businessEvents}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.eventCard} activeOpacity={0.9}>
                <Image 
                  source={{ uri: item.coverImage || 'https://images.pexels.com/photos/2263436/pexels-photo-2263436.jpeg' }}
                  style={styles.eventImage}
                />
                <View style={styles.eventInfo}>
                  <Text style={styles.eventTitle} numberOfLines={1}>{item.title}</Text>
                  <View style={styles.eventMeta}>
                    <Clock size={14} color={Colors.gray[500]} />
                    <Text style={styles.eventDate}>
                      {new Date(item.startTime).toLocaleDateString()}
                    </Text>
                  </View>
                  <View style={styles.eventStats}>
                    <View style={styles.statBadge}>
                      <Users size={12} color={Colors.primary[500]} />
                      <Text style={styles.statText}>{item.attendees.length}</Text>
                    </View>
                    {item.price && (
                      <View style={styles.statBadge}>
                        <CircleDollarSign size={12} color={Colors.success[500]} />
                        <Text style={styles.statText}>
                          ${item.price.value * item.attendees.length}
                        </Text>
                      </View>
                    )}
                  </View>
                </View>
              </TouchableOpacity>
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.eventsList}
          />
        </View>
        
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Quick Actions</Text>
          </View>
          
          <View style={styles.actionsGrid}>
            <TouchableOpacity style={styles.actionCard}>
              <View style={[styles.actionIcon, { backgroundColor: Colors.primary[50] }]}>
                <Plus size={24} color={Colors.primary[500]} />
              </View>
              <Text style={styles.actionText}>New Event</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionCard}>
              <View style={[styles.actionIcon, { backgroundColor: Colors.secondary[50] }]}>
                <TrendingUp size={24} color={Colors.secondary[500]} />
              </View>
              <Text style={styles.actionText}>Promote</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionCard}>
              <View style={[styles.actionIcon, { backgroundColor: Colors.success[50] }]}>
                <CircleDollarSign size={24} color={Colors.success[500]} />
              </View>
              <Text style={styles.actionText}>Finance</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionCard}>
              <View style={[styles.actionIcon, { backgroundColor: Colors.warning[50] }]}>
                <BarChart size={24} color={Colors.warning[500]} />
              </View>
              <Text style={styles.actionText}>Reports</Text>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Layout.spacing.lg,
    paddingVertical: Layout.spacing.md,
  },
  welcomeText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: Colors.gray[500],
  },
  businessName: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    color: Colors.light.text,
  },
  settingsButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.light.card,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollView: {
    flex: 1,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: Layout.spacing.lg,
    marginBottom: Layout.spacing.lg,
  },
  statCard: {
    width: '31%',
    backgroundColor: Colors.light.card,
    borderRadius: Layout.borderRadius.md,
    padding: Layout.spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.gray[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  statIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.gray[50],
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Layout.spacing.xs,
  },
  statValue: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: Colors.light.text,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: Colors.gray[500],
  },
  section: {
    marginBottom: Layout.spacing.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Layout.spacing.lg,
    marginBottom: Layout.spacing.md,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: Colors.light.text,
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewAllText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: Colors.primary[500],
    marginRight: Layout.spacing.xs,
  },
  graphPlaceholder: {
    height: 180,
    backgroundColor: Colors.light.card,
    marginHorizontal: Layout.spacing.lg,
    borderRadius: Layout.borderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.gray[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  graphText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: Colors.gray[500],
  },
  graphSubtext: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: Colors.gray[400],
    marginTop: Layout.spacing.xs,
  },
  eventsList: {
    paddingHorizontal: Layout.spacing.lg,
    paddingRight: Layout.spacing.md,
  },
  eventCard: {
    width: 280,
    backgroundColor: Colors.light.card,
    borderRadius: Layout.borderRadius.lg,
    marginRight: Layout.spacing.md,
    overflow: 'hidden',
    shadowColor: Colors.gray[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  eventImage: {
    width: '100%',
    height: 120,
  },
  eventInfo: {
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
    marginBottom: Layout.spacing.sm,
  },
  eventDate: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: Colors.gray[500],
    marginLeft: Layout.spacing.xs,
  },
  eventStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.gray[100],
    paddingHorizontal: Layout.spacing.sm,
    paddingVertical: Layout.spacing.xs,
    borderRadius: Layout.borderRadius.full,
    marginRight: Layout.spacing.sm,
  },
  statText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: Colors.gray[700],
    marginLeft: 4,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: Layout.spacing.lg,
  },
  actionCard: {
    width: '48%',
    backgroundColor: Colors.light.card,
    borderRadius: Layout.borderRadius.lg,
    padding: Layout.spacing.md,
    marginBottom: Layout.spacing.md,
    alignItems: 'center',
    shadowColor: Colors.gray[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Layout.spacing.sm,
  },
  actionText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: Colors.light.text,
  },
});