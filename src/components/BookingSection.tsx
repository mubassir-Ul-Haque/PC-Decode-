import { useState, FormEvent } from 'react';
import { BookingFormData } from '../types';
import { DUMMY_COURIER_HUB, formatHubAddress } from '../data/courierHub';
import { ShieldCheck, Calendar, Clock, MapPin, Phone, User, Wrench, ArrowRight, CheckCircle2, MessageSquare, Copy, Check, Truck, AlertTriangle, Cpu, Tag, Package } from 'lucide-react';

interface BookingSectionProps {
  preselectedService?: string;
  onBookingSuccess: (data: BookingFormData) => void;
}

export function BookingSection({ preselectedService, onBookingSuccess }: BookingSectionProps) {
  const [formData, setFormData] = useState<BookingFormData>({
    name: '',
    phone: '',
    email: '',
    location: '',
    detailedAddress: '',
    serviceType: preselectedService || 'Deep Cleaning',
    serviceMode: 'home',
    systemType: 'Gaming Rig',
    pcSpecs: '',
    urgencyLevel: 'Standard (24-48 Hours)',
    courierPartner: 'Sundarban Courier',
    courierTrackingNumber: '',
    gpuRemovedForCourier: false,
    problemDescription: '',
    preferredDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    preferredTime: 'Afternoon (2:00 PM - 5:00 PM)',
  });

  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [copiedHub, setCopiedHub] = useState<boolean>(false);
  const [errors, setErrors] = useState<Partial<Record<keyof BookingFormData, string>>>({});

  const dhakaCoverageAreas = [
    'Mirpur', 'Uttara', 'Dhanmondi', 'Gulshan', 'Banani', 
    'Mohammadpur', 'Bashundhara', 'Badda', 'Motijheel', 'Old Dhaka', 'Khilgaon', 'Mohakhali'
  ];

  const symptomsList = [
    'Overheating / High Temps',
    'Loud Jet-Engine Fans',
    'In-Game FPS Drops',
    'No Display / Black Screen',
    'Random Shutdowns / Reboots',
    'Unusually Slow PC',
    'Freezing / BSOD Crash',
    'Dusty / Needs Repasting',
  ];

  const toggleSymptom = (sym: string) => {
    if (selectedSymptoms.includes(sym)) {
      setSelectedSymptoms(selectedSymptoms.filter((s) => s !== sym));
    } else {
      setSelectedSymptoms([...selectedSymptoms, sym]);
    }
  };

  const copyHubDetails = () => {
    navigator.clipboard.writeText(formatHubAddress());
    setCopiedHub(true);
    setTimeout(() => setCopiedHub(false), 2500);
  };

  const validate = () => {
    const errs: Partial<Record<keyof BookingFormData, string>> = {};
    if (!formData.name.trim()) errs.name = 'Please provide your full name';
    if (!formData.phone.trim()) {
      errs.phone = 'Phone number is required';
    } else if (formData.phone.length < 9) {
      errs.phone = 'Please enter a valid phone number (e.g. 017XXXXXXXX)';
    }
    if (!formData.location.trim()) {
      errs.location = formData.serviceMode === 'courier'
        ? 'Please specify your District / City (e.g. Sylhet, Chattogram)'
        : 'Please specify your area (e.g. Mirpur, Uttara, Dhanmondi)';
    }
    if (!formData.problemDescription.trim() && selectedSymptoms.length === 0) {
      errs.problemDescription = 'Please describe what your PC is doing or select at least one symptom';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const combinedDescription = selectedSymptoms.length > 0
      ? `Symptoms: ${selectedSymptoms.join(', ')}${formData.problemDescription ? `\n\nNotes: ${formData.problemDescription}` : ''}`
      : formData.problemDescription;

    onBookingSuccess({
      ...formData,
      problemDescription: combinedDescription
    });
  };

  const serviceOptions = [
    'Deep Cleaning',
    'Thermal Paste / Thermal Maintenance',
    'Hardware Diagnostics',
    'GPU & Motherboard Repair',
    'Full Tune-up & Inspection',
    'Not Sure / Diagnose First',
  ];

  const systemTypes: ('Desktop PC' | 'Gaming Rig' | 'Workstation / Editing' | 'Laptop' | 'ITX / Mini PC')[] = [
    'Gaming Rig',
    'Desktop PC',
    'Workstation / Editing',
    'Laptop',
    'ITX / Mini PC'
  ];

  const urgencyOptions: ('Standard (24-48 Hours)' | 'Express Same-Day (Dhaka)' | 'Weekend Slot')[] = [
    'Standard (24-48 Hours)',
    'Express Same-Day (Dhaka)',
    'Weekend Slot'
  ];

  const courierPartners: ('Sundarban Courier' | 'SA Paribahan' | 'Steadfast' | 'Pathao' | 'RedX' | 'eCourier' | 'Other / Not decided yet')[] = [
    'Sundarban Courier',
    'SA Paribahan',
    'Steadfast',
    'Pathao',
    'RedX',
    'eCourier',
    'Other / Not decided yet'
  ];

  const timeOptions = [
    'Morning (10:00 AM - 1:00 PM)',
    'Afternoon (2:00 PM - 5:00 PM)',
    'Evening (6:00 PM - 8:30 PM)',
    'Earliest Available',
  ];

  return (
    <section id="booking" className="w-full bg-[#f6f5f0] py-16 md:py-24 border-b border-[#e8e6e1]">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          
          {/* LEFT 5 COLS: Context & Courier Hub Information */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div>
              <span className="inline-block text-xs font-mono font-bold tracking-wider text-[#6f6e6a] uppercase">
                BOOK A SERVICE
              </span>

              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#0d0f12] mt-3 leading-tight">
                Tell us what's wrong with your PC.
              </h2>

              <div className="mt-4 space-y-2 text-base text-[#44464c] leading-relaxed">
                <p>
                  You don't need to know complex technical terms.
                </p>
                <p className="font-semibold text-[#0d0f12]">
                  Tell us what you're observing — we diagnose the root cause and seek your approval before any repair.
                </p>
              </div>

              {/* DUMMY COURIER SERVICE LOCATION CARD */}
              <div className="mt-6 bg-[#0d0f12] text-white rounded-2xl p-5 border border-[#2b2f38] shadow-md relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-bold text-[#d9ff3d] uppercase tracking-wider flex items-center gap-1.5">
                    <Truck className="w-3.5 h-3.5" />
                    PCDecode Service Lab (Demo Hub)
                  </span>
                  <button
                    type="button"
                    onClick={copyHubDetails}
                    className="text-[11px] font-mono font-bold text-white bg-white/10 hover:bg-white/20 px-2.5 py-1 rounded-lg flex items-center gap-1 transition-all cursor-pointer"
                    title="Copy hub address to clipboard"
                    id="booking-copy-hub-btn"
                  >
                    {copiedHub ? <Check className="w-3 h-3 text-[#d9ff3d]" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedHub ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>

                <div className="mt-3 font-mono text-xs text-[#b8bcc8] leading-relaxed">
                  <p className="font-bold text-white font-heading text-sm">{DUMMY_COURIER_HUB.labName}</p>
                  <p>Attn: {DUMMY_COURIER_HUB.recipientName}</p>
                  <p>{DUMMY_COURIER_HUB.addressLine1}, {DUMMY_COURIER_HUB.addressLine2}</p>
                  <p>{DUMMY_COURIER_HUB.city}-{DUMMY_COURIER_HUB.postalCode}, Bangladesh</p>
                  <p className="text-[#a0a5b4]">Landmark: {DUMMY_COURIER_HUB.landmark}</p>
                  <p className="mt-1 text-white">Contact / In-charge: <strong className="text-[#d9ff3d]">{DUMMY_COURIER_HUB.phone}</strong></p>
                </div>

                <div className="mt-3 pt-2.5 border-t border-white/10 text-[11px] text-[#8e93a2] flex items-center justify-between font-mono">
                  <span>Sat - Thu (10am - 8pm)</span>
                  <span className="text-emerald-400 font-medium">Uttara Sector 3 Lab</span>
                </div>
              </div>

              {/* Service Modes explanation */}
              <div className="mt-5 p-4 bg-white rounded-2xl border border-[#e8e6e1] space-y-2.5 text-xs text-[#34363c]">
                <div className="flex items-center gap-2 font-bold text-[#0d0f12] text-sm">
                  <Wrench className="w-4 h-4 text-emerald-700" />
                  <span>Service Delivery Options</span>
                </div>
                <div className="space-y-1.5 text-[#5a5d64] leading-relaxed">
                  <p>
                    • <strong>Home Service (Dhaka):</strong> Our senior diagnostic technician visits your home or office with professional testing tools, thermal supplies, and replacement components.
                  </p>
                  <p>
                    • <strong>Courier Service (Nationwide):</strong> Ship your PC from any of Bangladesh's 64 districts. We record an unboxing video upon arrival and WhatsApp you with the diagnosis.
                  </p>
                </div>
              </div>

              {/* Direct WhatsApp Callout */}
              <div className="p-4 rounded-xl bg-[#e9f7ee] border border-[#c3ebce] text-[#0d0f12] flex items-center justify-between">
                <div>
                  <div className="text-xs font-mono font-bold text-emerald-800">Need quick advice first?</div>
                  <div className="text-xs text-[#41454e] mt-0.5">Chat with our technical team</div>
                </div>
                <a
                  href="https://wa.me/8801700000000?text=Hello%20PCDecode!%20I%20have%20a%20question%20about%20PC%20service."
                  target="_blank"
                  rel="noreferrer"
                  className="bg-[#25D366] hover:bg-[#20bd5a] text-black font-semibold text-xs px-3.5 py-2 rounded-full flex items-center gap-1.5 transition-all shadow-sm"
                >
                  <MessageSquare className="w-3.5 h-3.5 fill-current" />
                  <span>WhatsApp Us</span>
                </a>
              </div>
            </div>

            <div className="text-xs text-[#6f6e6a] space-y-1">
              <p>• Operating across all Dhaka zones with transparent technician dispatch</p>
              <p>• Nationwide courier coverage across 64 districts with return shipment packaging</p>
            </div>
          </div>

          {/* RIGHT 7 COLS: Upgraded Comprehensive Booking Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-[#dedad0] p-6 sm:p-8 lg:p-10 shadow-lg">
            
            <div className="border-b border-[#e8e6e1] pb-5">
              <span className="text-[11px] font-mono font-bold text-[#6f6e6a] uppercase">
                DIAGNOSTIC INTAKE FORM
              </span>
              <h3 className="font-heading text-2xl sm:text-3xl font-bold text-[#0d0f12] mt-0.5">
                Book a Service
              </h3>
              <p className="text-xs sm:text-sm text-[#6f6e6a] mt-1">
                Fill in your PC details. We inspect the root cause first and confirm all pricing before doing any paid repairs.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-6 space-y-6">
              
              {/* 1. DELIVERY METHOD (2 OPTIONS: HOME SERVICE OR COURIER) */}
              <div>
                <label className="block text-xs font-bold text-[#0d0f12] uppercase tracking-wider mb-2">
                  1. Delivery Method *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, serviceMode: 'home' })}
                    className={`p-3.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer flex flex-col items-center gap-1.5 text-center ${
                      formData.serviceMode === 'home'
                        ? 'bg-[#0d0f12] text-white border-[#0d0f12] shadow-sm ring-2 ring-[#d9ff3d]/50'
                        : 'bg-[#faf9f6] text-[#4d5057] border-[#e8e6e1] hover:border-[#cfccc3]'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 font-bold text-sm">
                      <MapPin className="w-4 h-4 text-[#d9ff3d]" />
                      <span>Home Service (Dhaka)</span>
                    </div>
                    <span className="text-[11px] opacity-80">Technician visits your location in Dhaka</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, serviceMode: 'courier' })}
                    className={`p-3.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer flex flex-col items-center gap-1.5 text-center ${
                      formData.serviceMode === 'courier'
                        ? 'bg-[#0d0f12] text-white border-[#0d0f12] shadow-sm ring-2 ring-[#d9ff3d]/50'
                        : 'bg-[#faf9f6] text-[#4d5057] border-[#e8e6e1] hover:border-[#cfccc3]'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 font-bold text-sm">
                      <Truck className="w-4 h-4 text-[#d9ff3d]" />
                      <span>Courier (Outside Dhaka)</span>
                    </div>
                    <span className="text-[11px] opacity-80">Supported across all 64 districts</span>
                  </button>
                </div>

                {/* Conditional Help Banner according to Delivery Method */}
                {formData.serviceMode === 'home' && (
                  <div className="mt-3 p-3 rounded-xl bg-[#faf9f6] border border-[#e8e6e1] text-xs">
                    <div className="text-[11px] font-mono font-bold text-[#6f6e6a] uppercase mb-1.5">
                      Dhaka Coverage Areas:
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {dhakaCoverageAreas.map((area) => (
                        <button
                          type="button"
                          key={area}
                          onClick={() => setFormData({ ...formData, location: area })}
                          className={`text-[11px] px-2 py-0.5 rounded-md border cursor-pointer transition-colors ${
                            formData.location.includes(area)
                              ? 'bg-[#0d0f12] text-white border-[#0d0f12]'
                              : 'bg-white text-[#414349] border-[#dedad0] hover:border-[#aaa79d]'
                          }`}
                        >
                          {area}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {formData.serviceMode === 'courier' && (
                  <div className="mt-3 p-3 rounded-xl bg-[#faf9f6] border border-[#e8e6e1] text-xs text-[#3b3e45] space-y-2">
                    <div className="text-[11px] font-mono font-bold text-[#0d0f12] uppercase flex items-center justify-between">
                      <span>Nationwide Courier Dispatch Hub</span>
                      <span className="text-emerald-700">64 Districts Supported</span>
                    </div>
                    <p className="text-[11px] text-[#52555c] leading-relaxed">
                      Ship via <strong>Sundarban, SA Paribahan, Steadfast, Pathao, RedX, or eCourier</strong> to our Uttara Lab. We record an unboxing video upon parcel arrival.
                    </p>
                    <div className="bg-white p-2 rounded-lg border border-[#e0ddd2] text-[11px] font-mono text-[#1a1b1e]">
                      <strong>Hub Address:</strong> {DUMMY_COURIER_HUB.labName}, {DUMMY_COURIER_HUB.addressLine1}, {DUMMY_COURIER_HUB.addressLine2}, {DUMMY_COURIER_HUB.city}-{DUMMY_COURIER_HUB.postalCode} | Phone: {DUMMY_COURIER_HUB.phone}
                    </div>
                  </div>
                )}
              </div>

              {/* 2. SYSTEM FORM FACTOR & SERVICE TYPE */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="booking-service" className="block text-xs font-bold text-[#0d0f12] mb-1.5">
                    Service Required *
                  </label>
                  <select
                    id="booking-service"
                    value={formData.serviceType}
                    onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                    className="w-full bg-[#faf9f6] border border-[#e8e6e1] focus:border-[#0d0f12] focus:bg-white rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-[#0d0f12] outline-none transition-all cursor-pointer"
                  >
                    {serviceOptions.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="booking-system-type" className="block text-xs font-bold text-[#0d0f12] mb-1.5">
                    System Type
                  </label>
                  <select
                    id="booking-system-type"
                    value={formData.systemType}
                    onChange={(e) => setFormData({ ...formData, systemType: e.target.value as any })}
                    className="w-full bg-[#faf9f6] border border-[#e8e6e1] focus:border-[#0d0f12] focus:bg-white rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-[#0d0f12] outline-none transition-all cursor-pointer"
                  >
                    {systemTypes.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* 3. SYMPTOM QUICK SELECTOR */}
              <div>
                <label className="block text-xs font-bold text-[#0d0f12] mb-2">
                  What is your PC currently doing? (Select any)
                </label>
                <div className="flex flex-wrap gap-2">
                  {symptomsList.map((sym) => {
                    const isSelected = selectedSymptoms.includes(sym);
                    return (
                      <button
                        type="button"
                        key={sym}
                        onClick={() => toggleSymptom(sym)}
                        className={`text-xs px-3 py-1.5 rounded-full border transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#0d0f12] text-[#d9ff3d] border-[#0d0f12] font-semibold'
                            : 'bg-[#faf9f6] text-[#484b52] border-[#dedad0] hover:border-[#b4b1a4]'
                        }`}
                      >
                        {isSelected ? '✓ ' : '+ '}{sym}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 4. CUSTOMER CONTACT DETAILS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="booking-name" className="block text-xs font-bold text-[#0d0f12] mb-1.5">
                    Your Name *
                  </label>
                  <input
                    id="booking-name"
                    type="text"
                    placeholder="e.g. Tanvir Ahmed"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#faf9f6] border border-[#e8e6e1] focus:border-[#0d0f12] focus:bg-white rounded-xl px-3.5 py-2.5 text-sm text-[#0d0f12] placeholder-[#9ca0aa] outline-none transition-all"
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label htmlFor="booking-phone" className="block text-xs font-bold text-[#0d0f12] mb-1.5">
                    Phone / WhatsApp *
                  </label>
                  <input
                    id="booking-phone"
                    type="tel"
                    placeholder="e.g. 017XXXXXXXX"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-[#faf9f6] border border-[#e8e6e1] focus:border-[#0d0f12] focus:bg-white rounded-xl px-3.5 py-2.5 text-sm text-[#0d0f12] placeholder-[#9ca0aa] outline-none transition-all"
                  />
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                </div>
              </div>

              {/* 5. LOCATION & ADDRESS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="booking-location" className="block text-xs font-bold text-[#0d0f12] mb-1.5">
                    {formData.serviceMode === 'courier' ? 'District / City *' : 'Area in Dhaka *'}
                  </label>
                  <input
                    id="booking-location"
                    type="text"
                    placeholder={formData.serviceMode === 'courier' ? 'e.g. Sylhet, Chattogram, Bogura' : 'e.g. Mirpur, Uttara, Dhanmondi'}
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full bg-[#faf9f6] border border-[#e8e6e1] focus:border-[#0d0f12] focus:bg-white rounded-xl px-3.5 py-2.5 text-sm text-[#0d0f12] placeholder-[#9ca0aa] outline-none transition-all"
                  />
                  {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location}</p>}
                </div>

                <div>
                  <label htmlFor="booking-detailed-address" className="block text-xs font-bold text-[#0d0f12] mb-1.5">
                    {formData.serviceMode === 'courier' ? 'Return Delivery Address (Optional)' : 'House / Road / Flat (Optional)'}
                  </label>
                  <input
                    id="booking-detailed-address"
                    type="text"
                    placeholder="e.g. House 12, Road 4, Flat 3B"
                    value={formData.detailedAddress || ''}
                    onChange={(e) => setFormData({ ...formData, detailedAddress: e.target.value })}
                    className="w-full bg-[#faf9f6] border border-[#e8e6e1] focus:border-[#0d0f12] focus:bg-white rounded-xl px-3.5 py-2.5 text-sm text-[#0d0f12] placeholder-[#9ca0aa] outline-none transition-all"
                  />
                </div>
              </div>

              {/* 6. COURIER-SPECIFIC DISPATCH FIELDS */}
              {formData.serviceMode === 'courier' && (
                <div className="p-4 sm:p-5 rounded-2xl bg-[#faf9f6] border border-[#e0ddd2] space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="booking-courier-partner" className="block text-xs font-bold text-[#0d0f12] mb-1.5">
                        Courier Network
                      </label>
                      <select
                        id="booking-courier-partner"
                        value={formData.courierPartner}
                        onChange={(e) => setFormData({ ...formData, courierPartner: e.target.value as any })}
                        className="w-full bg-white border border-[#e8e6e1] focus:border-[#0d0f12] rounded-xl px-3.5 py-2 text-xs sm:text-sm text-[#0d0f12] outline-none transition-all cursor-pointer"
                      >
                        {courierPartners.map((p) => (
                          <option key={p} value={p}>{p}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="booking-tracking" className="block text-xs font-bold text-[#0d0f12] mb-1.5">
                        Courier Booking Slip / Tracking (Optional)
                      </label>
                      <input
                        id="booking-tracking"
                        type="text"
                        placeholder="e.g. SNB-883492 or leave empty"
                        value={formData.courierTrackingNumber || ''}
                        onChange={(e) => setFormData({ ...formData, courierTrackingNumber: e.target.value })}
                        className="w-full bg-white border border-[#e8e6e1] focus:border-[#0d0f12] rounded-xl px-3.5 py-2 text-xs sm:text-sm text-[#0d0f12] placeholder-[#9ca0aa] outline-none transition-all font-mono"
                      />
                    </div>
                  </div>

                  {/* GPU Safety Reminder Checkbox */}
                  <label className="flex items-start gap-2.5 p-2.5 rounded-xl bg-white border border-[#e5e2d8] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.gpuRemovedForCourier || false}
                      onChange={(e) => setFormData({ ...formData, gpuRemovedForCourier: e.target.checked })}
                      className="w-4 h-4 rounded text-[#0d0f12] focus:ring-0 cursor-pointer mt-0.5"
                    />
                    <div className="text-xs text-[#3b3e45] leading-relaxed">
                      <strong>Packaging safety tip:</strong> Remove GPU or brace it securely inside the case so transit shocks cannot damage the PCIe slot.
                    </div>
                  </label>
                </div>
              )}

              {/* 7. PROBLEM DESCRIPTION & PC SPECS */}
              <div className="space-y-4">
                <div>
                  <label htmlFor="booking-problem" className="block text-xs font-bold text-[#0d0f12] mb-1.5">
                    Short Description of the Problem *
                  </label>
                  <textarea
                    id="booking-problem"
                    rows={3}
                    placeholder="e.g. Games crash after 10 minutes. Fans spin very fast. Was assembled 2 years ago, paste never changed."
                    value={formData.problemDescription}
                    onChange={(e) => setFormData({ ...formData, problemDescription: e.target.value })}
                    className="w-full bg-[#faf9f6] border border-[#e8e6e1] focus:border-[#0d0f12] focus:bg-white rounded-xl px-3.5 py-2.5 text-sm text-[#0d0f12] placeholder-[#9ca0aa] outline-none transition-all resize-y"
                  />
                  {errors.problemDescription && <p className="text-red-500 text-xs mt-1">{errors.problemDescription}</p>}
                </div>

                <div>
                  <label htmlFor="booking-specs" className="block text-xs font-bold text-[#0d0f12] mb-1.5">
                    PC Specs (Optional)
                  </label>
                  <input
                    id="booking-specs"
                    type="text"
                    placeholder="e.g. Ryzen 5 5600X, RTX 3070, 16GB RAM, Deepcool AIO"
                    value={formData.pcSpecs || ''}
                    onChange={(e) => setFormData({ ...formData, pcSpecs: e.target.value })}
                    className="w-full bg-[#faf9f6] border border-[#e8e6e1] focus:border-[#0d0f12] focus:bg-white rounded-xl px-3.5 py-2.5 text-sm text-[#0d0f12] placeholder-[#9ca0aa] outline-none transition-all"
                  />
                </div>
              </div>

              {/* 8. PREFERRED DATE & TIME (OPTIONAL) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="booking-date" className="block text-xs font-bold text-[#0d0f12] mb-1.5">
                    Preferred Date (Optional)
                  </label>
                  <input
                    id="booking-date"
                    type="date"
                    value={formData.preferredDate}
                    onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                    className="w-full bg-[#faf9f6] border border-[#e8e6e1] focus:border-[#0d0f12] rounded-xl px-3 py-2 text-xs text-[#0d0f12] outline-none cursor-pointer"
                  />
                </div>

                <div>
                  <label htmlFor="booking-time" className="block text-xs font-bold text-[#0d0f12] mb-1.5">
                    Preferred Time Slot (Optional)
                  </label>
                  <select
                    id="booking-time"
                    value={formData.preferredTime}
                    onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                    className="w-full bg-[#faf9f6] border border-[#e8e6e1] focus:border-[#0d0f12] rounded-xl px-3 py-2 text-xs text-[#0d0f12] outline-none cursor-pointer"
                  >
                    {timeOptions.map((time) => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* SUBMIT BUTTON (STANDARDIZED CTA) */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-[#0d0f12] hover:bg-[#22252a] text-white font-heading font-bold text-base rounded-2xl py-4 flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer active:scale-[0.99]"
                  id="form-submit-request-service"
                >
                  <span>{formData.serviceMode === 'courier' ? 'Send Your PC' : 'Book a Service'}</span>
                  <ArrowRight className="w-4 h-4 text-[#d9ff3d]" />
                </button>
              </div>

              {/* Reassurance */}
              <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-[#6f6e6a] text-center pt-1">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>30-Day Service Warranty</span>
                </div>
                <span>•</span>
                <span>Diagnosis First</span>
                <span>•</span>
                <span>Customer Approval Required</span>
              </div>

            </form>

          </div>

        </div>

      </div>
    </section>
  );
}
