import Link from 'next/link';

export default function TermsPage() {
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
          <h1 className="font-serif text-4xl text-text mb-4">Terms of Service</h1>
          <p className="text-silver-500 text-sm">Last updated: January 30, 2026</p>
        </div>

        {/* Content */}
        <div className="space-y-10 text-silver-300 text-sm leading-relaxed">
          <section>
            <h2 className="font-serif text-xl text-text mb-4">1. Agreement to Terms</h2>
            <p>
              By accessing or using the Chatman Concierge website, platform, and services (collectively, the &ldquo;Services&rdquo;), you agree to be bound by these Terms of Service (&ldquo;Terms&rdquo;). If you do not agree to these Terms, you may not access or use the Services.
            </p>
            <p className="mt-3">
              These Terms constitute a legally binding agreement between you and Chatman Concierge (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;). We may update these Terms from time to time, and your continued use of the Services constitutes acceptance of any changes.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-text mb-4">2. Description of Services</h2>
            <p>
              Chatman Concierge provides private estate operations, concierge management, security coordination, and property oversight services. Our platform enables clients to:
            </p>
            <ul className="list-disc list-inside space-y-1.5 text-silver-400 ml-2 mt-3">
              <li>Monitor and manage estate security systems</li>
              <li>Coordinate vendor operations and staff scheduling</li>
              <li>Submit and track service requests</li>
              <li>Access AI-powered concierge assistance</li>
              <li>Review property status, budgets, and activity logs</li>
              <li>Communicate securely with our operations team</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-xl text-text mb-4">3. Access &amp; Account Registration</h2>
            <p>
              Access to our Services is by invitation or approved request only. By submitting a request for access, you represent that:
            </p>
            <ul className="list-disc list-inside space-y-1.5 text-silver-400 ml-2 mt-3">
              <li>You are at least 18 years of age</li>
              <li>The information you provide is accurate and complete</li>
              <li>You are authorized to engage services for the properties you describe</li>
              <li>You will maintain the confidentiality of your account credentials</li>
            </ul>
            <p className="mt-3">
              You are responsible for all activity that occurs under your account. Notify us immediately at <a href="mailto:security@chatmanconcierge.com" className="text-[#C9B370] hover:text-[#D4C28A] transition-colors">security@chatmanconcierge.com</a> if you suspect unauthorized access.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-text mb-4">4. Client Responsibilities</h2>
            <p className="mb-3">As a client, you agree to:</p>
            <ul className="list-disc list-inside space-y-1.5 text-silver-400 ml-2">
              <li>Provide accurate property information and access credentials necessary for service delivery</li>
              <li>Ensure our staff and contractors can safely access your properties as needed</li>
              <li>Respond to urgent communications from our security or operations team in a timely manner</li>
              <li>Pay all fees and charges associated with your service agreement</li>
              <li>Not use the platform for any unlawful purpose</li>
              <li>Not share account access with unauthorized individuals</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-xl text-text mb-4">5. Service Scope &amp; Limitations</h2>
            <p>
              The specific scope of services provided to each client is defined in a separate Service Agreement. These Terms govern your use of our platform and general engagement with Chatman Concierge.
            </p>
            <p className="mt-3">
              While we strive for excellence in all operations, we do not guarantee:
            </p>
            <ul className="list-disc list-inside space-y-1.5 text-silver-400 ml-2 mt-3">
              <li>Uninterrupted availability of the platform or monitoring systems</li>
              <li>Prevention of all security incidents or property damage</li>
              <li>Availability of specific third-party vendors or contractors</li>
              <li>Specific outcomes from AI-powered concierge recommendations</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-xl text-text mb-4">6. Fees &amp; Payment</h2>
            <p>
              Service fees are outlined in your individual Service Agreement. Payment terms, billing cycles, and accepted methods are specified therein. Late payments may result in suspension of non-essential services. We reserve the right to adjust fees with 30 days&apos; written notice.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-text mb-4">7. Confidentiality</h2>
            <p>
              Confidentiality is paramount to our business. We commit to:
            </p>
            <ul className="list-disc list-inside space-y-1.5 text-silver-400 ml-2 mt-3">
              <li>Treating all client information, property details, and service activities as strictly confidential</li>
              <li>Requiring all employees, contractors, and vendors to sign confidentiality agreements</li>
              <li>Never disclosing client identities, property locations, or service details to unauthorized parties</li>
              <li>Implementing data security measures as described in our <Link href="/privacy" className="text-[#C9B370] hover:text-[#D4C28A] transition-colors">Privacy Policy</Link></li>
            </ul>
            <p className="mt-3">
              You likewise agree to maintain the confidentiality of our proprietary processes, technology, and operational methods.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-text mb-4">8. Intellectual Property</h2>
            <p>
              All content, features, and functionality of the Chatman Concierge platform — including text, graphics, logos, icons, software, and design — are owned by Chatman Concierge and are protected by copyright, trademark, and other intellectual property laws.
            </p>
            <p className="mt-3">
              You may not reproduce, distribute, modify, create derivative works from, or publicly display any materials from our platform without our prior written consent.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-text mb-4">9. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by applicable law, Chatman Concierge and its officers, directors, employees, agents, and affiliates shall not be liable for:
            </p>
            <ul className="list-disc list-inside space-y-1.5 text-silver-400 ml-2 mt-3">
              <li>Indirect, incidental, special, consequential, or punitive damages</li>
              <li>Loss of profits, data, or business opportunities</li>
              <li>Property damage or personal injury not caused by our gross negligence</li>
              <li>Actions of third-party vendors or service providers</li>
              <li>Failures of third-party security systems or technology</li>
            </ul>
            <p className="mt-3">
              Our total liability for any claim arising from or relating to the Services shall not exceed the total fees paid by you in the twelve (12) months preceding the claim.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-text mb-4">10. Indemnification</h2>
            <p>
              You agree to indemnify and hold harmless Chatman Concierge, its officers, directors, employees, and agents from any claims, damages, losses, liabilities, and expenses (including reasonable attorney&apos;s fees) arising out of or related to your use of the Services, your violation of these Terms, or your violation of any rights of a third party.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-text mb-4">11. Termination</h2>
            <p>
              Either party may terminate services in accordance with the terms of your Service Agreement. We reserve the right to suspend or terminate your platform access immediately if:
            </p>
            <ul className="list-disc list-inside space-y-1.5 text-silver-400 ml-2 mt-3">
              <li>You breach these Terms or your Service Agreement</li>
              <li>You fail to make required payments after reasonable notice</li>
              <li>Your use of the Services poses a security risk or legal liability</li>
              <li>We are required to do so by law</li>
            </ul>
            <p className="mt-3">
              Upon termination, your access to the platform will be revoked. Provisions regarding confidentiality, intellectual property, limitation of liability, and indemnification survive termination.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-text mb-4">12. Dispute Resolution</h2>
            <p>
              Any disputes arising from or relating to these Terms or the Services shall first be addressed through good-faith negotiation between the parties. If unresolved within 30 days, disputes shall be resolved through binding arbitration in accordance with the rules of the American Arbitration Association, conducted in the state of Florida.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-text mb-4">13. Governing Law</h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of the State of Florida, without regard to its conflict of law provisions.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-text mb-4">14. Severability</h2>
            <p>
              If any provision of these Terms is found to be unenforceable or invalid, that provision shall be limited or eliminated to the minimum extent necessary, and the remaining provisions shall remain in full force and effect.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-text mb-4">15. Entire Agreement</h2>
            <p>
              These Terms, together with your Service Agreement and our <Link href="/privacy" className="text-[#C9B370] hover:text-[#D4C28A] transition-colors">Privacy Policy</Link>, constitute the entire agreement between you and Chatman Concierge regarding your use of the Services and supersede all prior agreements and understandings.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-text mb-4">16. Contact Us</h2>
            <p>
              If you have questions about these Terms of Service, please contact us:
            </p>
            <div className="mt-4 bg-surface border border-border rounded-xl p-6">
              <p className="text-text font-medium mb-1">Chatman Concierge</p>
              <p className="text-silver-400">Email: <a href="mailto:legal@chatmanconcierge.com" className="text-[#C9B370] hover:text-[#D4C28A] transition-colors">legal@chatmanconcierge.com</a></p>
              <p className="text-silver-400">Web: <a href="https://chatmanconcierge.com" className="text-[#C9B370] hover:text-[#D4C28A] transition-colors">chatmanconcierge.com</a></p>
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-border">
          <div className="flex items-center justify-between text-xs text-silver-600">
            <p>&copy; {new Date().getFullYear()} Chatman Concierge. All rights reserved.</p>
            <Link href="/privacy" className="text-silver-500 hover:text-[#C9B370] transition-colors">
              Privacy Policy →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
