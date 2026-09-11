import { useState } from 'react';
import { X, CheckCircle2, MessageSquare, Calendar, MapPin, Phone, User, ShieldCheck, Truck, Copy, Check } from 'lucide-react';
import { BookingFormData } from '../types';
import { DUMMY_COURIER_HUB, formatHubAddress } from '../data/courierHub';

interface BookingConfirmationModalProps {
  booking: BookingFormData | null;
  onClose: () => void;
}

export function BookingConfirmationModal({ booking, onClose }: BookingConfirmationModalProps) {
  const [copiedHub, setCopiedHub] = useState(false);
  if (!booking) return null;

  const ticketId = `PCD-${Math.floor(100000 + Math.random() * 900000)}`;

  const copyHub = () => {
    navigator.clipboard.writeText(formatHubAddress());
    setCopiedHub(true);
    setTimeout(() => setCopiedHub(false), 2500);
  };

  const whatsappMessage = encodeURIComponent(
    `Hello PCDecode! I have submitted a service request:\n` +
    `Ticket ID: ${ticketId}\n` +
    `Name: ${booking.name}\n` +
    `Phone: ${booking.phone}\n` +
    `Mode: ${booking.serviceMode === 'home' ? 'Home Service in Dhaka' : 'Courier Outside Dhaka'}\n` +
    `Location: ${booking.location}\n` +
    (booking.detailedAddress ? `Address: ${booking.detailedAddress}\n` : '') +
    (booking.systemType ? `Form Factor: ${booking.systemType}\n` : '') +
    (booking.courierPartner ? `Courier: ${booking.courierPartner}\n` : '') +
    (booking.courierTrackingNumber ? `Tracking No: ${booking.courierTrackingNumber}\n` : '') +
    `Service: ${booking.serviceType}\n` +
    `Issue: ${booking.problemDescription}\n` +
    `Preferred Date: ${booking.preferredDate} (${booking.preferredTime})`
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn overflow-y-auto">
      <div className="bg-white text-[#0d0f12] rounded-3xl border border-[#dedad0] max-w-[620px] w-full p-6 sm:p-8 shadow-2xl relative my-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#f6f5f0] hover:bg-[#e8e6e1] flex items-center justify-center text-[#0d0f12] transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Success Icon */}
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
            <CheckCircle2 className="w-7 h-7 stroke-[2.5]" />
          </div>
          <div>
            <span className="font-mono text-xs font-bold text-emerald-800 uppercase bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              Request Logged • Ticket #{ticketId}
            </span>
            <h3 className="font-heading text-xl sm:text-2xl font-bold text-[#0d0f12] mt-1">
              We're On It, {booking.name.split(' ')[0]}!
            </h3>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-[#4e5158] mt-2 leading-relaxed">
          {booking.serviceMode === 'home'
            ? 'Our senior diagnostic technician will phone you to confirm your exact Dhaka address and arrival time window.'
            : 'Your courier service request is initiated! Send your parcel to our Banani Intake Hub below.'}
        </p>

        {/* SPECIAL COURIER HUB BOX FOR COURIER BOOKINGS */}
        {booking.serviceMode === 'courier' && (
          <div className="mt-4 p-4 rounded-2xl bg-[#0d0f12] text-white border border-[#262930] space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-[#d9ff3d] flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5" />
                SHIP PARCEL TO OUR INTAKE HUB:
              </span>
              <button
                type="button"
                onClick={copyHub}
                className="text-[11px] font-mono font-bold text-white bg-white/10 hover:bg-white/20 px-2.5 py-1 rounded-lg flex items-center gap-1 transition-all cursor-pointer"
              >
                {copiedHub ? <Check className="w-3 h-3 text-[#d9ff3d]" /> : <Copy className="w-3 h-3" />}
                <span>{copiedHub ? 'Copied' : 'Copy Address'}</span>
              </button>
            </div>

            <div className="text-xs text-[#c6cad5] leading-relaxed">
              <div className="font-bold text-white text-sm">{DUMMY_COURIER_HUB.labName}</div>
              <div>Attn: {DUMMY_COURIER_HUB.recipientName}</div>
              <div>Address: {DUMMY_COURIER_HUB.addressLine1}, {DUMMY_COURIER_HUB.addressLine2}, {DUMMY_COURIER_HUB.city}-{DUMMY_COURIER_HUB.postalCode}</div>
              <div>Landmark: {DUMMY_COURIER_HUB.landmark}</div>
              <div>Hub Phone: <span className="text-[#d9ff3d] font-mono font-bold">{DUMMY_COURIER_HUB.phone}</span></div>
            </div>

            <div className="pt-1.5 border-t border-white/10 text-[11px] text-[#9398a8]">
              💡 <em>Please write Ticket #{ticketId} & your mobile number on the parcel box.</em>
            </div>
          </div>
        )}

        {/* Booking Summary Box */}
        <div className="mt-4 p-4 rounded-2xl bg-[#faf9f6] border border-[#e8e6e1] space-y-2 text-xs sm:text-sm">
          <div className="flex justify-between border-b border-[#e8e6e1] pb-1.5">
            <span className="text-[#6f6e6a]">Service:</span>
            <span className="font-bold text-[#0d0f12]">{booking.serviceType}</span>
          </div>
          <div className="flex justify-between border-b border-[#e8e6e1] pb-1.5">
            <span className="text-[#6f6e6a]">Service Mode:</span>
            <span className="font-bold text-[#0d0f12]">
              {booking.serviceMode === 'home' ? 'Home Service (Dhaka)' : 'Nationwide Courier'}
            </span>
          </div>
          {booking.systemType && (
            <div className="flex justify-between border-b border-[#e8e6e1] pb-1.5">
              <span className="text-[#6f6e6a]">System:</span>
              <span className="font-bold text-[#0d0f12]">{booking.systemType}</span>
            </div>
          )}
          <div className="flex justify-between border-b border-[#e8e6e1] pb-1.5">
            <span className="text-[#6f6e6a]">Location:</span>
            <span className="font-bold text-[#0d0f12]">{booking.location}</span>
          </div>
          {booking.detailedAddress && (
            <div className="flex justify-between border-b border-[#e8e6e1] pb-1.5">
              <span className="text-[#6f6e6a]">Address:</span>
              <span className="font-bold text-[#0d0f12]">{booking.detailedAddress}</span>
            </div>
          )}
          <div className="flex justify-between border-b border-[#e8e6e1] pb-1.5">
            <span className="text-[#6f6e6a]">Contact Phone:</span>
            <span className="font-bold text-[#0d0f12]">{booking.phone}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#6f6e6a]">Slot:</span>
            <span className="font-bold text-[#0d0f12]">
              {booking.preferredDate} • {booking.preferredTime.split(' ')[0]}
            </span>
          </div>
        </div>

        {/* 30-Day Warranty Reminder */}
        <div className="mt-3 flex items-center gap-2 text-xs text-emerald-800 bg-emerald-50/70 p-2.5 rounded-xl border border-emerald-200/80">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Backed by PCDecode 30-Day Repair Warranty & Genuine Thermal Compound Guarantee</span>
        </div>

        {/* Actions */}
        <div className="mt-5 flex flex-col sm:flex-row gap-3">
          <a
            href={`https://wa.me/8801700000000?text=${whatsappMessage}`}
            target="_blank"
            rel="noreferrer"
            className="flex-1 bg-[#25D366] hover:bg-[#20bd5a] text-black font-semibold text-xs sm:text-sm py-3 px-4 rounded-full flex items-center justify-center gap-2 shadow transition-all cursor-pointer"
          >
            <MessageSquare className="w-4 h-4 fill-current" />
            <span>Confirm on WhatsApp Now</span>
          </a>

          <button
            onClick={onClose}
            className="bg-[#0d0f12] hover:bg-[#22252a] text-white font-semibold text-xs sm:text-sm py-3 px-6 rounded-full cursor-pointer transition-all"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
