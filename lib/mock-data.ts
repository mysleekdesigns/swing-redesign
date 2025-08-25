// Mock data for Swing dating website
export interface User {
  id: string;
  username: string;
  age: number;
  location: string;
  imageUrl: string;
  isOnline?: boolean;
  distance?: string;
  photosCount?: number;
  viewedTime?: string;
  isLiked?: boolean;
  bio?: string;
  interests?: string[];
}

export interface HotDate {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  imageUrl: string;
  attendeeCount: number;
  category: 'party' | 'outdoor' | 'cultural' | 'sports' | 'dining';
  price?: string;
}

export interface Convention {
  id: string;
  name: string;
  description: string;
  date: string;
  location: string;
  imageUrl: string;
  attendeeCount: number;
  category: "lifestyle" | "educational" | "social" | "wellness";
  price?: string;
  featured?: boolean;
}

export interface FeaturedCouple {
  id: string;
  names: string;
  age: string;
  location: string;
  imageUrl: string;
  joinDate: string;
  eventsOrganized: number;
  communityPoints: number;
  specialty: string;
  description: string;
  achievements: string[];
  currentEvent?: string;
}
// Sample convention data
export const featuredConvention: Convention = {
  id: "sc2025",
  name: "SwingerCon 2025: Connections & Freedom",
  description: "The premier lifestyle convention featuring workshops, social events, and networking opportunities for the swinging community. Join us for three days of education, connection, and celebration.",
  date: "2025-09-15",
  location: "Las Vegas Convention Center",
  imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop",
  attendeeCount: 1200,
  category: "lifestyle",
  price: "$299",
  featured: true
};

// Featured Swinger Couple of the Month
export const featuredCouple: FeaturedCouple = {
  id: "fc-august-2025",
  names: "Alex & Jamie",
  age: "32 & 29",
  location: "Beverly Hills, CA",
  imageUrl: "/images/couple1.jpg",
  joinDate: "January 2023",
  eventsOrganized: 15,
  communityPoints: 2850,
  specialty: "Newcomer Mentoring",
  description: "Alex and Jamie have been incredible community builders since joining Swing. They specialize in welcoming new couples and organizing inclusive events that help everyone feel comfortable and connected.",
  achievements: [
    "Top Event Organizer 2024",
    "Community Choice Award",
    "Newcomer Mentor Champion"
  ],
  currentEvent: "Sunset Beach Welcome Party - Aug 15th"
};// Mock users for "Who's On" section
export const whoIsOnUsers: User[] = [
  {
    id: '1',
    username: 'sxycpl',
    age: 32,
    location: 'Downtown LA',
    imageUrl: 'https://images.unsplash.com/photo-1608145640433-937abd82a4e1?w=400&h=600&fit=crop',
    isOnline: true,
    distance: '2 mi',
    photosCount: 12,
  },
  {
    id: '2',
    username: 'hotpair',
    age: 28,
    location: 'Hollywood',
    imageUrl: 'https://images.unsplash.com/photo-1522941471521-6ee21ec5cc26?w=400&h=600&fit=crop',
    isOnline: true,
    distance: '3 mi',
    photosCount: 15,
  },
  {
    id: '3',
    username: 'vixenlife',
    age: 26,
    location: 'Santa Monica',
    imageUrl: 'https://images.unsplash.com/photo-1652471949169-9c587e8898cd?w=400&h=600&fit=crop&crop=face',
    isOnline: true,
    distance: '5 mi',
    photosCount: 8,
  },
  {
    id: '4',
    username: 'playmates',
    age: 29,
    location: 'Venice Beach',
    imageUrl: 'https://images.unsplash.com/photo-1655211085738-35ff9f7e0cd2?w=400&h=600&fit=crop',
    isOnline: true,
    distance: '4 mi',
    photosCount: 18,
  },
  {
    id: '5',
    username: 'temptress',
    age: 24,
    location: 'Beverly Hills',
    imageUrl: 'https://images.unsplash.com/photo-1655249481446-25d575f1c054?w=400&h=600&fit=crop&crop=face',
    isOnline: true,
    distance: '6 mi',
    photosCount: 11,
  },
  {
    id: '6',
    username: 'wildones',
    age: 31,
    location: 'West Hollywood',
    imageUrl: 'https://images.unsplash.com/photo-1541385496969-a3edfa5a94ed?w=400&h=600&fit=crop',
    isOnline: true,
    distance: '3 mi',
    photosCount: 14,
  },
  {
    id: '7',
    username: 'dreamvibe',
    age: 27,
    location: 'Glendale',
    imageUrl: 'https://images.unsplash.com/photo-1655249493799-9cee4fe983bb?w=400&h=600&fit=crop&crop=face',
    isOnline: true,
    distance: '7 mi',
    photosCount: 16,
  },
  {
    id: '8',
    username: 'wildkitty',
    age: 23,
    location: 'Echo Park',
    imageUrl: 'https://images.unsplash.com/photo-1689600944138-da3b150d9cb8?w=400&h=600&fit=crop&crop=face',
    isOnline: true,
    distance: '4 mi',
    photosCount: 9,
  },
  {
    id: '33',
    username: 'cutecouple',
    age: 30,
    location: 'Los Feliz',
    imageUrl: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&h=600&fit=crop&crop=face',
    isOnline: true,
    distance: '5 mi',
    photosCount: 13,
  },
  {
    id: '34',
    username: 'hotdates',
    age: 26,
    location: 'Silver Lake',
    imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=600&fit=crop&crop=face',
    isOnline: true,
    distance: '6 mi',
    photosCount: 17,
  },
  {
    id: '35',
    username: 'swingtime',
    age: 29,
    location: 'Mid City',
    imageUrl: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400&h=600&fit=crop&crop=face',
    isOnline: true,
    distance: '4 mi',
    photosCount: 10,
  },
  {
    id: '36',
    username: 'funlovers',
    age: 32,
    location: 'Koreatown',
    imageUrl: 'https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=400&h=600&fit=crop&crop=face',
    isOnline: true,
    distance: '3 mi',
    photosCount: 19,
  },
];

