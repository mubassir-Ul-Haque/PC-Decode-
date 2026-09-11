import { BeforeAfterCardData, ReviewItem, ServiceItem } from './types';

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'deep-cleaning',
    number: 'SERVICE 01',
    title: 'Deep Cleaning',
    tagline: 'Dust Removal & Airflow Restoration',
    heading: 'Your PC has been collecting dust. Probably more than your bookshelf.',
    copy: 'Dust blocks airflow, pushes temperatures up and makes your cooling system work harder than it should. We clean the inside properly — fans, heatsinks and components — so your PC can breathe again.',
    ctaText: 'Book Cleaning',
    badge: 'Popular',
    startingPrice: 'From ৳1,500',
    features: [
      'Complete chassis teardown & anti-static dust extraction',
      'Fan blade & bearing ultrasonic/hand deep cleaning',
      'Heatsink fin de-clogging for peak CFM airflow',
      'Front mesh & dust filter restorative wash & dry'
    ],
    beforeAfter: {
      beforeImg: 'https://storage.googleapis.com/banani-generated-images/generated-images/fb644b81-c286-4178-9da3-609d86aae549.jpg',
      afterImg: 'https://storage.googleapis.com/banani-generated-images/generated-images/b6b9b53a-5fff-49d0-a30a-12e1da5683d3.jpg',
      beforeLabel: 'Dust everywhere.',
      afterLabel: 'Clean components. Better airflow.',
      description: 'From dusty to breathing again.'
    }
  },
  {
    id: 'thermal-paste',
    number: 'SERVICE 02',
    title: 'Thermal Paste Replacement',
    tagline: 'CPU & GPU Temperature Drop',
    heading: 'Old thermal paste isn\'t getting younger.',
    copy: 'Thermal paste dries out over time and can hurt heat transfer between your processor, GPU and cooler. We remove the old paste, apply fresh thermal compound and check the temperatures after the service.',
    ctaText: 'Fix My Thermals',
    badge: 'Crucial for Gaming',
    startingPrice: 'From ৳1,200',
    features: [
      'Old crusty thermal compound safely dissolved with 99% IPA',
      'Premium thermal compound (Noctua NT-H2 / Thermal Grizzly / Arctic MX-6)',
      'Sub-millimeter spreader application for zero air pockets',
      'Pre- & post-service 15-minute FurMark / Cinebench thermal logging'
    ],
    beforeAfter: {
      beforeImg: 'https://storage.googleapis.com/banani-generated-images/generated-images/b25aed3e-3c96-42d6-b148-a01ffa298986.jpg',
      afterImg: 'https://storage.googleapis.com/banani-generated-images/generated-images/1a71c9d4-8931-4eb6-847e-6d1f56e7e5cf.jpg',
      beforeLabel: 'Running hot (89°C+ throttling).',
      afterLabel: 'Improved thermal performance (62°C peak).',
      description: 'Less heat. Less stress.'
    }
  },
  {
    id: 'hardware-diagnostics',
    number: 'SERVICE 03',
    title: 'Hardware Diagnostics',
    tagline: 'Pinpoint Fault Detection',
    heading: 'Something\'s wrong. But what exactly?',
    copy: 'Slow performance doesn\'t always mean a bad CPU. Random shutdowns don\'t automatically mean your PSU is dead. We test the important components and trace the actual source of the problem. No guessing. No unnecessary replacements.',
    ctaText: 'Diagnose My PC',
    badge: 'Zero Guesswork',
    startingPrice: '৳500 (Adjusted if repaired)',
    features: [
      'PSU rail voltage stability & ripple testing under synthetic load',
      'RAM sector error scan (MemTest86 pro testing)',
      'SSD/NVMe health, bad blocks & SMART status diagnosis',
      'Motherboard PCIe, VRM MOSFETs & capacitor thermal inspection'
    ],
    beforeAfter: {
      beforeImg: 'https://storage.googleapis.com/banani-generated-images/generated-images/d1b04e90-2fbd-4f13-b5c8-0c6fd728fcaf.jpg',
      afterImg: 'https://storage.googleapis.com/banani-generated-images/generated-images/f28dbd89-8390-43f6-ba10-1da36839c345.jpg',
      beforeLabel: 'Random crashes, bluescreens.',
      afterLabel: 'Exact root cause identified & verified stable.',
      description: 'Diagnose first. Replace only when necessary.'
    }
  },
  {
    id: 'gpu-motherboard-repair',
    number: 'SERVICE 04',
    title: 'GPU & Motherboard Repair',
    tagline: 'Micro-Soldering & Component-Level Fixes',
    heading: 'Not every dead component belongs in the bin.',
    copy: 'GPU or motherboard acting up? We inspect the hardware, identify the fault and determine whether a proper repair is possible before you spend money on replacement parts.',
    ctaText: 'Request Diagnosis',
    badge: 'Component Level',
    startingPrice: 'Based on diagnosis',
    features: [
      'No-display, black screen & GPU artifacting repair',
      'Short circuit detection, blown capacitor & resistor replacement',
      'BIOS reprogramming / corrupt EEPROM chip flashing',
      'Video evidence provided before and after the repair'
    ],
    beforeAfter: {
      beforeImg: 'https://storage.googleapis.com/banani-generated-images/generated-images/3691e766-7e5b-4e4d-9081-63ee8b29065e.jpg',
      afterImg: 'https://storage.googleapis.com/banani-generated-images/generated-images/38dcc051-556f-400a-8d75-3b9ad5e8ca57.jpg',
      beforeLabel: 'Hardware fault / dead board.',
      afterLabel: 'Repaired and tested on test bench.',
      description: 'Problem found. Problem handled.'
    }
  }
];

