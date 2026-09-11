export interface BookingFormData {
  name: string;
  phone: string;
  email?: string;
  location: string;
  detailedAddress?: string;
  serviceType: string;
  serviceMode: 'home' | 'courier';
  systemType?: 'Desktop PC' | 'Gaming Rig' | 'Workstation / Editing' | 'Laptop' | 'ITX / Mini PC';
  urgencyLevel?: 'Standard (24-48 Hours)' | 'Express Same-Day (Dhaka)' | 'Weekend Slot';
  courierPartner?: 'Sundarban Courier' | 'Steadfast' | 'RedX' | 'SA Paribahan' | 'Paperfly' | 'Other / Not decided yet';
  courierTrackingNumber?: string;
  gpuRemovedForCourier?: boolean;
  problemDescription: string;
  preferredDate: string;
  preferredTime: string;
}

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  eyebrow?: string;
  tagline: string;
  heading: string;
  copy: string;
  ctaText: string;
  features: string[];
  startingPrice?: string;
  badge?: string;
  beforeAfter?: {
    beforeImg: string;
    afterImg: string;
    beforeLabel: string;
    afterLabel: string;
    description: string;
  };
}

export interface BeforeAfterCardData {
  id: string;
  title: string;
  smallLabel: string;
  beforeText: string;
  afterText: string;
  beforeImg: string;
  afterImg: string;
  initialSlider: number;
}

export interface ReviewItem {
  id: string;
  quote: string;
  author: string;
  location: string;
  type: 'Home Service' | 'Courier' | 'Hardware Repair';
  rating: number;
  specs?: string;
}