// Mock users for "Who Viewed Me" section
export const whoViewedMeUsers: User[] = [
  {
    id: '9',
    username: 'funcouple',
    age: 30,
    location: 'Pasadena',
    imageUrl: 'https://images.unsplash.com/photo-1513279922550-250c2129b13a?w=400&h=600&fit=crop',
    distance: '8 mi',
    photosCount: 13,
    viewedTime: '2 hours ago',
  },
  {
    id: '10',
    username: 'sexysiren',
    age: 25,
    location: 'Long Beach',
    imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=600&fit=crop&crop=face',
    distance: '12 mi',
    photosCount: 10,
    viewedTime: '5 hours ago',
  },
  {
    id: '11',
    username: 'naughtytwo',
    age: 28,
    location: 'Culver City',
    imageUrl: 'https://images.unsplash.com/photo-1542351682-8453e2495f97?w=400&h=600&fit=crop',
    distance: '7 mi',
    photosCount: 17,
    viewedTime: '1 day ago',
  },
  {
    id: '12',
    username: 'playgirl',
    age: 27,
    location: 'Manhattan Beach',
    imageUrl: 'https://images.unsplash.com/photo-1655249481446-25d575f1c054?w=400&h=600&fit=crop&crop=face',
    distance: '15 mi',
    photosCount: 7,
    viewedTime: '2 days ago',
  },
  {
    id: '13',
    username: 'adventureduo',
    age: 33,
    location: 'Playa Vista',
    imageUrl: 'https://images.unsplash.com/photo-1522749541344-23b292febf25?w=400&h=600&fit=crop',
    distance: '10 mi',
    photosCount: 19,
    viewedTime: '3 days ago',
  },
  {
    id: '14',
    username: 'hotvixen',
    age: 22,
    location: 'Hermosa Beach',
    imageUrl: 'https://images.unsplash.com/photo-1652471949169-9c587e8898cd?w=400&h=600&fit=crop&crop=face',
    distance: '13 mi',
    photosCount: 6,
    viewedTime: '3 days ago',
  },
  {
    id: '21',
    username: 'sweetduo',
    age: 29,
    location: 'Torrance',
    imageUrl: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&h=600&fit=crop&crop=face',
    distance: '16 mi',
    photosCount: 14,
    viewedTime: '4 days ago',
  },
  {
    id: '22',
    username: 'funtimes',
    age: 26,
    location: 'Inglewood',
    imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=600&fit=crop&crop=face',
    distance: '11 mi',
    photosCount: 9,
    viewedTime: '1 week ago',
  },
  {
    id: '23',
    username: 'partypeople',
    age: 31,
    location: 'Westwood',
    imageUrl: 'https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=400&h=600&fit=crop',
    distance: '5 mi',
    photosCount: 12,
    viewedTime: '1 week ago',
  },
  {
    id: '24',
    username: 'wildside',
    age: 28,
    location: 'Malibu',
    imageUrl: 'https://images.unsplash.com/photo-1521310192545-4ac7951413f0?w=400&h=600&fit=crop&crop=face',
    distance: '18 mi',
    photosCount: 20,
    viewedTime: '2 weeks ago',
  },
  {
    id: '25',
    username: 'sexycouple',
    age: 33,
    location: 'Calabasas',
    imageUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=600&fit=crop&crop=face',
    distance: '22 mi',
    photosCount: 16,
    viewedTime: '2 weeks ago',
  },
  {
    id: '26',
    username: 'hotnight',
    age: 24,
    location: 'Woodland Hills',
    imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=600&fit=crop&crop=face',
    distance: '19 mi',
    photosCount: 7,
    viewedTime: '3 weeks ago',
  },
];

