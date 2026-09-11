import { useState } from 'react';
import { X, PackageCheck, AlertTriangle, CheckCircle2, ShieldAlert, ArrowRight, Copy, Check, MapPin } from 'lucide-react';
import { DUMMY_COURIER_HUB, formatHubAddress } from '../data/courierHub';

interface PackingGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBookCourier: () => void;
}

export function PackingGuideModal({ isOpen, onClose, onBookCourier }: PackingGuideModalProps) {
  const [copied, setCopied] = useState(false);
  if (!isOpen) return null;

  const copyAddress = () => {
    navigator.clipboard.writeText(formatHubAddress());
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#faf9f6] text-[#0d0f12] rounded-3xl border border-[#dedad0] max-w-[640px] w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#f0eee6] hover:bg-[#e4e1d7] flex items-center justify-center text-[#0d0f12] transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#0d0f12] text-[#d9ff3d] flex items-center justify-center">
            <PackageCheck className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-mono font-bold text-[#6f6e6a] uppercase">
              COURIER SAFETY PROTOCOL
            </span>
            <h3 className="font-heading text-xl sm:text-2xl font-bold text-[#0d0f12]">
              How to Pack Your PC for Courier
            </h3>
          </div>
        </div>

        {/* Official Hub Consignee Address for Parcel Box */}
        <div className="mt-4 p-4 rounded-2xl bg-[#0d0f12] text-white border border-[#2b2e37] space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-[#d9ff3d] uppercase tracking-wider flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" />
              Consignee Address for Courier Label
            </span>
            <button
              type="button"
              onClick={copyAddress}
              className="text-[11px] font-mono font-bold text-white bg-white/10 hover:bg-white/20 px-2.5 py-1 rounded-lg flex items-center gap-1 transition-all cursor-pointer"
            >
              {copied ? <Check className="w-3 h-3 text-[#d9ff3d]" /> : <Copy className="w-3 h-3" />}
              <span>{copied ? 'Copied!' : 'Copy Label'}</span>
            </button>
          </div>
          <div className="text-xs text-[#c0c5d5] leading-relaxed">
            <div className="text-white font-bold">{DUMMY_COURIER_HUB.labName}</div>
            <div>Attn: {DUMMY_COURIER_HUB.recipientName}</div>
            <div>{DUMMY_COURIER_HUB.addressLine1}, {DUMMY_COURIER_HUB.addressLine2}, {DUMMY_COURIER_HUB.city}-{DUMMY_COURIER_HUB.postalCode}</div>
            <div>Phone: <span className="font-mono text-[#d9ff3d]">{DUMMY_COURIER_HUB.phone}</span></div>
          </div>
        </div>

        <div className="mt-4 p-3.5 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
          <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <span>
            <strong>The golden rule:</strong> Don't send your valuable gaming/workstation PC wrapped in a thin polythene bag with <em>"ভাই courier মানুষ ভালো"</em>. Courier vans bounce!
          </span>
        </div>

        {/* Steps */}
        <div className="mt-5 space-y-3 text-sm text-[#3b3e44]">
          <div className="flex items-start gap-3 p-3 bg-white rounded-xl border border-[#e8e6e1]">
            <span className="w-6 h-6 rounded-full bg-[#0d0f12] text-[#d9ff3d] text-xs font-mono font-bold flex items-center justify-center shrink-0 mt-0.5">
              1
            </span>
            <div>
              <h4 className="font-bold text-[#0d0f12]">GPU Protection (Very Important)</h4>
              <p className="text-xs text-[#5f626a] mt-0.5 leading-relaxed">
                If your GPU is a heavy dual/triple-fan card (RTX 3060/3070/4070 or RX 6700), remove it and box it separately, OR pad the internal cavity with high-density anti-static foam to prevent PCIe slot snapping.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 bg-white rounded-xl border border-[#e8e6e1]">
            <span className="w-6 h-6 rounded-full bg-[#0d0f12] text-[#d9ff3d] text-xs font-mono font-bold flex items-center justify-center shrink-0 mt-0.5">
              2
            </span>
            <div>
              <h4 className="font-bold text-[#0d0f12]">Tempered Glass Panel</h4>
              <p className="text-xs text-[#5f626a] mt-0.5 leading-relaxed">
                Ensure the original Styrofoam chassis corners are on the tower. Add at least 3-4 layers of large bubble wrap around the glass panel side.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 bg-white rounded-xl border border-[#e8e6e1]">
            <span className="w-6 h-6 rounded-full bg-[#0d0f12] text-[#d9ff3d] text-xs font-mono font-bold flex items-center justify-center shrink-0 mt-0.5">
              3
            </span>
            <div>
              <h4 className="font-bold text-[#0d0f12]">Take Photos Before Sealing</h4>
              <p className="text-xs text-[#5f626a] mt-0.5 leading-relaxed">
                Take quick photos of your case from all 4 sides before sealing the box. This provides clean visual proof of condition.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 bg-white rounded-xl border border-[#e8e6e1]">
            <span className="w-6 h-6 rounded-full bg-[#0d0f12] text-[#d9ff3d] text-xs font-mono font-bold flex items-center justify-center shrink-0 mt-0.5">
              4
            </span>
            <div>
              <h4 className="font-bold text-[#0d0f12]">WhatsApp Us the Booking Slip</h4>
              <p className="text-xs text-[#5f626a] mt-0.5 leading-relaxed">
                Whether you use Sundarban, RedX, Steadfast, or SA Paribahan, send us the tracking slip on WhatsApp. We track it directly to our Banani lab.
              </p>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-6 pt-4 border-t border-[#dedad0] flex items-center justify-between gap-4">
          <button
            onClick={onClose}
            className="text-xs font-semibold text-[#5a5d64] hover:text-black py-2 px-3 cursor-pointer"
          >
            Close
          </button>

          <button
            onClick={() => {
              onClose();
              onBookCourier();
            }}
            className="bg-[#0d0f12] hover:bg-[#202329] text-white text-xs sm:text-sm font-semibold rounded-full px-6 py-2.5 flex items-center gap-2 cursor-pointer shadow"
          >
            <span>Book Courier Intake</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#d9ff3d]" />
          </button>
        </div>

      </div>
    </div>
  );
}