export const RESULTS_DATA: BeforeAfterCardData[] = [
  {
    id: 'card-1',
    title: 'Deep Cleaning',
    smallLabel: 'From dusty to breathing again.',
    beforeText: 'Dust everywhere.',
    afterText: 'Clean components. Better airflow.',
    beforeImg: 'https://storage.googleapis.com/banani-generated-images/generated-images/fb644b81-c286-4178-9da3-609d86aae549.jpg',
    afterImg: 'https://storage.googleapis.com/banani-generated-images/generated-images/b6b9b53a-5fff-49d0-a30a-12e1da5683d3.jpg',
    initialSlider: 50
  },
  {
    id: 'card-2',
    title: 'Thermal Service',
    smallLabel: 'Less heat. Less stress.',
    beforeText: 'Running hot.',
    afterText: 'Improved thermal performance.',
    beforeImg: 'https://storage.googleapis.com/banani-generated-images/generated-images/b25aed3e-3c96-42d6-b148-a01ffa298986.jpg',
    afterImg: 'https://storage.googleapis.com/banani-generated-images/generated-images/1a71c9d4-8931-4eb6-847e-6d1f56e7e5cf.jpg',
    initialSlider: 50
  },
  {
    id: 'card-3',
    title: 'GPU / Motherboard Repair',
    smallLabel: 'Problem found. Problem handled.',
    beforeText: 'Hardware fault.',
    afterText: 'Repaired and tested.',
    beforeImg: 'https://storage.googleapis.com/banani-generated-images/generated-images/3691e766-7e5b-4e4d-9081-63ee8b29065e.jpg',
    afterImg: 'https://storage.googleapis.com/banani-generated-images/generated-images/38dcc051-556f-400a-8d75-3b9ad5e8ca57.jpg',
    initialSlider: 50
  }
];

export const REVIEWS_DATA: ReviewItem[] = [
  {
    id: 'rev-1',
    quote: 'Professional service and they actually explained what was wrong. Didn\'t feel like I was being pushed to replace unnecessary parts.',
    author: 'Verified Customer',
    location: 'Mirpur DOHS, Dhaka',
    type: 'Home Service',
    rating: 5,
    specs: 'Ryzen 5 5600X + RTX 3070'
  },
  {
    id: 'rev-2',
    quote: 'The technician came to my home, checked everything properly and completed the maintenance without making the whole thing complicated.',
    author: 'Verified Customer',
    location: 'Uttara Sector 11, Dhaka',
    type: 'Home Service',
    rating: 5,
    specs: 'Core i7 10700K + RTX 2060 Super'
  },
  {
    id: 'rev-3',
    quote: 'Good communication, careful handling and the PC was properly tested before the service was finished.',
    author: 'Verified Customer',
    location: 'Chattogram (Courier via RedX)',
    type: 'Courier',
    rating: 5,
    specs: 'B450 Aorus + RX 6700XT'
  },
  {
    id: 'rev-4',
    quote: 'Shop in Elephant Road told me "ভাই motherboard শেষ, নতুন নেন ৳14,000". PCDecode diagnosed a blown VRM capacitor, fixed it for a fraction of that and it is running smooth for 2 months now.',
    author: 'Verified Customer',
    location: 'Dhanmondi, Dhaka',
    type: 'Hardware Repair',
    rating: 5,
    specs: 'MSI B550 Tomahawk'
  },
  {
    id: 'rev-5',
    quote: 'Sent from Sylhet through Sundarban Courier. Was worried about glass panel and GPU sagging. They gave me exact packing instructions, sent photos when it arrived, repasted, stress tested and sent back nicely packed.',
    author: 'Verified Customer',
    location: 'Sylhet (Courier)',
    type: 'Courier',
    rating: 5,
    specs: 'Lian Li O11 Dynamic + RTX 3080'
  }
];