// Mock users for "Newest Matches" section
export const newestMatches: User[] = [
  {
    id: '15',
    username: 'hotwife4u',
    age: 29,
    location: 'Brentwood',
    imageUrl: 'https://images.unsplash.com/photo-1689600944138-da3b150d9cb8?w=400&h=600&fit=crop&crop=face',
    distance: '4 mi',
    photosCount: 21,
    isLiked: true,
  },
  {
    id: '16',
    username: 'badgirl',
    age: 24,
    location: 'Marina del Rey',
    imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=600&fit=crop&crop=face',
    distance: '6 mi',
    photosCount: 8,
    isLiked: true,
  },
  {
    id: '17',
    username: 'couplesexy',
    age: 26,
    location: 'Redondo Beach',
    imageUrl: 'https://images.unsplash.com/photo-1556229868-7b2d4b56b909?w=400&h=600&fit=crop',
    distance: '11 mi',
    photosCount: 16,
    isLiked: true,
  },
  {
    id: '18',
    username: 'lusciousbabe',
    age: 25,
    location: 'El Segundo',
    imageUrl: 'https://images.unsplash.com/photo-1655249493799-9cee4fe983bb?w=400&h=600&fit=crop&crop=face',
    distance: '9 mi',
    photosCount: 5,
    isLiked: true,
  },
  {
    id: '19',
    username: 'playtime2',
    age: 30,
    location: 'Burbank',
    imageUrl: 'https://plus.unsplash.com/premium_photo-1670588775988-ae6d15872e3c?w=400&h=600&fit=crop',
    distance: '14 mi',
    photosCount: 20,
    isLiked: true,
  },
  {
    id: '20',
    username: 'firecpl',
    age: 35,
    location: 'Studio City',
    imageUrl: 'https://plus.unsplash.com/premium_photo-1674438115826-11ea29d16e7e?w=400&h=600&fit=crop',
    distance: '12 mi',
    photosCount: 22,
    isLiked: true,
  },
  {
    id: '27',
    username: 'dreamgirl',
    age: 25,
    location: 'Thousand Oaks',
    imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=600&fit=crop&crop=face',
    distance: '25 mi',
    photosCount: 13,
    isLiked: true,
  },
  {
    id: '28',
    username: 'swinglife',
    age: 32,
    location: 'Pomona',
    imageUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=600&fit=crop&crop=face',
    distance: '28 mi',
    photosCount: 18,
    isLiked: true,
  },
  {
    id: '29',
    username: 'hotmama',
    age: 29,
    location: 'Encino',
    imageUrl: 'https://images.unsplash.com/photo-1488716820095-cbe80883c496?w=400&h=600&fit=crop&crop=face',
    distance: '17 mi',
    photosCount: 15,
    isLiked: true,
  },
  {
    id: '30',
    username: 'naughtynice',
    age: 27,
    location: 'Sherman Oaks',
    imageUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=600&fit=crop&crop=face',
    distance: '16 mi',
    photosCount: 11,
    isLiked: true,
  },
  {
    id: '31',
    username: 'playfulgirl',
    age: 23,
    location: 'Van Nuys',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop&crop=face',
    distance: '20 mi',
    photosCount: 8,
    isLiked: true,
  },
  {
    id: '32',
    username: 'adventurous',
    age: 34,
    location: 'Glendale',
    imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=600&fit=crop&crop=face',
    distance: '19 mi',
    photosCount: 24,
    isLiked: true,
  },
];

