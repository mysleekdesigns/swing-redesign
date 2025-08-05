// Type definitions for Swing dating website

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
  // New couple-specific fields
  isCouple?: boolean;
  partnerName?: string;
  partnerAge?: number;
  partnerImageUrl?: string;
  relationshipType?: 'single' | 'couple' | 'throuple';
  lookingFor?: 'singles' | 'couples' | 'both';
  verified?: boolean;
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
  isAdultOnly?: boolean;
  couplesFriendly?: boolean;
}

export interface CoupleProfile extends User {
  isCouple: true;
  partnerName: string;
  partnerAge: number;
  partnerImageUrl: string;
  relationshipType: 'couple' | 'throuple';
  lookingFor: 'singles' | 'couples' | 'both';
  verified: boolean;
}

export interface SingleProfile extends User {
  isCouple: false;
  relationshipType: 'single';
  lookingFor: 'singles' | 'couples' | 'both';
}

export type ProfileType = CoupleProfile | SingleProfile;

// Helper type guards
export function isCouple(user: User): user is CoupleProfile {
  return user.isCouple === true;
}

export function isSingle(user: User): user is SingleProfile {
  return user.isCouple === false || user.isCouple === undefined;
}