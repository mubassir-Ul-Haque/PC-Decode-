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
  labName: 'PCDecode Central Diagnostics Lab & Intake Hub',
  recipientName: 'PCDecode Technical Intake Desk (Attn: Diagnostic Unit)',
  phone: '+880 1700-112233',
  alternativePhone: '+880 1700-000000',
  addressLine1: 'House #48 (Level 3, Apt 3B), Road #11, Block D',
  addressLine2: 'Banani',
  city: 'Dhaka',
  postalCode: '1213',
  landmark: 'Opposite Banani Road 11 Footbridge, 2 mins from Star Kabab',
  operatingHours: 'Saturday to Thursday: 10:00 AM - 8:30 PM (Friday Intake by prior appointment)',
  supportedCouriers: [
    {
      name: 'Sundarban Courier',
      branchAdvice: 'Select Banani Branch, Dhaka (Fastest 24-hr parcel delivery)',
      status: 'Recommended'
    },
    {
      name: 'Steadfast Courier',
      branchAdvice: 'Direct doorstep delivery to Banani Lab',
      status: 'Recommended'
    },
    {
      name: 'RedX Logistics',
      branchAdvice: 'Banani Hub delivery',
      status: 'Supported'
    },
    {
      name: 'SA Paribahan',
      branchAdvice: 'Mohakhali / Kakoli Branch, Dhaka',
      status: 'Supported'
    },
    {
      name: 'Paperfly / Pathao Parcel',
      branchAdvice: 'Banani Doorstep Hub delivery',
      status: 'Supported'
    }
  ],
  packagingInstructions: [
    'Remove heavy dual/triple-fan GPUs and box them separately, or brace them securely with high-density foam.',
    'Pad tempered glass side panels with at least 3-4 layers of bubble wrap.',
    'Clearly write our Banani Hub address and your Ticket ID on the parcel box.',
    'Keep your courier booking slip receipt safe and take a photo to send us on WhatsApp.'
  ]
};

export const formatHubAddress = () => {
  return `${DUMMY_COURIER_HUB.labName}\n${DUMMY_COURIER_HUB.recipientName}\nPhone: ${DUMMY_COURIER_HUB.phone} / ${DUMMY_COURIER_HUB.alternativePhone}\nAddress: ${DUMMY_COURIER_HUB.addressLine1}, ${DUMMY_COURIER_HUB.addressLine2}, ${DUMMY_COURIER_HUB.city}-${DUMMY_COURIER_HUB.postalCode}, Bangladesh\nLandmark: ${DUMMY_COURIER_HUB.landmark}`;
};
