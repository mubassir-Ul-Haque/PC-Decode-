import { BeforeAfterCardData, BeforeAfterCase, ReviewItem, ServiceItem } from './types';

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'deep-cleaning',
    number: '01',
    title: 'Deep Cleaning',
    eyebrow: 'Acoustics & Airflow',
    tagline: 'Dust Removal & Airflow Restoration',
    heading: 'Your PC has been collecting dust. We let it breathe again.',
    copy: 'Dust blocks heatsink fins, degrades fan bearings, and traps radiant heat. We perform an ESD-safe chassis teardown, ultrasonic fan cleaning, and fin de-clogging to restore factory airflow channels.',
    ctaText: 'Book Deep Cleaning',
    badge: 'Essential Maintenance',
    startingPrice: 'From ৳1,500',
    turnaround: '2-3 Hours / Same-Day',
    image: 'https://storage.googleapis.com/banani-generated-images/generated-images/b6b9b53a-5fff-49d0-a30a-12e1da5683d3.jpg',
    features: [
      'Chassis teardown & anti-static dust extraction',
      'Fan blade & bearing ultrasonic wash + re-lubrication',
      'Heatsink fin de-clogging for peak CFM airflow',
      'Washable nylon filter restoration & cable rerouting'
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
    id: 'thermal-maintenance',
    number: '02',
    title: 'Thermal Maintenance',
    eyebrow: 'Temperature Drop',
    tagline: 'CPU & GPU Compound Replacement',
    heading: 'Dried thermal paste throttles clock speeds. We restore heat transfer.',
    copy: 'Factory compound hardens within 18–24 months, forming micro air gaps that spike temperatures over 85°C. We dissolve old paste with 99% laboratory IPA and apply enthusiast compound with calibrated torque.',
    ctaText: 'Restore Thermals',
    badge: 'Popular for Gaming',
    startingPrice: 'From ৳1,200',
    turnaround: '1-2 Hours',
    image: 'https://storage.googleapis.com/banani-generated-images/generated-images/1a71c9d4-8931-4eb6-847e-6d1f56e7e5cf.jpg',
    features: [
      'Old crusty thermal compound safely dissolved with 99% IPA',
      'Enthusiast compound (Noctua NT-H2 / Thermal Grizzly Kryonaut)',
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
    number: '03',
    title: 'Hardware Diagnostics',
    eyebrow: 'Pinpoint Analysis',
    tagline: 'Zero-Guesswork Fault Detection',
    heading: 'Random restarts? Black screens? We find what is actually broken.',
    copy: 'Turning on the monitor is not proof of stability. We probe PSU voltage ripple, test RAM blocks under MemTest86, verify SMART NAND health, and inspect PCIe lanes with precision lab multimeters.',
    ctaText: 'Diagnose My PC',
    badge: 'Zero Guesswork',
    startingPrice: '৳500 (Adjusted if repaired)',
    turnaround: 'Same-Day / 24 Hours',
    image: 'https://storage.googleapis.com/banani-generated-images/generated-images/f28dbd89-8390-43f6-ba10-1da36839c345.jpg',
    features: [
      'PSU 12V/5V/3.3V voltage rail stability & ripple load testing',
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
    id: 'gpu-repair',
    number: '04',
    title: 'GPU Repair',
    eyebrow: 'Component Level',
    tagline: 'VRAM, VRM & Thermal Pad Overhaul',
    heading: 'Artifacting or black screens? Don’t throw out a high-value card.',
    copy: 'Modern graphics cards cost a fortune. When fans fail, power stages short, or VRAM pads disintegrate, our micro-technicians replace faulty MOSFETs, resolder blown inductors, and replace high-wattage thermal pads.',
    ctaText: 'Request GPU Diagnosis',
    badge: 'Specialized Lab',
    startingPrice: 'Quote after bench inspection',
    turnaround: '24-48 Hours',
    image: 'https://storage.googleapis.com/banani-generated-images/generated-images/38dcc051-556f-400a-8d75-3b9ad5e8ca57.jpg',
    features: [
      'No-display, black screen & GPU artifacting oscilloscope check',
      'VRAM & GPU core thermal pad replacement (12.8 W/mK Gelid/Odyssey)',
      '12V PCIe power rail fuse & shunt resistor replacement',
      'Post-repair 60-minute stress test with FurMark & 3DMark validation'
    ],
    beforeAfter: {
      beforeImg: 'https://storage.googleapis.com/banani-generated-images/generated-images/3691e766-7e5b-4e4d-9081-63ee8b29065e.jpg',
      afterImg: 'https://storage.googleapis.com/banani-generated-images/generated-images/38dcc051-556f-400a-8d75-3b9ad5e8ca57.jpg',
      beforeLabel: 'Artifacting & heat throttling.',
      afterLabel: 'Component replaced & stress tested.',
      description: 'Restored board. Verified stable.'
    }
  },
  {
    id: 'motherboard-repair',
    number: '05',
    title: 'Motherboard Repair',
    eyebrow: 'Micro-Soldering',
    tagline: 'VRM Stages, BIOS & Traces',
    heading: '“ভাই motherboard শেষ” is often false. We inspect before declaring dead.',
    copy: 'Most local shops write off boards because micro-level diagnostics take patience. We trace shorted power rails with thermal cameras, reprogram corrupted EEPROM BIOS chips, and straighten damaged socket pins.',
    ctaText: 'Inspect Motherboard',
    badge: 'Micro-Soldering',
    startingPrice: 'Quote after bench inspection',
    turnaround: '24-48 Hours',
    image: 'https://storage.googleapis.com/banani-generated-images/generated-images/3691e766-7e5b-4e4d-9081-63ee8b29065e.jpg',
    features: [
      'Short circuit thermal imaging inspection on 12V EPS rails',
      'Corrupted UEFI/BIOS EEPROM chip desoldering & SPI flashing',
      'LGA socket bent pin realignment under optical stereo microscope',
      'Blown solid-polymer capacitor & PWM IC replacement'
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

export const BEFORE_AFTER_CASES: BeforeAfterCase[] = [
  {
    id: 'case-1',
    caseNumber: 'CASE 01',
    category: 'Deep Cleaning',
    systemType: 'Gaming Rig',
    location: 'Dhaka',
    beforeImage: 'https://storage.googleapis.com/banani-generated-images/generated-images/fb644b81-c286-4178-9da3-609d86aae549.jpg',
    afterImage: 'https://storage.googleapis.com/banani-generated-images/generated-images/b6b9b53a-5fff-49d0-a30a-12e1da5683d3.jpg',
    beforeLabel: 'Before',
    afterLabel: 'After',
    beforeDescription: 'Heavy dust buildup inside heatsink fins and fan blades',
    afterDescription: 'Clean fin stacks and unobstructed cooling airflow channels'
  },
  {
    id: 'case-2',
    caseNumber: 'CASE 02',
    category: 'Thermal Maintenance',
    systemType: 'Workstation PC',
    location: 'Banani',
    beforeImage: 'https://storage.googleapis.com/banani-generated-images/generated-images/b25aed3e-3c96-42d6-b148-a01ffa298986.jpg',
    afterImage: 'https://storage.googleapis.com/banani-generated-images/generated-images/1a71c9d4-8931-4eb6-847e-6d1f56e7e5cf.jpg',
    beforeLabel: 'Before',
    afterLabel: 'After',
    beforeDescription: 'Old, dried-out factory thermal compound with cracked contact layer',
    afterDescription: 'Fresh enthusiast thermal compound applied with calibrated mounting pressure'
  },
  {
    id: 'case-3',
    caseNumber: 'CASE 03',
    category: 'GPU Servicing',
    systemType: 'RTX Graphics Card',
    location: 'Dhanmondi',
    beforeImage: 'https://storage.googleapis.com/banani-generated-images/generated-images/3691e766-7e5b-4e4d-9081-63ee8b29065e.jpg',
    afterImage: 'https://storage.googleapis.com/banani-generated-images/generated-images/38dcc051-556f-400a-8d75-3b9ad5e8ca57.jpg',
    beforeLabel: 'Before',
    afterLabel: 'After',
    beforeDescription: 'Dust-covered GPU cooler assembly and thermal pad leakage',
    afterDescription: 'Ultrasonic fin wash, fresh thermal pads, and inspected circuit traces'
  },
  {
    id: 'case-4',
    caseNumber: 'CASE 04',
    category: 'Chassis & Intake De-Clogging',
    systemType: 'Editing Desktop',
    location: 'Uttara',
    beforeImage: 'https://storage.googleapis.com/banani-generated-images/generated-images/d1b04e90-2fbd-4f13-b5c8-0c6fd728fcaf.jpg',
    afterImage: 'https://storage.googleapis.com/banani-generated-images/generated-images/f28dbd89-8390-43f6-ba10-1da36839c345.jpg',
    beforeLabel: 'Before',
    afterLabel: 'After',
    beforeDescription: 'Restricted front intake filters and dust crust on internal components',
    afterDescription: 'De-dusted chassis interior, washed filters, and restored positive pressure airflow'
  }
];

export const RESULTS_DATA: BeforeAfterCardData[] = [
  {
    id: 'card-1',
    title: 'Deep Cleaning & Airflow',
    serviceType: 'Deep Cleaning',
    smallLabel: 'From dusty to breathing again.',
    beforeText: 'Dusty heatsink & choked fan blades.',
    afterText: 'Clean fin stacks. Restored airflow.',
    beforeImg: 'https://storage.googleapis.com/banani-generated-images/generated-images/fb644b81-c286-4178-9da3-609d86aae549.jpg',
    afterImg: 'https://storage.googleapis.com/banani-generated-images/generated-images/b6b9b53a-5fff-49d0-a30a-12e1da5683d3.jpg',
    initialSlider: 50,
    tempDelta: '88°C → 68°C',
    statusNote: 'Acoustic load: 3,200 RPM → 1,250 RPM',
  },
  {
    id: 'card-2',
    title: 'Thermal Maintenance',
    serviceType: 'Thermal Paste / Thermal Maintenance',
    smallLabel: 'Less heat. Less stress.',
    beforeText: 'Dried factory paste (throttling at 91°C).',
    afterText: 'Fresh thermal compound (72°C peak under load).',
    beforeImg: 'https://storage.googleapis.com/banani-generated-images/generated-images/b25aed3e-3c96-42d6-b148-a01ffa298986.jpg',
    afterImg: 'https://storage.googleapis.com/banani-generated-images/generated-images/1a71c9d4-8931-4eb6-847e-6d1f56e7e5cf.jpg',
    initialSlider: 50,
    tempDelta: '91°C → 72°C',
    statusNote: 'Full boost clock sustained with zero throttling',
  },
  {
    id: 'card-3',
    title: 'GPU & Board Diagnostics',
    serviceType: 'GPU & Motherboard Repair',
    smallLabel: 'Problem diagnosed. Properly handled.',
    beforeText: 'No display / shorted power rail fault.',
    afterText: 'Component replaced & 30-min stress test passed.',
    beforeImg: 'https://storage.googleapis.com/banani-generated-images/generated-images/3691e766-7e5b-4e4d-9081-63ee8b29065e.jpg',
    afterImg: 'https://storage.googleapis.com/banani-generated-images/generated-images/38dcc051-556f-400a-8d75-3b9ad5e8ca57.jpg',
    initialSlider: 50,
    tempDelta: '0V rail → 12.1V stable',
    statusNote: 'Identified before customer bought unnecessary replacement',
  }
];

export const REVIEWS_DATA: ReviewItem[] = [
  {
    id: 'rev-1',
    quote: 'Thought my GPU died in the middle of Valorant. Turn out it just needed deep cleaning and new thermal pads. Saved at least 35k BDT on a new graphics card.',
    author: 'Tanvir A.',
    location: 'Dhanmondi, Dhaka',
    type: 'Hardware Repair',
    rating: 5,
    specs: 'RTX 3070 Ti Gaming OC'
  },
  {
    id: 'rev-2',
    quote: 'Home service in Mirpur was on time. Technician had all proper screwdrivers, thermal paste, and antistatic mats. Explained everything nicely before touching a single screw.',
    author: 'Kazi M. Rahman',
    location: 'Mirpur DOHS, Dhaka',
    type: 'Home Service',
    rating: 5,
    specs: 'Ryzen 5 5600X + RTX 3060'
  },
  {
    id: 'rev-3',
    quote: 'Sent from Sylhet through Sundarban Courier. Unboxing video WhatsApp-e পাঠাইসে, diagnosed a failing VRM rail, stress-tested and delivered back within 3 days.',
    author: 'Fahim Shahriar',
    location: 'Sylhet Sadar (Sundarban Courier)',
    type: 'Courier',
    rating: 5,
    specs: 'B450 Aorus + RX 6700 XT'
  },
  {
    id: 'rev-4',
    quote: 'Local shop told me "ভাই motherboard শেষ, নতুন নেওয়া ছাড়া উপায় নাই". PCDecode tested the board with a multimeter, found an oxidized RAM channel pin, and fixed it in 20 minutes.',
    author: 'Sabbir Hossain',
    location: 'Uttara Sector 11, Dhaka',
    type: 'Hardware Repair',
    rating: 5,
    specs: 'MSI MAG B550 Tomahawk'
  },
  {
    id: 'rev-5',
    quote: 'Came to our architectural studio in Banani. Our 3D rendering PC kept shutting down during Lumion exports. Re-thermal pasted with Honeywell PTM7950 and temps dropped from 94°C to 74°C.',
    author: 'Farhana & Team',
    location: 'Banani, Dhaka',
    type: 'Home Service',
    rating: 5,
    specs: 'Core i9 12900K + RTX 3090'
  }
];
