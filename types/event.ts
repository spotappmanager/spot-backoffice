export interface Location {
  latitude: number;
  longitude: number;
  address?: string;
}

export interface User {
  id: string;
  username: string;
  displayName: string;
  profileImage?: string;
  points: number;
  eventsAttended: number;
  isVerified: boolean;
  role: 'user' | 'business' | 'admin';
}

export interface EventMedia {
  id: string;
  url: string;
  type: 'image' | 'video';
  userId: string;
  timestamp: number;
}

export interface EventComment {
  id: string;
  text: string;
  userId: string;
  username: string;
  profileImage?: string;
  timestamp: number;
  likes: number;
}

export interface EventAttendee {
  userId: string;
  username: string;
  profileImage?: string;
  verifiedPresence: boolean;
  timestamp: number;
}

export type EventCategory = 
  | 'party' 
  | 'concert' 
  | 'club' 
  | 'bar' 
  | 'food' 
  | 'outdoor' 
  | 'culture' 
  | 'sport' 
  | 'meetup'
  | 'spontaneous';

export interface Event {
  id: string;
  title: string;
  description: string;
  location: Location;
  startTime: number;
  endTime?: number;
  coverImage?: string;
  category: EventCategory;
  organizer: {
    id: string;
    name: string;
    isVerified: boolean;
    profileImage?: string;
  };
  price?: {
    value: number;
    currency: string;
  };
  attendees: EventAttendee[];
  media: EventMedia[];
  comments: EventComment[];
  likes: number;
  isLive: boolean;
  isFeatured: boolean;
  tags: string[];
  createdAt: number;
  updatedAt: number;
}