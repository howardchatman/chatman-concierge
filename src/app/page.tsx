'use client';

import SnapSection from '@/components/landing/SnapSection';
import AccessForm from '@/components/landing/AccessForm';
import ProgressDots from '@/components/landing/ProgressDots';

const SECTION_IDS = ['hero', 'security', 'service', 'arrival', 'contact'];

export default function LandingPage() {
  const scrollToNext = () => {
    const container = document.querySelector('.snap-container');
    if (!container) return;
    const sectionHeight = window.innerHeight;
    container.scrollTo({
      top: container.scrollTop + sectionHeight,
      behavior: 'smooth',
    });
  };

  return (
    <div className="snap-container">
      <ProgressDots totalSections={5} sectionIds={SECTION_IDS} />

      {/* Panel 1: Hero - "We do Everything." */}
      <SnapSection
        id="hero"
        backgroundImage="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2000&q=80"
        gradientDirection="center"
        isFirst
      >
        <div className="flex flex-col items-center justify-center text-center px-6">
          <p className="overline mb-6 text-silver-400">Chatman Concierge</p>
          <h1 className="hero-display text-6xl md:text-8xl lg:text-9xl text-white mb-8">
            We do <span className="text-[#C9B370]">Everything.</span>
          </h1>
          <p className="text-lg md:text-xl text-silver-300 max-w-2xl mb-12">
            Comprehensive estate management for those who expect nothing less than exceptional.
          </p>
          <button
            onClick={scrollToNext}
            className="animate-bounce-hint text-silver-400 hover:text-white transition-colors"
            aria-label="Scroll to next section"
          >
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </button>
        </div>
      </SnapSection>

      {/* Panel 2: Security - "Let's" */}
      <SnapSection
        id="security"
        backgroundImage="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=2000&q=80"
        gradientDirection="bottom"
      >
        <div className="flex flex-col items-center justify-center text-center px-6">
          <p className="overline mb-4 text-[#C9B370]">Chief of Security</p>
          <h2 className="hero-display text-7xl md:text-8xl lg:text-[10rem] text-white mb-6">
            Let's
          </h2>
          <p className="text-lg text-silver-400 max-w-xl">
            Your physical layer. Smart perimeter monitoring, biometric access,
            and incident response—all orchestrated invisibly.
          </p>
        </div>
      </SnapSection>

      {/* Panel 3: Service - "Make" */}
      <SnapSection
        id="service"
        backgroundImage="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=2000&q=80"
        gradientDirection="bottom"
      >
        <div className="flex flex-col items-center justify-center text-center px-6">
          <p className="overline mb-4 text-[#C9B370]">Chief of Staff</p>
          <h2 className="hero-display text-7xl md:text-8xl lg:text-[10rem] text-white mb-6">
            Make
          </h2>
          <p className="text-lg text-silver-400 max-w-xl">
            Your cloud layer. Vendor coordination, schedule management,
            and proactive concierge—anticipating your needs before you ask.
          </p>
        </div>
      </SnapSection>

      {/* Panel 4: Arrival - "It Happen." */}
      <SnapSection
        id="arrival"
        backgroundImage="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=80"
        gradientDirection="bottom"
      >
        <div className="flex flex-col items-center justify-center text-center px-6">
          <p className="overline mb-4 text-silver-400">Complete Estate Intelligence</p>
          <h2 className="hero-display text-7xl md:text-8xl lg:text-[10rem] text-white mb-8">
            It Happen.
          </h2>
          <p className="text-lg text-silver-400 max-w-xl mb-12">
            From the moment you leave to the instant you arrive—every detail, handled.
          </p>
          <button
            onClick={scrollToNext}
            className="animate-bounce-hint flex flex-col items-center gap-2 text-silver-400 hover:text-white transition-colors"
            aria-label="Scroll to contact form"
          >
            <span className="text-sm uppercase tracking-wider">Request Access</span>
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </button>
        </div>
      </SnapSection>

      {/* Panel 5: Contact Form */}
      <SnapSection
        id="contact"
        backgroundImage="https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=2000&q=80"
        gradientDirection="center"
        className="!items-start"
      >
        <div className="w-full min-h-screen flex items-center justify-center py-16 px-6">
          <div className="w-full max-w-lg">
            <div className="text-center mb-10">
              <p className="overline mb-3 text-[#C9B370]">Begin Your Journey</p>
              <h2 className="hero-display text-4xl md:text-5xl text-white mb-4">
                Request Access
              </h2>
              <p className="text-silver-400">
                Tell us about your estate and how we can serve you.
              </p>
            </div>
            <div className="bg-surface/80 backdrop-blur-md border border-border rounded-2xl p-8">
              <AccessForm />
            </div>
          </div>
        </div>
      </SnapSection>
    </div>
  );
}
