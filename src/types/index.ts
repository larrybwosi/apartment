import { SanityImageAssetDocument } from "next-sanity";

export interface Court {
  _id: string;
  name: string;
}
// types.ts
export interface Court {
  _id: string;
  _type: "court";
  name: string;
  slug: { current: string };
  description?: string;
  mainImage: SanityImageAssetDocument;
  images?: {
    asset: SanityImageAssetDocument;
    alt?: string;
    caption?: string;
  }[];
  yearBuilt?: number;
  totalFloors: number;
  totalApartments: number;
  location: {
    lat: number;
    lng: number;
  };
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  buildingAmenities?: string[];
  management?: {
    companyName?: string;
    contactPerson?: string;
    phone?: string;
    email?: string;
    officeHours?: string;
  };
  availableApartments?: number;
}

export interface Apartment {
  _id: string;
  _type: "apartment";
  title: string;
  slug: { current: string };
  court: Court;
  status: "available" | "rented" | "maintenance" | "reserved";
  category?: Category;
  unit: {
    floorNumber: number;
    unitNumber: string;
    wing?: string;
  };
  mainImage: SanityImageAssetDocument;
  images?: {
    asset: SanityImageAssetDocument;
    alt?: string;
    caption?: string;
  }[];
  floorPlan?: SanityImageAssetDocument;
  virtualTourUrl?: string;
  specifications: {
    squareFootage: number;
    bedrooms: number;
    bathrooms: number;
    ceilingHeight?: number;
    exposure?: "North" | "South" | "East" | "West";
  };
  rental: {
    price: number;
    deposit?: number;
    availableDate: string;
    minimumLeaseTerm?: number;
    utilities?: string[];
  };
  amenities?: string[];
  description?: string;
  features?: string[];
  policies: {
    petsAllowed?: boolean;
    petPolicy?: string;
    smokingAllowed?: boolean;
    parkingSpaces?: number;
  };
  location?: {
    _type: "geopoint";
    lat: number;
    lng: number;
    alt?: number;
  };
  nearbyAttractions?: Attraction[];
  featured?: boolean;
  rating?: number;
}

export interface Category {
  _id: string;
  _type: "category";
  name: string;
  slug: { current: string };
  description?: string;
  icon?: SanityImageAssetDocument;
  coverImage?: SanityImageAssetDocument;
  type: "standard" | "creative" | "special";
  selectOptions?: string[];
  filters?: Array<{
    filterName: string;
    filterValue: string;
  }>;
  metadata?: {
    keywords?: string[];
    popularity?: number;
  };
}

export interface Attraction {
  _id: string;
  _type: "attraction";
  name: string;
  image?: SanityImageAssetDocument;
  description?: string;
}

export interface Staff {
  _id: string;
  _type: "staff";
  name: string;
  role: string;
  email: string;
  phone: string;
  image: SanityImageAssetDocument;
}

export type BookingPlatform = "Booking.com" | "Airbnb.com" | "Agoda.com" | "Hotels.com"

export interface Booking {
  id: string
  guestName: string
  roomNumber: string
  checkIn: Date
  checkOut: Date
  platform: BookingPlatform
  status: "checked-in" | "checked-out" | "upcoming"
  avatar?: string
}

export interface Room {
  id: string
  number: string
  type: string
  beds: number
  status: "available" | "occupied" | "not-ready"
  currentBooking?: Booking
}

export interface DailyOccupancy {
  date: string
  available: number
  occupied: number
  notReady: number
}

export interface RevenueByPlatform {
  platform: BookingPlatform
  amount: number
  percentage: number
}