// Mock hot dates/events
export const hotDates: HotDate[] = [
  {
    id: '1',
    title: 'Sunset Rooftop Party',
    description: 'Join us for cocktails and city views as the sun sets over LA. Great music, amazing people\!',
    date: '2025-08-08',
    time: '7:00 PM',
    location: 'Downtown LA Rooftop',
    imageUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&h=400&fit=crop',
    attendeeCount: 24,
    category: 'party',
    price: '$25',
  },
  {
    id: '2',
    title: 'Beach Volleyball & BBQ',
    description: 'Active singles meet-up at the beach. Volleyball games followed by a group BBQ dinner.',
    date: '2025-08-10',
    time: '4:00 PM',
    location: 'Santa Monica Beach',
    imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&h=400&fit=crop',
    attendeeCount: 18,
    category: 'outdoor',
  },
  {
    id: '3',
    title: 'Wine Tasting Night',
    description: 'Discover new wines and meet fellow wine enthusiasts in an intimate setting.',
    date: '2025-08-12',
    time: '6:30 PM',
    location: 'Beverly Hills Wine Bar',
    imageUrl: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=600&h=400&fit=crop',
    attendeeCount: 16,
    category: 'dining',
    price: '$40',
  },
  {
    id: '4',
    title: 'Art Gallery Opening',
    description: 'Experience contemporary art and connect with creative souls at this exclusive gallery opening.',
    date: '2025-08-15',
    time: '7:00 PM',
    location: 'West Hollywood Gallery',
    imageUrl: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=600&h=400&fit=crop',
    attendeeCount: 12,
    category: 'cultural',
  },
  {
    id: '5',
    title: 'Karaoke Night',
    description: 'Sing your heart out and connect with music lovers in a fun, relaxed atmosphere.',
    date: '2025-08-16',
    time: '8:00 PM',
    location: 'Koreatown Karaoke Bar',
    imageUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&h=400&fit=crop',
    attendeeCount: 20,
    category: 'party',
    price: '$15',
  },
  {
    id: '6',
    title: 'Hiking Adventure',
    description: 'Early morning hike through scenic trails followed by brunch at a local café.',
    date: '2025-08-17',
    time: '7:00 AM',
    location: 'Runyon Canyon',
    imageUrl: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=600&h=400&fit=crop',
    attendeeCount: 15,
    category: 'outdoor',
  },
  {
    id: '7',
    title: 'Cooking Class',
    description: 'Learn to prepare gourmet dishes while meeting fellow food enthusiasts.',
    date: '2025-08-19',
    time: '6:00 PM',
    location: 'Culver City Cooking School',
    imageUrl: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop',
    attendeeCount: 14,
    category: 'dining',
    price: '$60',
  },
  {
    id: '8',
    title: 'Bowling & Drinks',
    description: 'Strike up conversations over strikes and spares at this retro bowling alley.',
    date: '2025-08-20',
    time: '7:30 PM',
    location: 'Highland Park Bowl',
    imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop',
    attendeeCount: 22,
    category: 'sports',
    price: '$30',
  },
];

