import { useState } from 'react';
import { BookingFormData } from './types';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TrustStrip } from './components/TrustStrip';
import { ProblemIntro } from './components/ProblemIntro';
import { EducationalStory } from './components/EducationalStory';
import { ServicesSection } from './components/ServicesSection';
import { WhyUsSection } from './components/WhyUsSection';
import { ProcessSection } from './components/ProcessSection';
import { CourierSection } from './components/CourierSection';
import { ReviewsSection } from './components/ReviewsSection';
import { WarrantyTrustSection } from './components/WarrantyTrustSection';
import { BookingSection } from './components/BookingSection';
import { FinalCTASection } from './components/FinalCTASection';
import { Footer } from './components/Footer';
import { PackingGuideModal } from './components/PackingGuideModal';
import { BookingConfirmationModal } from './components/BookingConfirmationModal';
import { ContactModal } from './components/ContactModal';

export default function App() {
  const [selectedService, setSelectedService] = useState<string>('Deep Cleaning');
  const [confirmedBooking, setConfirmedBooking] = useState<BookingFormData | null>(null);
  const [isPackingGuideOpen, setIsPackingGuideOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const scrollToBooking = (serviceName?: string) => {
    if (serviceName) {
      setSelectedService(serviceName);
    }
    const bookingEl = document.getElementById('booking');
    if (bookingEl) {
      bookingEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToServices = () => {
    const servicesEl = document.getElementById('services');
    if (servicesEl) {
      servicesEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleBookingSuccess = (booking: BookingFormData) => {
    setConfirmedBooking(booking);
  };

  return (
    <div className="min-h-screen bg-[#faf9f6] text-[#0d0f12] flex flex-col font-sans selection:bg-[#d9ff3d] selection:text-black">
      
      <CustomCursor />

      {/* 01. NAVBAR (Rounded Glassmorphic with 2 CTAs) */}
      <Navbar onBookClick={() => scrollToBooking()} />

      <main className="flex-1">
        {/* 02. HERO */}
        <Hero
          onBookClick={() => scrollToBooking()}
          onExploreClick={scrollToServices}
        />

        {/* 03. EDUCATIONAL STORY */}
        <EducationalStory />

        {/* 04. TRUST STRIP */}
        <TrustStrip />

        {/* 05. PROBLEM INTRO / SYMPTOMS */}
        <ProblemIntro onBookClick={() => scrollToBooking('Hardware Diagnostics')} />

        {/* 06. SERVICES */}
        <ServicesSection
          onSelectService={(serviceName) => scrollToBooking(serviceName)}
        />

        {/* 06. WHY PCDECODE */}
        <WhyUsSection />

        {/* 08. PROCESS */}
        <ProcessSection />

        {/* 09. COURIER SERVICE */}
        <CourierSection
          onStartCourier={() => scrollToBooking('Hardware Diagnostics')}
          onOpenPackingGuide={() => setIsPackingGuideOpen(true)}
        />

        {/* 10. REVIEWS */}
        <ReviewsSection />

        {/* 11. WARRANTY / TRUST */}
        <WarrantyTrustSection />

        {/* 12. BOOKING */}
        <BookingSection
          preselectedService={selectedService}
          onBookingSuccess={handleBookingSuccess}
        />

        {/* 13. FINAL CTA */}
        <FinalCTASection
          onBookClick={() => scrollToBooking()}
          onTalkClick={() => setIsContactModalOpen(true)}
        />
      </main>

      {/* 14. FOOTER */}
      <Footer
        onBookClick={() => scrollToBooking()}
        onOpenPackingGuide={() => setIsPackingGuideOpen(true)}
        onOpenContact={() => setIsContactModalOpen(true)}
      />

      {/* MODALS */}
      <PackingGuideModal
        isOpen={isPackingGuideOpen}
        onClose={() => setIsPackingGuideOpen(false)}
        onBookCourier={() => {
          setIsPackingGuideOpen(false);
          scrollToBooking('Hardware Diagnostics');
        }}
      />

      <BookingConfirmationModal
        booking={confirmedBooking}
        onClose={() => setConfirmedBooking(null)}
      />

      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        onBookClick={() => {
          setIsContactModalOpen(false);
          scrollToBooking();
        }}
      />

    </div>
  );
}
