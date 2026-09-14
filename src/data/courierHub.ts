export interface CourierHubDetails {
  labName: string;
  recipientName: string;
  phone: string;
  alternativePhone: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  postalCode: string;
  landmark: string;
  operatingHours: string;
  supportedCouriers: {
    name: string;
    branchAdvice: string;
    status: 'Recommended' | 'Supported';
  }[];
  packagingInstructions: string[];
}

export const DUMMY_COURIER_HUB: CourierHubDetails = {
  labName: 'PCDecode Service Lab (Demo Hub)',
  recipientName: 'Courier In-charge / Diagnostic Unit',
  phone: '+880 1700-000000',
  alternativePhone: '+880 1800-000000',
  addressLine1: 'House 12, Road 4, Sector 3',
  addressLine2: 'Uttara',
  city: 'Dhaka',
  postalCode: '1230',
  landmark: 'Near Friends Club Field, Sector 3, Uttara',
  operatingHours: 'Saturday to Thursday: 10:00 AM - 8:00 PM (Courier intake processed daily)',
  supportedCouriers: [
    {
      name: 'Sundarban Courier',
      branchAdvice: 'Select Uttara Sector 3 Branch, Dhaka (Fastest parcel intake)',
      status: 'Recommended'
    },
    {
      name: 'SA Paribahan',
      branchAdvice: 'Airport / Uttara Branch, Dhaka',
      status: 'Recommended'
    },
    {
      name: 'Steadfast Courier',
      branchAdvice: 'Direct doorstep delivery to Uttara Service Lab',
      status: 'Recommended'
    },
    {
      name: 'Pathao Parcel',
      branchAdvice: 'Direct courier delivery to Uttara Lab',
      status: 'Supported'
    },
    {
      name: 'RedX Logistics',
      branchAdvice: 'Uttara Hub delivery',
      status: 'Supported'
    },
    {
      name: 'eCourier',
      branchAdvice: 'Uttara Hub delivery',
      status: 'Supported'
    }
  ],
  packagingInstructions: [
    'Remove GPU or pack GPU separately to prevent PCIe slot snapping in transit.',
    'Remove heavy dual-tower air coolers if shipping the full PC.',
    'Use bubble wrap generously (minimum 3-4 layers around chassis or parts).',
    'Fill empty case space with antistatic foam or bubble wrap so components cannot rattle.',
    'Double-box if possible with internal cardboard bracing.',
    'We confirm receipt as soon as the package arrives and WhatsApp you immediately.',
    'Detailed unboxing video recorded on camera for mutual security.'
  ]
};

export const formatHubAddress = () => {
  return `${DUMMY_COURIER_HUB.labName}\nAttn: ${DUMMY_COURIER_HUB.recipientName}\nPhone: ${DUMMY_COURIER_HUB.phone}\nAddress: ${DUMMY_COURIER_HUB.addressLine1}, ${DUMMY_COURIER_HUB.addressLine2}, ${DUMMY_COURIER_HUB.city}-${DUMMY_COURIER_HUB.postalCode}, Bangladesh\nLandmark: ${DUMMY_COURIER_HUB.landmark}`;
};
