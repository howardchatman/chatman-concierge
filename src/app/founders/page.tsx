'use client';

import Link from 'next/link';

const founders = [
  {
    name: 'Howard Chatman',
    title: 'Founder & CEO',
    image: '/founders/howard.jpg',
    bio: 'Howard Chatman is the founder and CEO of Chatman Concierge, where he leads the vision for AI-powered private estate operations. With a background in enterprise technology and luxury service delivery, Howard architects the systems that allow high-net-worth estate owners to delegate with confidence — from perimeter security to vendor coordination to proactive household intelligence.',
    highlights: [
      'Architect of the Chatman Concierge platform — integrating physical security, cloud-based estate management, and AI-driven decision support into a single discreet operations layer.',
      'Leads product strategy, engineering direction, and client relationships across residential and commercial estate portfolios.',
      'Background in systems architecture, automation, and enterprise integration — applied to the unique demands of private estate management.',
    ],
  },
  {
    name: 'Ecko Steadman',
    title: 'Co-Founder & Head of Product Growth & Human Experience',
    image: '/founders/ecko.jpg',
    bio: 'Ecko Steadman is the Co-Founder and Head of Product Growth & Human Experience at Chatman Concierge, responsible for product positioning, sales narrative, pricing psychology, demo experience, and go-to-market strategy for an AI-powered follow-up and client experience platform serving estate and industry professionals.',
    highlights: [
      'Designed and led identity-based wellness programs integrating education, embodiment, and habit design — advising and coaching 100+ women toward sustainable behavior change rather than short-term outcomes.',
      'Developed and launched a top-performing wellness product, applying emotionally intelligent positioning and community-driven marketing to drive organic sales both online and in physical fitness spaces.',
      'Built and facilitated a digital-first wellness community supported by guided practices, ritual-based experiences, and reflective programming — creating psychological safety, consistency, and long-term engagement.',
      'Translated complex health, trauma-awareness, and self-regulation concepts into accessible, weekly digital content — strengthening trust, retention, and brand visibility through human-centered communication.',
      'Led curriculum development, instructional design, and high-stakes documentation across public education, federal agencies, and community-based programs — translating complex requirements into clear, human-centered systems that drive performance, retention, and compliance.',
      'Designed and implemented differentiated curricula and learning experiences for diverse populations, maintaining strong performance metrics while fostering psychological safety, engagement, and long-term skill development.',
      'Integrated digital tools, instructional frameworks, and process documentation to support learning outcomes, staff alignment, and operational consistency across classrooms, teams, and programs.',
      'Applied coaching, facilitation, and communication strategy through academic instruction, youth leadership programs, and athletic coaching — building trust, discipline, and team cohesion in high-accountability settings.',
    ],
  },
];

export default function FoundersPage() {
  return (
    <div className="min-h-screen bg-obsidian">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-obsidian/80 backdrop-blur-md border-b border-border/40">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-lg font-serif italic text-white hover:text-[#C9B370] transition-colors">
            Chatman Concierge
          </Link>
          <Link
            href="/"
            className="text-xs text-silver-400 hover:text-[#C9B370] transition-colors uppercase tracking-wider"
          >
            Back to Home
          </Link>
        </div>
      </nav>

      {/* Header */}
      <header className="pt-32 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs font-medium text-[#C9B370] uppercase tracking-[0.2em] mb-4">
            Leadership
          </p>
          <h1 className="hero-display text-4xl md:text-6xl text-white mb-6">
            Our Founders
          </h1>
          <p className="text-silver-400 text-lg max-w-2xl mx-auto leading-relaxed">
            The team building the future of private estate intelligence — where discretion meets technology.
          </p>
        </div>
      </header>

      {/* Founders */}
      <section className="px-6 pb-24">
        <div className="max-w-5xl mx-auto space-y-20">
          {founders.map((founder, index) => (
            <article
              key={founder.name}
              className={`flex flex-col ${index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-10 md:gap-14 items-start`}
            >
              {/* Photo */}
              <div className="w-full md:w-80 shrink-0">
                <div className="aspect-[3/4] rounded-2xl bg-surface-elevated border border-border overflow-hidden">
                  <div
                    className="w-full h-full bg-cover bg-center bg-surface-overlay"
                    style={{ backgroundImage: `url(${founder.image})` }}
                  />
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="mb-6">
                  <h2 className="hero-display text-3xl md:text-4xl text-white mb-2">
                    {founder.name}
                  </h2>
                  <p className="text-sm text-[#C9B370] font-medium tracking-wide">
                    {founder.title}
                  </p>
                </div>

                <p className="text-silver-300 leading-relaxed mb-8">
                  {founder.bio}
                </p>

                <ul className="space-y-4">
                  {founder.highlights.map((highlight, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#C9B370]/60 shrink-0" />
                      <span className="text-sm text-silver-400 leading-relaxed">
                        {highlight}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Footer CTA */}
      <section className="border-t border-border px-6 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-silver-500 text-sm mb-4">
            Ready to experience estate operations done differently?
          </p>
          <Link
            href="/#contact"
            className="inline-block bg-[#C9B370] hover:bg-[#B8A460] text-obsidian px-8 py-3 rounded-xl text-sm font-medium transition-colors"
          >
            Request Access
          </Link>
        </div>
      </section>
    </div>
  );
}
