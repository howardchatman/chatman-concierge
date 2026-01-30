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
        backgroundImage="/cc_h1.png"
        gradientDirection="center"
        isFirst
      >
        {/* App Login Link */}
        <a
          href="https://app.chatmanconcierge.com"
          className="absolute bottom-6 right-6 z-20 flex items-center gap-2 px-4 py-2 rounded-xl bg-surface/80 backdrop-blur-sm border border-border/60 text-xs text-silver-400 hover:text-[#C9B370] hover:border-[#C9B370]/30 transition-all duration-200"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
          </svg>
          Client Login
        </a>
        <div className="flex flex-col items-center justify-center text-center px-6">
          <p className="overline mb-6 text-silver-400">Chatman Concierge</p>
          <h1 className="hero-display text-6xl md:text-8xl lg:text-9xl text-white mb-8">
            We do <span className="text-[#C9B370]">Everything.</span>
          </h1>
          <p className="text-lg md:text-xl text-silver-300 max-w-2xl mb-12">
            Private estate operations for those who expect nothing less than exceptional.
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
        backgroundImage="/cc_h2.png"
        gradientDirection="bottom"
      >
        <div className="flex flex-col items-center justify-center text-center px-6">
          <p className="overline mb-4 text-[#C9B370]">Chief of Security</p>
          <h2 className="hero-display text-7xl md:text-8xl lg:text-[10rem] text-white mb-6">
            Let's
          </h2>
          <p className="text-lg text-silver-400 max-w-xl mb-12">
            Your physical layer. Smart perimeter monitoring, biometric access,
            and incident response—all orchestrated invisibly.
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

      {/* Panel 3: Service - "Make" */}
      <SnapSection
        id="service"
        backgroundImage="/cc_h3.png"
        gradientDirection="bottom"
      >
        <div className="flex flex-col items-center justify-center text-center px-6">
          <p className="overline mb-4 text-[#C9B370]">Chief of Staff</p>
          <h2 className="hero-display text-7xl md:text-8xl lg:text-[10rem] text-white mb-6">
            Make
          </h2>
          <p className="text-lg text-silver-400 max-w-xl mb-12">
            Your cloud layer. Vendor coordination, schedule management,
            and proactive concierge—anticipating your needs before you ask.
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

      {/* Panel 4: Arrival - "It Happen." */}
      <SnapSection
        id="arrival"
        backgroundImage="/cc_h4.png"
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
        backgroundImage="/cc_h5.png"
        gradientDirection="center"
        className="!items-start overflow-y-auto"
      >
        <div className="w-full flex items-start justify-center py-8 px-6">
          <div className="w-full max-w-lg">
            <div className="text-center mb-8">
              <p className="overline mb-3 text-[#C9B370]">Private Access</p>
              <h2 className="hero-display text-3xl md:text-4xl text-white mb-3">
                Request Access
              </h2>
              <p className="text-silver-400 text-sm leading-relaxed max-w-sm mx-auto">
                Tell us what you&apos;re overseeing — our concierge will coordinate next steps discreetly.
              </p>
            </div>
            <div className="bg-obsidian/80 backdrop-blur-md border border-border/60 rounded-2xl p-6 md:p-8">
              <AccessForm />
            </div>
          </div>
        </div>
        {/* App Login Link */}
        <a
          href="https://app.chatmanconcierge.com"
          className="absolute bottom-6 right-6 z-20 flex items-center gap-2 px-4 py-2 rounded-xl bg-surface/80 backdrop-blur-sm border border-border/60 text-xs text-silver-400 hover:text-[#C9B370] hover:border-[#C9B370]/30 transition-all duration-200"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
          </svg>
          Client Login
        </a>
      </SnapSection>
    </div>
  );
}