// Helper function to get random users
export function getRandomUsers(users: User[], count: number): User[] {
  const shuffled = [...users].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

// Helper function to format time ago
export function formatTimeAgo(dateString: string): string {
  const now = new Date();
  const date = new Date(dateString);
  const diffInMs = now.getTime() - date.getTime();
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  const diffInDays = Math.floor(diffInHours / 24);
  
  if (diffInHours < 1) return 'Just now';
  if (diffInHours < 24) return `${diffInHours} hours ago`;
  if (diffInDays === 1) return 'Yesterday';
  return `${diffInDays} days ago`;
}

// Profile page interfaces and data
export interface ProfileStats {
  profileViews: number;
  matches: number;
  eventsAttended: number;
  profileCompleteness: number;
}

export interface ProfileInterest {
  id: string;
  name: string;
  category: 'lifestyle' | 'hobbies' | 'music' | 'travel' | 'food' | 'fitness' | 'arts';
  emoji: string;
}

export interface LifestylePreferences {
  watch: number; // 0-100 percentage
  soft: number; // 0-100 percentage
  full: number; // 0-100 percentage
  couples: number; // 0-100 percentage
  females: number; // 0-100 percentage
  males: number; // 0-100 percentage
  smoke: "Definitely" | "Maybe" | "Don't care" | "No Way";
  drink: "Definitely" | "Maybe" | "Don't care" | "No Way";
  age: string; // Age range like "30 - 45"
}

export interface Activity {
  id: string;
  type: 'match' | 'event' | 'profile_view' | 'message';
  title: string;
  description: string;
  timestamp: string;
  imageUrl?: string;
  user?: string;
}
// New profile section interfaces
export interface HotDateProfile {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  isAttending: boolean;
  imageUrl?: string;
}

export interface ProfileDescription {
  title: string;
  content: string;
  lastUpdated: string;
}

export interface Fantasy {
  id: string;
  title: string;
  description: string;
  category: "romantic" | "adventure" | "lifestyle" | "travel" | "other";
  private: boolean;
}

export interface AdditionalComment {
  id: string;
  title: string;
  content: string;
  timestamp: string;
  category: "personal" | "preferences" | "boundaries" | "other";
}

export interface UserProfile {
  id: string;
  username: string;
  displayName: string;
  age: number;
  location: string;
  imageUrl: string;
  bio: string;
  joinDate: string;
  lastSeen: string;
  verified: boolean;
  stats: ProfileStats;
  interests: ProfileInterest[];
  lifestylePreferences: LifestylePreferences;
  recentActivity: Activity[];
  additionalImages: string[];
  preferences: {
    ageRange: [number, number];
    distanceRadius: number;
    lookingFor: string[];
  };
  hotDate?: HotDateProfile;
  profileDescription?: ProfileDescription;
  fantasies: Fantasy[];
  additionalComments: AdditionalComment[];
}

// Mock current user profile data
export const currentUserProfile: UserProfile = {
  id: 'current-user',
  username: 'alexandra_m',
  displayName: 'Alexandra',
  age: 28,
  location: 'West Hollywood, CA',
  imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=faces',
  bio: 'Adventure seeker and yoga enthusiast. Love exploring new places, trying amazing food, and meeting genuine people. Looking for authentic connections and fun experiences. Always up for a spontaneous road trip or a cozy night in with good wine and great conversation.',
  joinDate: '2024-03-15',
  lastSeen: '2025-08-15T10:30:00Z',
  verified: true,
  stats: {
    profileViews: 2847,
    matches: 156,
    eventsAttended: 23,
    profileCompleteness: 92
  },
  interests: [
    { id: '1', name: 'Yoga', category: 'fitness', emoji: '🧘‍♀️' },
    { id: '2', name: 'Photography', category: 'arts', emoji: '📸' },
    { id: '3', name: 'Wine Tasting', category: 'food', emoji: '🍷' },
    { id: '4', name: 'Hiking', category: 'fitness', emoji: '🥾' },
    { id: '5', name: 'Jazz Music', category: 'music', emoji: '🎷' },
    { id: '6', name: 'Travel', category: 'travel', emoji: '✈️' },
    { id: '7', name: 'Cooking', category: 'food', emoji: '👩‍🍳' },
    { id: '8', name: 'Beach Volleyball', category: 'fitness', emoji: '🏐' }
  ],
  lifestylePreferences: {
    watch: 100,
    soft: 80,
    full: 60,
    couples: 20,
    females: 100,
    males: 0,
    smoke: "Don't care",
    drink: "Don't care",
    age: "3-45"
  },
  recentActivity: [
    {
      id: '1',
      type: 'match',
      title: 'New Match',
      description: 'You matched with @hotpair',
      timestamp: '2025-08-15T08:45:00Z',
      imageUrl: 'https://images.unsplash.com/photo-1522941471521-6ee21ec5cc26?w=400&h=600&fit=crop',
      user: 'hotpair'
    },
    {
      id: '2',
      type: 'event',
      title: 'Event Attended',
      description: 'Sunset Rooftop Party in Downtown LA',
      timestamp: '2025-08-14T19:00:00Z',
      imageUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&h=400&fit=crop'
    },
    {
      id: '3',
      type: 'profile_view',
      title: 'Profile Views',
      description: '12 new profile views today',
      timestamp: '2025-08-15T06:00:00Z'
    },
    {
      id: '4',
      type: 'message',
      title: 'New Message',
      description: 'From @vixenlife - "Hey! Love your hiking photos..."',
      timestamp: '2025-08-14T22:15:00Z',
      imageUrl: 'https://images.unsplash.com/photo-1652471949169-9c587e8898cd?w=400&h=600&fit=crop&crop=face',
      user: 'vixenlife'
    },
    {
      id: '5',
      type: 'match',
      title: 'New Match',
      description: 'You matched with @dreamvibe',
      timestamp: '2025-08-13T16:30:00Z',
      imageUrl: 'https://images.unsplash.com/photo-1655249493799-9cee4fe983bb?w=400&h=600&fit=crop&crop=face',
      user: 'dreamvibe'
    }
  ],
  additionalImages: [
    'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=600&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=600&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1488716820095-cbe80883c496?w=400&h=600&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=600&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=600&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&h=600&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=600&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=600&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=600&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&h=600&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1558898479-33c0057a5d12?w=400&h=600&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=400&h=600&fit=crop&crop=face'
  ],
  preferences: {
    ageRange: [25, 35],
    distanceRadius: 25,
    lookingFor: ['Long-term relationship', 'Fun dates', 'New experiences']
  },
  hotDate: {
    id: 'hd-1',
    title: 'Wine Tasting Night',
    description: 'Join me at this exclusive wine tasting event in Beverly Hills. Perfect opportunity to connect over great wine and conversation.',
    date: '2025-08-25',
    location: 'Beverly Hills Wine Bar',
    isAttending: true,
    imageUrl: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=600&h=400&fit=crop'
  },
  profileDescription: {
    title: 'About My Lifestyle',
    content: 'I believe life is meant to be lived to the fullest. I am passionate about authentic connections and meaningful experiences. I value honesty, communication, and respect above all. I enjoy exploring new adventures with like-minded people who share my values of openness and genuine connection. Whether it\'s a quiet evening conversation or an exciting adventure, I bring warmth, intelligence, and curiosity to every interaction.',
    lastUpdated: '2025-08-10'
  },
  fantasies: [
    {
      id: 'f-1',
      title: 'Romantic Getaway',
      description: 'A spontaneous weekend trip to a cozy mountain cabin with someone special. Fireplace, wine, and deep conversations under the stars.',
      category: 'romantic',
      private: false
    },
    {
      id: 'f-2',
      title: 'Adventure Travel',
      description: 'Exploring exotic destinations with adventurous companions. Hiking through tropical forests, discovering hidden beaches, and experiencing local cultures.',
      category: 'travel',
      private: false
    },
    {
      id: 'f-3',
      title: 'Cultural Experiences',
      description: 'Attending exclusive art galleries, wine tastings, and cultural events with sophisticated company who appreciates the finer things in life.',
      category: 'lifestyle',
      private: true
    }
  ],
  additionalComments: [
    {
      id: 'ac-1',
      title: 'My Approach to Connections',
      content: 'I believe in quality over quantity when it comes to connections. I prefer getting to know people on a deeper level rather than surface-level interactions. Communication and mutual respect are essential to me.',
      timestamp: '2025-08-12T14:30:00Z',
      category: 'personal'
    },
    {
      id: 'ac-2',
      title: 'What I\'m Looking For',
      content: 'I am seeking genuine people who value authenticity and are interested in exploring meaningful connections. I appreciate intelligence, humor, and emotional maturity in potential partners.',
      timestamp: '2025-08-05T16:45:00Z',
      category: 'preferences'
    }
  ]
};

// Helper function to get activity icon
export function getActivityIcon(type: Activity['type']): string {
  switch (type) {
    case 'match':
      return '💖';
    case 'event':
      return '🎉';
    case 'profile_view':
      return '👁️';
    case 'message':
      return '💬';
    default:
      return '📱';
  }
}

// Helper function to format activity timestamp
export function formatActivityTime(timestamp: string): string {
  const now = new Date();
  const activityTime = new Date(timestamp);
  const diffInMs = now.getTime() - activityTime.getTime();
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);
  
  if (diffInMinutes < 1) return 'Just now';
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
  if (diffInHours < 24) return `${diffInHours}h ago`;
  if (diffInDays === 1) return 'Yesterday';
  if (diffInDays < 7) return `${diffInDays}d ago`;
  return activityTime.toLocaleDateString();
}

