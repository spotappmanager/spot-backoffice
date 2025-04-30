import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { MapPin, Users, Clock, Heart } from 'lucide-react-native';
import { Event } from '@/types';
import { router } from 'expo-router';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';
import { formatDistanceToNow } from '@/utils/dateUtils';
import UserAvatar from './UserAvatar';

interface EventCardProps {
  event: Event;
  onPress?: () => void;
}

export default function EventCard({ event, onPress }: EventCardProps) {
  const navigateToEvent = () => {
    if (onPress) {
      onPress();
    } else {
      router.navigate(`/event/${event.id}`);
    }
  };

  const formatAttendees = (count: number) => {
    if (count > 1000) {
      return `${(count / 1000).toFixed(1)}k`;
    }
    return count.toString();
  };

  return (
    <TouchableOpacity 
      style={styles.container} 
      onPress={navigateToEvent}
      activeOpacity={0.9}
    >
      <View style={styles.imageContainer}>
        <Image 
          source={{ uri: event.coverImage || 'https://images.pexels.com/photos/2263436/pexels-photo-2263436.jpeg' }} 
          style={styles.image} 
        />
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryText}>{event.category}</Text>
        </View>
        {event.isLive && (
          <View style={styles.liveBadge}>
            <View style={styles.liveIndicator} />
            <Text style={styles.liveText}>LIVE</Text>
          </View>
        )}
      </View>
      
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={1}>{event.title}</Text>
        
        <View style={styles.metadata}>
          <View style={styles.metaItem}>
            <MapPin size={14} color={Colors.gray[500]} />
            <Text style={styles.metaText} numberOfLines={1}>
              {event.location.address || 'Location unavailable'}
            </Text>
          </View>
          
          <View style={styles.metaItem}>
            <Clock size={14} color={Colors.gray[500]} />
            <Text style={styles.metaText}>
              {formatDistanceToNow(event.startTime)}
            </Text>
          </View>
        </View>

        <View style={styles.footer}>
          <View style={styles.attendees}>
            <View style={styles.avatarStack}>
              {event.attendees.slice(0, 3).map((attendee, index) => (
                <View key={attendee.userId} style={[styles.avatarWrapper, { left: index * 16 }]}>
                  <UserAvatar uri={attendee.profileImage} size={24} />
                </View>
              ))}
            </View>
            <View style={styles.attendeeCount}>
              <Users size={14} color={Colors.gray[500]} />
              <Text style={styles.metaText}>
                {formatAttendees(event.attendees.length)}
              </Text>
            </View>
          </View>
          
          <View style={styles.likes}>
            <Heart size={14} color={Colors.gray[500]} />
            <Text style={styles.metaText}>{event.likes}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.light.card,
    borderRadius: Layout.borderRadius.lg,
    marginBottom: Layout.spacing.md,
    overflow: 'hidden',
    ...Platform.select({
      web: {
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
      },
      default: {
        elevation: 2,
        shadowColor: Colors.gray[900],
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
      },
    }),
  },
  imageContainer: {
    position: 'relative',
    height: 160,
  },
  image: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: Layout.borderRadius.lg,
    borderTopRightRadius: Layout.borderRadius.lg,
  },
  categoryBadge: {
    position: 'absolute',
    top: Layout.spacing.sm,
    left: Layout.spacing.sm,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingHorizontal: Layout.spacing.sm,
    paddingVertical: Layout.spacing.xs,
    borderRadius: Layout.borderRadius.full,
  },
  categoryText: {
    color: Colors.light.text,
    fontSize: 12,
    textTransform: 'capitalize',
  },
  liveBadge: {
    position: 'absolute',
    top: Layout.spacing.sm,
    right: Layout.spacing.sm,
    backgroundColor: Colors.error[500],
    paddingHorizontal: Layout.spacing.sm,
    paddingVertical: Layout.spacing.xs,
    borderRadius: Layout.borderRadius.full,
    flexDirection: 'row',
    alignItems: 'center',
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
    fontSize: 12,
    fontWeight: '600',
  },
  content: {
    padding: Layout.spacing.md,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: Layout.spacing.sm,
    color: Colors.light.text,
  },
  metadata: {
    marginBottom: Layout.spacing.sm,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Layout.spacing.xs,
  },
  metaText: {
    fontSize: 12,
    color: Colors.gray[500],
    marginLeft: 4,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: Layout.spacing.xs,
  },
  attendees: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarStack: {
    flexDirection: 'row',
    width: 50,
    height: 24,
    position: 'relative',
  },
  avatarWrapper: {
    position: 'absolute',
    borderWidth: 1,
    borderColor: Colors.light.card,
    borderRadius: 12,
  },
  attendeeCount: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 50, // Space for avatars
  },
  likes: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});