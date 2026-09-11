import { useState, useEffect, useRef } from 'react';
import { Terminal, Phone, Menu, X, ArrowRight, MessageSquare, ChevronDown } from 'lucide-react';

interface NavbarProps {
  onBookClick: () => void;
}

export function Navbar({ onBookClick }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [callDropdownOpen, setCallDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setCallDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { label: 'Services', href: '#services' },
    { label: 'Quiz', href: '#quiz' },
    { label: 'Health Score', href: '#health-score' },
    { label: 'Why Us', href: '#why-us' },
    { label: 'Courier Hub', href: '#courier' },
    { label: 'Reviews', href: '#reviews' },
  ];

  const handleLinkClick = (href: string) => {
    setMobileMenuOpen(false);
    setCallDropdownOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="sticky top-2 sm:top-3 z-50 w-full px-3 sm:px-6 pointer-events-none">
      <header
        className="max-w-[1140px] mx-auto bg-white/80 backdrop-blur-xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.06)] rounded-full px-3.5 sm:px-5 py-2 sm:py-2.5 flex items-center justify-between pointer-events-auto transition-all"
        id="main-glass-navbar"
      >
        {/* Brand */}
        <a
          href="#"
          className="flex items-center gap-2.5 group pl-1.5"
          id="navbar-brand-logo"
        >
          <div className="w-8 h-8 sm:w-9 sm:h-9 bg-[#0d0f12] rounded-full flex items-center justify-center text-[#d9ff3d] shadow-sm transition-transform group-hover:scale-105">
            <Terminal className="w-4 h-4 stroke-[2.5]" />
          </div>
          <div className="flex flex-col">
            <span className="font-heading text-base sm:text-lg font-bold tracking-tight text-[#0d0f12] leading-none">
              PCDecode
            </span>
            <span className="text-[10px] font-mono text-[#787b84] hidden sm:block">
              Dhaka + Courier
            </span>
          </div>
        </a>

        {/* Simplified Center Navigation Links */}
        <nav className="hidden lg:flex items-center gap-5 text-xs font-semibold text-[#3b3e45]">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleLinkClick(link.href)}
              className="text-[#4e5159] hover:text-[#0d0f12] transition-colors py-1 cursor-pointer"
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Right 2 CTAs: 1> Call Us (with WhatsApp / Phone dropdown) 2> Book a Service */}
        <div className="hidden sm:flex items-center gap-2.5">
          
          {/* CTA 1: Call Us (Dropdown with 2 options) */}
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setCallDropdownOpen(!callDropdownOpen)}
              className="bg-white/90 hover:bg-white text-[#0d0f12] border border-[#e2dfd5] text-xs font-semibold rounded-full px-3.5 py-2 flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
              id="navbar-call-us-btn"
              aria-expanded={callDropdownOpen}
            >
              <Phone className="w-3.5 h-3.5 text-[#0d0f12]" />
              <span>Call Us</span>
              <ChevronDown className={`w-3 h-3 text-[#6e7178] transition-transform ${callDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Glassmorphic Call Options Dropdown */}
            {callDropdownOpen && (
              <div
                className="absolute right-0 mt-2 w-64 bg-white/95 backdrop-blur-2xl border border-[#dedad0] rounded-2xl shadow-xl p-2 z-50 animate-fadeIn space-y-1"
                id="navbar-call-dropdown"
              >
                <div className="px-3 py-1.5 text-[11px] font-mono font-bold text-[#71747d] uppercase tracking-wider">
                  Select Contact Channel
                </div>

                {/* Option A: WhatsApp */}
                <a
                  href="https://wa.me/8801700000000?text=Hello%20PCDecode!%20I%20have%20a%20question%20about%20my%20PC."
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setCallDropdownOpen(false)}
                  className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-[#f2faf4] text-[#0d0f12] transition-colors group"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#25D366] text-white flex items-center justify-center shrink-0 shadow-sm">
                    <MessageSquare className="w-4 h-4 fill-current" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-bold text-[#0d0f12] group-hover:text-emerald-700 flex items-center justify-between">
                      <span>WhatsApp Chat</span>
                      <span className="text-[10px] text-emerald-600 font-mono font-bold">Active</span>
                    </div>
                    <div className="text-[11px] text-[#696d76] truncate">
                      Fastest reply (15 mins)
                    </div>
                  </div>
                </a>

                {/* Option B: Direct Phone Call */}
                <a
                  href="tel:+8801700000000"
                  onClick={() => setCallDropdownOpen(false)}
                  className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-[#f6f5f0] text-[#0d0f12] transition-colors group"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#0d0f12] text-[#d9ff3d] flex items-center justify-center shrink-0 shadow-sm">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-bold text-[#0d0f12] group-hover:text-black flex items-center justify-between">
                      <span>Direct Phone Call</span>
                      <span className="text-[10px] text-[#696d76] font-mono">24/7</span>
                    </div>
                    <div className="text-[11px] text-[#696d76] truncate font-mono">
                      +880 1700-000000
                    </div>
                  </div>
                </a>
              </div>
            )}
          </div>

          {/* CTA 2: Book a Service */}
          <button
            onClick={onBookClick}
            className="bg-[#0d0f12] hover:bg-[#22252a] text-white text-xs sm:text-sm font-semibold rounded-full px-4 sm:px-5 py-2 transition-all flex items-center gap-1.5 shadow-sm cursor-pointer active:scale-95"
            id="nav-cta-book-service"
          >
            <span>Book a Service</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#d9ff3d]" />
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex items-center gap-2 sm:hidden">
          <button
            onClick={onBookClick}
            className="bg-[#0d0f12] text-white text-[11px] font-semibold rounded-full px-3 py-1.5 flex items-center gap-1"
          >
            <span>Book</span>
            <ArrowRight className="w-3 h-3 text-[#d9ff3d]" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 text-[#0d0f12] rounded-full hover:bg-neutral-200"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer (Rounded Glassmorphic) */}
      {mobileMenuOpen && (
        <div
          className="sm:hidden mt-2 max-w-[1140px] mx-auto bg-white/95 backdrop-blur-2xl border border-white/80 rounded-3xl p-5 shadow-2xl space-y-4 pointer-events-auto animate-fadeIn"
          id="mobile-glass-nav"
        >
          {/* Quick 2 CTAs inside Mobile Drawer */}
          <div className="space-y-2 pb-3 border-b border-[#e8e6e1]">
            <div className="text-[11px] font-mono font-bold text-[#6f727b] uppercase">
              1. Contact PCDecode
            </div>
            <div className="grid grid-cols-2 gap-2">
              <a
                href="https://wa.me/8801700000000?text=Hello%20PCDecode!%20I%20have%20a%20question%20about%20my%20PC."
                target="_blank"
                rel="noreferrer"
                className="bg-[#25D366]/10 text-emerald-800 border border-emerald-300 rounded-xl py-2 px-3 text-xs font-bold flex items-center justify-center gap-1.5"
              >
                <MessageSquare className="w-3.5 h-3.5 text-emerald-600 fill-current" />
                <span>WhatsApp</span>
              </a>
              <a
                href="tel:+8801700000000"
                className="bg-[#f0eee6] text-[#0d0f12] border border-[#dedad0] rounded-xl py-2 px-3 text-xs font-bold flex items-center justify-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Phone Call</span>
              </a>
            </div>

            <div className="pt-2">
              <div className="text-[11px] font-mono font-bold text-[#6f727b] uppercase mb-1">
                2. Instant Appointment
              </div>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onBookClick();
                }}
                className="w-full bg-[#0d0f12] text-white text-xs font-bold py-2.5 rounded-xl flex items-center justify-center gap-1.5"
              >
                <span>Book a Service</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#d9ff3d]" />
              </button>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col gap-1 text-sm font-medium text-[#2d3036]">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleLinkClick(link.href)}
                className="text-left py-2 px-2 rounded-lg hover:bg-[#f4f2ea] transition-colors"
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-[#e8e6e1] text-[11px] text-[#71747d] text-center">
            24/7 Support • Doorstep in Dhaka + Nationwide Courier
          </div>
        </div>
      )}
    </div>
  );
}
