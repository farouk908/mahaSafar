/**
 * Types shared across the Maharashtra Adventure Tourism marketplace.
 */

export type TabType = 'explore' | 'bookings' | 'operator' | 'safety' | 'about';

export type ActivityCategory = 'trekking' | 'camping' | 'water_sports' | 'paragliding' | 'wildlife';

export interface ItineraryDay {
  day: number;
  title: string;
  activities: string[];
}

export interface Listing {
  id: string;
  title: string;
  category: ActivityCategory;
  destination: string;
  duration: string;
  difficulty: 'easy' | 'moderate' | 'challenging' | 'expert';
  price: number;
  image: string;
  description: string;
  itinerary: ItineraryDay[];
  inclusions: string[];
  exclusions: string[];
  gearRequired: string[];
  bestTime: string;
  distance: string;
  operatorId: string;
  maxGroupSize: number;
  availableSlots: number;
}

export interface Participant {
  name: string;
  age: number;
  gender: string;
}

export interface Booking {
  id: string;
  listingId: string;
  listingTitle: string;
  listingImage: string;
  operatorId: string;
  operatorName: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  bookingDate: string;
  createdAt: string;
  participantsCount: number;
  participants: Participant[];
  totalPrice: number;
  paymentStatus: 'pending' | 'paid';
  paymentId: string;
  bookingStatus: 'confirmed' | 'completed' | 'cancelled';
}

export interface Operator {
  id: string;
  companyName: string;
  contactPerson: string;
  phone: string;
  email: string;
  baseLocation: string;
  experience: string;
  licenseNumber: string;
  rating: number;
  reviewCount: number;
  verified: boolean;
}

export interface Destination {
  name: string;
  region: string;
  image: string;
  description: string;
  popularFor: string[];
}
