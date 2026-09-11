import { X, Phone, MessageSquare, MapPin, Clock, Shield } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBookClick: () => void;
}

export function ContactModal({ isOpen, onClose, onBookClick }: ContactModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white text-[#0d0f12] rounded-3xl border border-[#dedad0] max-w-[500px] w-full p-6 sm:p-8 shadow-2xl relative">
        
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#f6f5f0] hover:bg-[#e8e6e1] flex items-center justify-center text-[#0d0f12] transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <span className="text-[11px] font-mono font-bold text-[#6f6e6a] uppercase">
          DIRECT CONTACT
        </span>
        <h3 className="font-heading text-2xl font-bold text-[#0d0f12] mt-1">
          Talk to PCDecode
        </h3>
        <p className="text-xs sm:text-sm text-[#52555c] mt-1.5 leading-relaxed">
          Need quick advice or want to discuss strange sounds from your PC before booking? We are here 24/7.
        </p>

        {/* Contact Channels */}
        <div className="mt-6 space-y-3">
          <a
            href="https://wa.me/8801700000000?text=Hello%20PCDecode,%20I%20have%20a%20question%20about%20my%20PC"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-between p-4 rounded-xl bg-[#f5fbf7] border border-[#d2edd9] hover:bg-[#eaf7ee] transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#25D366] text-black flex items-center justify-center font-bold">
                <MessageSquare className="w-5 h-5 fill-current text-white" />
              </div>
              <div>
                <div className="text-sm font-bold text-[#0d0f12]">WhatsApp Helpdesk</div>
                <div className="text-xs text-[#52555c]">Fastest reply (within 15 mins)</div>
              </div>
            </div>
            <span className="text-xs font-mono font-bold text-emerald-700 bg-white px-2.5 py-1 rounded-md border border-emerald-200">
              Online
            </span>
          </a>

          <a
            href="tel:+8801700000000"
            className="flex items-center justify-between p-4 rounded-xl bg-[#faf9f6] border border-[#e8e6e1] hover:bg-[#f2efe6] transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#0d0f12] text-[#d9ff3d] flex items-center justify-center font-bold">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-bold text-[#0d0f12]">Direct Phone Call</div>
                <div className="text-xs text-[#52555c]">+880 1700-000000</div>
              </div>
            </div>
            <span className="text-xs font-mono text-[#0d0f12] bg-white px-2.5 py-1 rounded-md border border-[#e8e6e1]">
              Call
            </span>
          </a>
        </div>

        {/* Coverage Notes */}
        <div className="mt-6 p-3.5 bg-[#f6f5f0] rounded-xl border border-[#e8e6e1] text-xs text-[#575a61] space-y-1.5">
          <div className="flex items-center gap-1.5 font-bold text-[#0d0f12]">
            <MapPin className="w-3.5 h-3.5" />
            <span>Service Coverage</span>
          </div>
          <p>• <strong>Dhaka Home Service:</strong> Mirpur, Uttara, Dhanmondi, Gulshan, Banani, Bashundhara, Mohammadpur, Khilgaon, Badda, Old Dhaka.</p>
          <p>• <strong>Nationwide Courier:</strong> Chittagong, Sylhet, Rajshahi, Khulna, Barishal, Rangpur & all upazilas.</p>
        </div>

        {/* Action */}
        <div className="mt-6 pt-3 flex items-center justify-between">
          <button
            onClick={onClose}
            className="text-xs font-semibold text-[#6f6e6a] hover:text-black py-2 px-3 cursor-pointer"
          >
            Close
          </button>
          <button
            onClick={() => {
              onClose();
              onBookClick();
            }}
            className="bg-[#0d0f12] hover:bg-[#202329] text-white text-xs sm:text-sm font-semibold rounded-full px-6 py-2.5 cursor-pointer shadow"
          >
            Book a Service Instead
          </button>
        </div>

      </div>
    </div>
  );
}
