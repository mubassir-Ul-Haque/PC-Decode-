import { useState } from 'react';
import { Package, Truck, Wrench, CheckCircle, Shield, AlertTriangle, ArrowRight, Info, MapPin, Copy, Check, Phone } from 'lucide-react';
import { DUMMY_COURIER_HUB, formatHubAddress } from '../data/courierHub';

interface CourierSectionProps {
  onStartCourier: () => void;
  onOpenPackingGuide: () => void;
}

export function CourierSection({ onStartCourier, onOpenPackingGuide }: CourierSectionProps) {
  const [copiedHub, setCopiedHub] = useState(false);

  const copyAddress = () => {
    navigator.clipboard.writeText(formatHubAddress());
    setCopiedHub(true);
    setTimeout(() => setCopiedHub(false), 2500);
  };

  const steps = [
    {
      step: 'STEP 01',
      icon: Package,
      title: 'Book Your Service',
      copy: 'Tell us what\'s happening with your PC.',
      banglaTip: 'Book online or ping us on WhatsApp with the issue.',
    },
    {
      step: 'STEP 02',
      icon: Truck,
      title: 'Pack It Properly',
      copy: 'Secure packaging matters. Your PC is valuable — don\'t send it wrapped in "ভাই courier মানুষ ভালো."',
      banglaTip: 'Double bubble wrap + original chassis box if available.',
    },
    {
      step: 'STEP 03',
      icon: Wrench,
      title: 'We Diagnose & Repair',
      copy: 'Our technicians inspect the system and work on the actual problem.',
      banglaTip: 'We send unboxing & diagnostic video to your WhatsApp.',
    },
    {
      step: 'STEP 04',
      icon: CheckCircle,
      title: 'We Test & Return',
      copy: 'Your PC gets tested before it\'s prepared for return.',
      banglaTip: 'Securely packaged with 30-day warranty card in the box.',
    },
  ];

  return (
    <section id="courier" className="w-full bg-[#faf9f6] py-16 md:py-24 border-b border-[#e8e6e1]">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-8">
        
        {/* Header Block */}
        <div className="max-w-[820px]">
          <span className="inline-block text-xs font-mono font-bold tracking-wider text-[#6f6e6a] uppercase">
            OUTSIDE DHAKA?
          </span>

          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#0d0f12] mt-3 leading-tight">
            Dhaka থেকে দূরে? <br className="hidden sm:inline" />
            <span className="bg-[#d9ff3d] px-2 py-0.5 rounded">PC কিন্তু এত দূরে না.</span>
          </h2>

          <p className="text-base sm:text-lg text-[#4a4d53] mt-5 leading-relaxed">
            If you're outside Dhaka, you don't have to give up on professional PC service. Send your PC to our Banani Diagnostic Lab through courier. We'll diagnose it, repair or service it, conduct stress tests, and courier it back to your doorstep.
          </p>
        </div>

        {/* 4 Courier Steps */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((item) => {
            const IconComp = item.icon;
            return (
              <div
                key={item.step}
                className="bg-white rounded-2xl border border-[#e8e6e1] p-6 flex flex-col justify-between shadow-sm relative overflow-hidden group hover:border-[#cfccc3] transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-[#f5f4ef] text-[#0d0f12] border border-[#e8e6e1]">
                      {item.step}
                    </span>
                    <IconComp className="w-5 h-5 text-[#0d0f12]" />
                  </div>

                  <h3 className="font-heading text-lg font-bold text-[#0d0f12] mb-2">
                    {item.title}
                  </h3>

                  <p className="text-sm text-[#3f4147] leading-relaxed">
                    {item.copy}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-[#e8e6e1] text-xs text-[#6f6e6a]">
                  {item.banglaTip}
                </div>
              </div>
            );
          })}
        </div>

        {/* DUMMY COURIER SERVICE LOCATION DISPLAY CARD */}
        <div className="mt-10 bg-[#0d0f12] text-white rounded-3xl p-6 sm:p-8 border border-[#272a32] shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Hub Info */}
            <div className="lg:col-span-8 space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#d9ff3d] text-black uppercase">
                  Official Courier Intake Hub
                </span>
                <span className="text-xs text-[#a0a5b4]">
                  Serving 64 Districts Across Bangladesh
                </span>
              </div>

              <div>
                <h3 className="font-heading text-xl sm:text-2xl font-bold text-white">
                  {DUMMY_COURIER_HUB.labName}
                </h3>
                <p className="text-xs sm:text-sm text-[#c0c5d4] mt-1.5 leading-relaxed">
                  <strong>Consignee / Recipient:</strong> {DUMMY_COURIER_HUB.recipientName}<br />
                  <strong>Address:</strong> {DUMMY_COURIER_HUB.addressLine1}, {DUMMY_COURIER_HUB.addressLine2}, {DUMMY_COURIER_HUB.city}-{DUMMY_COURIER_HUB.postalCode}, Bangladesh<br />
                  <strong>Landmark:</strong> {DUMMY_COURIER_HUB.landmark}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-xs text-[#b0b5c4] pt-2 border-t border-white/10">
                <div className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-[#d9ff3d]" />
                  <span>Lab Hotline: <strong className="text-white font-mono">{DUMMY_COURIER_HUB.phone}</strong></span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#d9ff3d]" />
                  <span>Banani Commercial Area, Dhaka</span>
                </div>
              </div>

              {/* Supported Couriers */}
              <div className="pt-2">
                <div className="text-[11px] font-mono font-bold text-[#8c91a0] uppercase tracking-wider mb-2">
                  Accepted Courier Networks:
                </div>
                <div className="flex flex-wrap gap-2">
                  {DUMMY_COURIER_HUB.supportedCouriers.map((c) => (
                    <span
                      key={c.name}
                      className="text-xs bg-white/10 border border-white/10 px-3 py-1 rounded-lg text-white font-medium"
                      title={c.branchAdvice}
                    >
                      {c.name} {c.status === 'Recommended' ? '★' : ''}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="lg:col-span-4 flex flex-col gap-3 justify-center">
              <button
                type="button"
                onClick={copyAddress}
                className="w-full bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm py-3 px-4 rounded-xl border border-white/15 flex items-center justify-center gap-2 transition-all cursor-pointer"
                id="courier-copy-hub-address"
              >
                {copiedHub ? <Check className="w-4 h-4 text-[#d9ff3d]" /> : <Copy className="w-4 h-4" />}
                <span>{copiedHub ? 'Address Copied to Clipboard!' : 'Copy Hub Address for Courier'}</span>
              </button>

              <button
                type="button"
                onClick={onStartCourier}
                className="w-full bg-[#d9ff3d] hover:bg-[#cbf229] text-black font-heading font-bold text-xs sm:text-sm py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer active:scale-95"
                id="courier-book-now"
              >
                <span>Book Courier Intake</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={onOpenPackingGuide}
                className="text-xs text-[#a0a5b4] hover:text-white underline text-center py-1 cursor-pointer"
              >
                Read Safe Packaging Checklist →
              </button>
            </div>

          </div>
        </div>

        {/* Packing Notice Banner */}
        <div className="mt-8 bg-[#f0eee6] rounded-2xl border border-[#dedad0] p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#0d0f12] text-[#d9ff3d] flex items-center justify-center shrink-0">
              <Info className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-heading text-base sm:text-lg font-bold text-[#0d0f12]">
                Worried about courier handling?
              </h4>
              <p className="text-xs sm:text-sm text-[#54575f] mt-1 max-w-[620px]">
                We guide you on removing heavy GPUs (or bracing them), packaging tempered glass, and choosing trusted courier hubs (Sundarban, RedX, Steadfast, SA Paribahan).
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0 w-full sm:w-auto justify-end">
            <button
              onClick={onOpenPackingGuide}
              className="text-xs sm:text-sm font-semibold text-[#0d0f12] underline hover:text-black py-2 cursor-pointer"
            >
              Read Packing Guide
            </button>
            <button
              onClick={onStartCourier}
              className="bg-[#0d0f12] hover:bg-[#202228] text-white text-xs sm:text-sm font-semibold rounded-full px-6 py-3 flex items-center gap-2 shadow cursor-pointer transition-all"
            >
              <span>Start Courier Service</span>
              <ArrowRight className="w-4 h-4 text-[#d9ff3d]" />
            </button>
          </div>
        </div>

        {/* Small Reassurance Strip */}
        <div className="mt-6 text-center text-xs font-medium text-[#6f6e6a]">
          Carefully handled • Unboxing video on WhatsApp • 30-day warranty card in returned box
        </div>

      </div>
    </section>
  );
}