// Message interfaces
export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  content: string;
  timestamp: string;
  read: boolean;
  type: 'text' | 'image' | 'voice' | 'system';
  imageUrl?: string;
  voiceDuration?: number;
}

export interface Conversation {
  id: string;
  participants: {
    id: string;
    username: string;
    displayName: string;
    avatar: string;
    isOnline: boolean;
    lastSeen?: string;
  }[];
  lastMessage: Message;
  unreadCount: number;
  isPinned: boolean;
  isMuted: boolean;
  createdAt: string;
}

// Mock conversations data
export const mockConversations: Conversation[] = [
  {
    id: 'conv-1',
    participants: [
      {
        id: '2',
        username: 'hotpair',
        displayName: 'Mike & Sarah',
        avatar: 'https://images.unsplash.com/photo-1522941471521-6ee21ec5cc26?w=400&h=600&fit=crop',
        isOnline: true
      }
    ],
    lastMessage: {
      id: 'msg-1',
      conversationId: 'conv-1',
      senderId: '2',
      senderName: 'Mike & Sarah',
      senderAvatar: 'https://images.unsplash.com/photo-1522941471521-6ee21ec5cc26?w=400&h=600&fit=crop',
      content: 'Hey! We loved your profile. Would love to chat more about your interests!',
      timestamp: '2025-08-25T14:30:00Z',
      read: false,
      type: 'text'
    },
    unreadCount: 3,
    isPinned: true,
    isMuted: false,
    createdAt: '2025-08-20T10:00:00Z'
  },
  {
    id: 'conv-2',
    participants: [
      {
        id: '3',
        username: 'vixenlife',
        displayName: 'Jessica',
        avatar: 'https://images.unsplash.com/photo-1652471949169-9c587e8898cd?w=400&h=600&fit=crop&crop=face',
        isOnline: false,
        lastSeen: '2025-08-25T12:00:00Z'
      }
    ],
    lastMessage: {
      id: 'msg-2',
      conversationId: 'conv-2',
      senderId: 'current-user',
      senderName: 'Alexandra',
      senderAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=faces',
      content: 'Sounds great! See you at the wine tasting event tomorrow!',
      timestamp: '2025-08-24T18:45:00Z',
      read: true,
      type: 'text'
    },
    unreadCount: 0,
    isPinned: false,
    isMuted: false,
    createdAt: '2025-08-15T14:20:00Z'
  },
  {
    id: 'conv-3',
    participants: [
      {
        id: '5',
        username: 'temptress',
        displayName: 'Sophia',
        avatar: 'https://images.unsplash.com/photo-1655249481446-25d575f1c054?w=400&h=600&fit=crop&crop=face',
        isOnline: true
      }
    ],
    lastMessage: {
      id: 'msg-3',
      conversationId: 'conv-3',
      senderId: '5',
      senderName: 'Sophia',
      senderAvatar: 'https://images.unsplash.com/photo-1655249481446-25d575f1c054?w=400&h=600&fit=crop&crop=face',
      content: 'Sent you some photos from last night!',
      timestamp: '2025-08-25T09:15:00Z',
      read: false,
      type: 'image',
      imageUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&h=400&fit=crop'
    },
    unreadCount: 1,
    isPinned: false,
    isMuted: false,
    createdAt: '2025-08-22T16:30:00Z'
  },
  {
    id: 'conv-4',
    participants: [
      {
        id: '7',
        username: 'dreamvibe',
        displayName: 'Emma & Jake',
        avatar: 'https://images.unsplash.com/photo-1655249493799-9cee4fe983bb?w=400&h=600&fit=crop&crop=face',
        isOnline: false,
        lastSeen: '2025-08-24T22:00:00Z'
      }
    ],
    lastMessage: {
      id: 'msg-4',
      conversationId: 'conv-4',
      senderId: '7',
      senderName: 'Emma & Jake',
      senderAvatar: 'https://images.unsplash.com/photo-1655249493799-9cee4fe983bb?w=400&h=600&fit=crop&crop=face',
      content: 'Thanks for the amazing evening! Looking forward to our next adventure 🎉',
      timestamp: '2025-08-23T23:30:00Z',
      read: true,
      type: 'text'
    },
    unreadCount: 0,
    isPinned: false,
    isMuted: false,
    createdAt: '2025-08-18T11:00:00Z'
  },
  {
    id: 'conv-5',
    participants: [
      {
        id: '9',
        username: 'funcouple',
        displayName: 'Alex & Sam',
        avatar: 'https://images.unsplash.com/photo-1513279922550-250c2129b13a?w=400&h=600&fit=crop',
        isOnline: true
      }
    ],
    lastMessage: {
      id: 'msg-5',
      conversationId: 'conv-5',
      senderId: '9',
      senderName: 'Alex & Sam',
      senderAvatar: 'https://images.unsplash.com/photo-1513279922550-250c2129b13a?w=400&h=600&fit=crop',
      content: 'Are you attending the rooftop party this weekend?',
      timestamp: '2025-08-25T11:00:00Z',
      read: false,
      type: 'text'
    },
    unreadCount: 2,
    isPinned: false,
    isMuted: false,
    createdAt: '2025-08-19T13:45:00Z'
  }
];

