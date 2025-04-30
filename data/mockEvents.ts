import { Event, EventCategory } from '@/types';

// Generate a random date within the next week
const getRandomFutureDate = (hoursAhead = 24 * 7) => {
  const now = Date.now();
  const randomHours = Math.floor(Math.random() * hoursAhead);
  return now + randomHours * 60 * 60 * 1000;
};

// Generate random location near the city center (example coordinates)
const getRandomLocation = (baseLat = 40.7128, baseLng = -74.0060) => {
  const latVariance = (Math.random() - 0.5) * 0.1;
  const lngVariance = (Math.random() - 0.5) * 0.1;
  return {
    latitude: baseLat + latVariance,
    longitude: baseLng + lngVariance,
  };
};

// Generate random number of attendees
const generateAttendees = (count: number) => {
  const attendees = [];
  for (let i = 0; i < count; i++) {
    attendees.push({
      userId: `user-${i}`,
      username: `user${i}`,
      profileImage: i % 3 === 0 ? `https://i.pravatar.cc/150?img=${i + 10}` : undefined,
      verifiedPresence: Math.random() > 0.3,
      timestamp: Date.now() - Math.floor(Math.random() * 60 * 60 * 1000),
    });
  }
  return attendees;
};

const eventCategories: EventCategory[] = [
  'party',
  'concert',
  'club',
  'bar',
  'food',
  'outdoor',
  'culture',
  'sport',
  'meetup',
  'spontaneous',
];

// Generate events
export const mockEvents: Event[] = Array(20)
  .fill(null)
  .map((_, index) => {
    const startTime = getRandomFutureDate();
    const location = getRandomLocation();
    const attendeeCount = Math.floor(Math.random() * 300) + 10;
    const category = eventCategories[Math.floor(Math.random() * eventCategories.length)];
    const isLive = Math.random() > 0.7;
    
    return {
      id: `event-${index}`,
      title: `${category.charAt(0).toUpperCase() + category.slice(1)} Event ${index + 1}`,
      description: `This is a ${category} event happening soon. Join us for an amazing time!`,
      location: {
        ...location,
        address: `${Math.floor(Math.random() * 999) + 1} Broadway, New York, NY`,
      },
      startTime,
      endTime: startTime + 3 * 60 * 60 * 1000, // 3 hours event
      coverImage: `https://images.pexels.com/photos/${1000000 + index * 10}/pexels-photo-${1000000 + index * 10}.jpeg`,
      category,
      organizer: {
        id: `organizer-${index % 5}`,
        name: `EventOrg ${index % 5}`,
        isVerified: index % 3 === 0,
        profileImage: index % 4 === 0 ? `https://i.pravatar.cc/150?img=${index % 10}` : undefined,
      },
      price: Math.random() > 0.3 ? {
        value: Math.floor(Math.random() * 50) + 10,
        currency: 'USD',
      } : undefined,
      attendees: generateAttendees(attendeeCount),
      media: Array(Math.floor(Math.random() * 5) + 1)
        .fill(null)
        .map((_, mediaIndex) => ({
          id: `media-${index}-${mediaIndex}`,
          url: `https://images.pexels.com/photos/${2000000 + index * 10 + mediaIndex}/pexels-photo-${2000000 + index * 10 + mediaIndex}.jpeg`,
          type: Math.random() > 0.2 ? 'image' : 'video',
          userId: `user-${mediaIndex}`,
          timestamp: Date.now() - Math.floor(Math.random() * 24 * 60 * 60 * 1000),
        })),
      comments: Array(Math.floor(Math.random() * 10) + 1)
        .fill(null)
        .map((_, commentIndex) => ({
          id: `comment-${index}-${commentIndex}`,
          text: `This event looks amazing! Can't wait to attend.`,
          userId: `user-${commentIndex}`,
          username: `user${commentIndex}`,
          profileImage: commentIndex % 2 === 0 ? `https://i.pravatar.cc/150?img=${commentIndex + 20}` : undefined,
          timestamp: Date.now() - Math.floor(Math.random() * 12 * 60 * 60 * 1000),
          likes: Math.floor(Math.random() * 50),
        })),
      likes: Math.floor(Math.random() * 500),
      isLive,
      isFeatured: index % 5 === 0,
      tags: ['fun', 'nightlife', category, isLive ? 'live' : 'upcoming'],
      createdAt: Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000),
      updatedAt: Date.now() - Math.floor(Math.random() * 24 * 60 * 60 * 1000),
    };
  });

export default mockEvents;