import Link from 'next/link';
import CtaButton from '@/components/CtaButton';
import { CONTACT_EMAIL, SITE_DOMAIN, SITE_NAME, SITE_TAGLINE } from '@/lib/siteConfig';

export default function Footer() {
  return (
    <footer className="relative z-20 border-t border-white/10 bg-gradient-to-br from-brand via-brand-soft to-brand-deep pt-8 pb-2 px-4 text-white md:px-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <h2 className="mb-4 font-display text-xl font-bold text-white">{SITE_NAME}</h2>
            <p className="mb-4 text-sm text-white/75">{SITE_TAGLINE}</p>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-sm text-violet-soft underline hover:no-underline"
            >
              {CONTACT_EMAIL}
            </a>
          </div>

          <div>
            <h2 className="mb-4 text-lg font-semibold text-white">Tools</h2>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="text-white/85 hover:text-white hover:underline">Lightning Tracker</Link></li>
              <li><Link href="/live-lightning-map" className="text-white/85 hover:text-white hover:underline">Live Lightning Map</Link></li>
              <li><Link href="/lightning-distance-calculator" className="text-white/85 hover:text-white hover:underline">Distance Calculator</Link></li>
              <li><Link href="/lightning-alerts" className="text-white/85 hover:text-white hover:underline">Lightning Alerts</Link></li>
              <li><Link href="/features" className="text-white/85 hover:text-white hover:underline">Features</Link></li>
            </ul>
          </div>

          <div>
            <h2 className="mb-4 text-lg font-semibold text-white">Guides</h2>
            <ul className="space-y-2 text-sm">
              <li><Link href="/how-it-works" className="text-white/85 hover:text-white hover:underline">How It Works</Link></li>
              <li><Link href="/blog/best-lightning-tracker-apps" className="text-white/85 hover:text-white hover:underline">Best Lightning Tracker Apps</Link></li>
              <li><Link href="/blog/how-lightning-trackers-work" className="text-white/85 hover:text-white hover:underline">How Trackers Work</Link></li>
              <li><Link href="/blog/how-far-away-is-lightning" className="text-white/85 hover:text-white hover:underline">How Far Is Lightning?</Link></li>
              <li><Link href="/blog/lightning-safety-tips" className="text-white/85 hover:text-white hover:underline">Lightning Safety Tips</Link></li>
              <li><Link href="/about-us" className="text-white/85 hover:text-white hover:underline">About Us</Link></li>
              <li><Link href="/contact-us" className="text-white/85 hover:text-white hover:underline">Contact Us</Link></li>
              <li><Link href="/privacy" className="text-white/85 hover:text-white hover:underline">Privacy Policy</Link></li>
              <li><Link href="/disclaimer" className="text-white/85 hover:text-white hover:underline">Disclaimer</Link></li>
            </ul>
          </div>

          <div>
            <h2 className="mb-4 text-lg font-semibold text-white">Stay ahead of storms</h2>
            <p className="mb-4 text-sm text-white/80">
              Watch live strikes on the map, estimate distance from flash to thunder, and use alert
              tips when storms approach.
            </p>
            <CtaButton
              href="/#calculator"
              size="sm"
              ariaLabel="Open the lightning distance calculator"
              icon="arrow"
            >
              OPEN CALCULATOR
            </CtaButton>
          </div>
        </div>

        <div className="mt-8 border-t border-white/15 pt-4 pb-3 text-center text-sm text-white/70">
          <p className="mb-0">
            © 2026 {SITE_NAME}. All rights reserved. |{' '}
            <Link href="/" className="underline hover:no-underline text-white/90">{SITE_DOMAIN}</Link>
          </p>
          <p className="mt-2 text-xs text-white/45">
            Educational weather awareness tool only. Not an official emergency alert service. Always follow local weather warnings.
          </p>
        </div>
      </div>
    </footer>
  );
}
