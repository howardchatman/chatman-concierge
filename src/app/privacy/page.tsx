import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-obsidian">
      <div className="absolute inset-0 bg-gradient-subtle pointer-events-none" />

      <div className="relative max-w-3xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="mb-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs text-silver-500 hover:text-[#C9B370] transition-colors mb-8"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Back to Chatman Concierge
          </Link>
          <p className="overline mb-3 text-[#C9B370]">Legal</p>
          <h1 className="font-serif text-4xl text-text mb-4">Privacy Policy</h1>
          <p className="text-silver-500 text-sm">Last updated: January 30, 2026</p>
        </div>

        {/* Content */}
        <div className="space-y-10 text-silver-300 text-sm leading-relaxed">
          <section>
            <h2 className="font-serif text-xl text-text mb-4">1. Introduction</h2>
            <p>
              Chatman Concierge (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) is committed to protecting the privacy and confidentiality of our clients. This Privacy Policy describes how we collect, use, disclose, and safeguard your information when you visit our website, use our platform, or engage our concierge and estate management services.
            </p>
            <p className="mt-3">
              We understand the sensitive nature of private estate operations. Discretion is foundational to everything we do, and this policy reflects that commitment.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-text mb-4">2. Information We Collect</h2>

            <h3 className="text-text font-medium mb-2">Personal Information</h3>
            <p className="mb-3">When you request access to our services, we may collect:</p>
            <ul className="list-disc list-inside space-y-1.5 text-silver-400 ml-2">
              <li>Full name and contact information (email, phone number)</li>
              <li>Residential and property addresses</li>
              <li>Household composition details (as voluntarily provided)</li>
              <li>Property and estate details</li>
              <li>Service preferences and operational requirements</li>
              <li>Company or organization name (for commercial properties)</li>
            </ul>

            <h3 className="text-text font-medium mb-2 mt-6">Account Information</h3>
            <p className="mb-3">For registered clients accessing our platform:</p>
            <ul className="list-disc list-inside space-y-1.5 text-silver-400 ml-2">
              <li>Login credentials (email and encrypted password)</li>
              <li>Account activity and session data</li>
              <li>Service requests, tickets, and communication history</li>
              <li>Security system status and incident reports</li>
            </ul>

            <h3 className="text-text font-medium mb-2 mt-6">Automatically Collected Information</h3>
            <ul className="list-disc list-inside space-y-1.5 text-silver-400 ml-2">
              <li>IP address and browser type</li>
              <li>Device information and operating system</li>
              <li>Pages visited and time spent on our platform</li>
              <li>Cookies and similar tracking technologies</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-xl text-text mb-4">3. How We Use Your Information</h2>
            <p className="mb-3">We use the information we collect to:</p>
            <ul className="list-disc list-inside space-y-1.5 text-silver-400 ml-2">
              <li>Provide, operate, and maintain our concierge and estate management services</li>
              <li>Process access requests and onboard new clients</li>
              <li>Coordinate vendor operations, staffing, and property management</li>
              <li>Monitor and manage security systems on your behalf</li>
              <li>Communicate with you regarding service updates, schedules, and incidents</li>
              <li>Improve and personalize your experience on our platform</li>
              <li>Comply with legal obligations and protect our legal rights</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-xl text-text mb-4">4. Information Sharing &amp; Disclosure</h2>
            <p className="mb-3">
              We do not sell, trade, or rent your personal information. We may share information only in the following limited circumstances:
            </p>
            <ul className="list-disc list-inside space-y-1.5 text-silver-400 ml-2">
              <li><span className="text-silver-300">Service Providers:</span> Trusted vendors and contractors engaged to perform estate operations on your behalf, limited to information necessary for service delivery</li>
              <li><span className="text-silver-300">Security Partners:</span> Licensed security professionals involved in property protection, under strict confidentiality agreements</li>
              <li><span className="text-silver-300">Legal Requirements:</span> When required by law, subpoena, or government request</li>
              <li><span className="text-silver-300">Safety:</span> To protect the safety, rights, or property of our clients, staff, or the public</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-xl text-text mb-4">5. Data Security</h2>
            <p>
              We implement industry-standard security measures to protect your personal information, including:
            </p>
            <ul className="list-disc list-inside space-y-1.5 text-silver-400 ml-2 mt-3">
              <li>End-to-end encryption for data in transit (TLS/SSL)</li>
              <li>Encrypted storage for sensitive data at rest</li>
              <li>Secure authentication with hashed passwords (bcrypt)</li>
              <li>Role-based access controls limiting data exposure</li>
              <li>Regular security audits and vulnerability assessments</li>
              <li>Strict employee and contractor confidentiality agreements</li>
            </ul>
            <p className="mt-3">
              While no method of electronic transmission or storage is 100% secure, we are committed to maintaining the highest level of protection appropriate for the sensitivity of the information we handle.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-text mb-4">6. Data Retention</h2>
            <p>
              We retain your personal information for as long as necessary to provide our services and fulfill the purposes outlined in this policy. Upon termination of services, we will securely delete or anonymize your data within 90 days, unless retention is required by law or for legitimate business purposes (such as maintaining financial records).
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-text mb-4">7. Your Rights</h2>
            <p className="mb-3">Depending on your jurisdiction, you may have the right to:</p>
            <ul className="list-disc list-inside space-y-1.5 text-silver-400 ml-2">
              <li>Access the personal information we hold about you</li>
              <li>Request correction of inaccurate or incomplete data</li>
              <li>Request deletion of your personal information</li>
              <li>Object to or restrict certain processing of your data</li>
              <li>Request a portable copy of your data</li>
              <li>Withdraw consent where processing is based on consent</li>
            </ul>
            <p className="mt-3">
              To exercise any of these rights, contact us at <a href="mailto:privacy@chatmanconcierge.com" className="text-[#C9B370] hover:text-[#D4C28A] transition-colors">privacy@chatmanconcierge.com</a>.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-text mb-4">8. Cookies</h2>
            <p>
              We use essential cookies to maintain your authenticated session on our platform. We do not use third-party advertising cookies or trackers. You may configure your browser to refuse cookies, but this may affect your ability to use certain features of our platform.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-text mb-4">9. Third-Party Services</h2>
            <p>
              Our platform may integrate with third-party services (such as communication tools, scheduling systems, or security monitoring providers). These services have their own privacy policies, and we encourage you to review them. We are not responsible for the practices of third-party services.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-text mb-4">10. Children&apos;s Privacy</h2>
            <p>
              Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children. If we become aware that we have collected information from a child, we will promptly delete it.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-text mb-4">11. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify registered clients of material changes via email or through our platform. The &ldquo;Last updated&rdquo; date at the top of this page indicates when the policy was last revised.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-text mb-4">12. Contact Us</h2>
            <p>
              If you have questions or concerns about this Privacy Policy or our data practices, please contact us:
            </p>
            <div className="mt-4 bg-surface border border-border rounded-xl p-6">
              <p className="text-text font-medium mb-1">Chatman Concierge</p>
              <p className="text-silver-400">Email: <a href="mailto:privacy@chatmanconcierge.com" className="text-[#C9B370] hover:text-[#D4C28A] transition-colors">privacy@chatmanconcierge.com</a></p>
              <p className="text-silver-400">Web: <a href="https://chatmanconcierge.com" className="text-[#C9B370] hover:text-[#D4C28A] transition-colors">chatmanconcierge.com</a></p>
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-border">
          <div className="flex items-center justify-between text-xs text-silver-600">
            <p>&copy; {new Date().getFullYear()} Chatman Concierge. All rights reserved.</p>
            <Link href="/terms" className="text-silver-500 hover:text-[#C9B370] transition-colors">
              Terms of Service →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