// Mock messages for a specific conversation
export const mockMessages: Message[] = [
  {
    id: 'msg-10',
    conversationId: 'conv-1',
    senderId: '2',
    senderName: 'Mike & Sarah',
    senderAvatar: 'https://images.unsplash.com/photo-1522941471521-6ee21ec5cc26?w=400&h=600&fit=crop',
    content: 'Hey Alexandra! We saw you were interested in wine tasting. We are too!',
    timestamp: '2025-08-25T10:00:00Z',
    read: true,
    type: 'text'
  },
  {
    id: 'msg-11',
    conversationId: 'conv-1',
    senderId: 'current-user',
    senderName: 'Alexandra',
    senderAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=faces',
    content: 'Hi Mike & Sarah! Yes, I love wine tasting! Do you have a favorite spot?',
    timestamp: '2025-08-25T10:15:00Z',
    read: true,
    type: 'text'
  },
  {
    id: 'msg-12',
    conversationId: 'conv-1',
    senderId: '2',
    senderName: 'Mike & Sarah',
    senderAvatar: 'https://images.unsplash.com/photo-1522941471521-6ee21ec5cc26?w=400&h=600&fit=crop',
    content: 'We recently discovered this amazing place in Beverly Hills. They have tastings every Friday!',
    timestamp: '2025-08-25T10:30:00Z',
    read: true,
    type: 'text'
  },
  {
    id: 'msg-13',
    conversationId: 'conv-1',
    senderId: '2',
    senderName: 'Mike & Sarah',
    senderAvatar: 'https://images.unsplash.com/photo-1522941471521-6ee21ec5cc26?w=400&h=600&fit=crop',
    content: 'Check out this photo from last week!',
    timestamp: '2025-08-25T10:32:00Z',
    read: true,
    type: 'image',
    imageUrl: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=600&h=400&fit=crop'
  },
  {
    id: 'msg-14',
    conversationId: 'conv-1',
    senderId: 'current-user',
    senderName: 'Alexandra',
    senderAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=faces',
    content: 'That looks amazing! I would love to join you sometime!',
    timestamp: '2025-08-25T11:00:00Z',
    read: true,
    type: 'text'
  },
  {
    id: 'msg-15',
    conversationId: 'conv-1',
    senderId: '2',
    senderName: 'Mike & Sarah',
    senderAvatar: 'https://images.unsplash.com/photo-1522941471521-6ee21ec5cc26?w=400&h=600&fit=crop',
    content: 'How about this Friday? We are planning to go around 7 PM',
    timestamp: '2025-08-25T14:00:00Z',
    read: false,
    type: 'text'
  },
  {
    id: 'msg-16',
    conversationId: 'conv-1',
    senderId: '2',
    senderName: 'Mike & Sarah',
    senderAvatar: 'https://images.unsplash.com/photo-1522941471521-6ee21ec5cc26?w=400&h=600&fit=crop',
    content: 'We could grab dinner before too if you are interested?',
    timestamp: '2025-08-25T14:15:00Z',
    read: false,
    type: 'text'
  },
  {
    id: 'msg-1',
    conversationId: 'conv-1',
    senderId: '2',
    senderName: 'Mike & Sarah',
    senderAvatar: 'https://images.unsplash.com/photo-1522941471521-6ee21ec5cc26?w=400&h=600&fit=crop',
    content: 'Hey! We loved your profile. Would love to chat more about your interests!',
    timestamp: '2025-08-25T14:30:00Z',
    read: false,
    type: 'text'
  }
];

// Helper function to format message timestamp
export function formatMessageTime(timestamp: string): string {
  const now = new Date();
  const messageTime = new Date(timestamp);
  const diffInMs = now.getTime() - messageTime.getTime();
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);
  
  // If today, show time
  if (diffInDays === 0) {
    return messageTime.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  }
  
  // If yesterday
  if (diffInDays === 1) {
    return 'Yesterday';
  }
  
  // If within a week, show day of week
  if (diffInDays < 7) {
    return messageTime.toLocaleDateString('en-US', { weekday: 'short' });
  }
  
  // Otherwise show date
  return messageTime.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric' 
  });
}

// Helper function to get online status text
export function getOnlineStatus(isOnline: boolean, lastSeen?: string): string {
  if (isOnline) return 'Online now';
  if (lastSeen) {
    return `Last seen ${formatMessageTime(lastSeen)}`;
  }
  return 'Offline';
}
