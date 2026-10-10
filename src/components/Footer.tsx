import Link from 'next/link';
import CtaButton from '@/components/CtaButton';
import { CONTACT_EMAIL, SITE_DOMAIN, SITE_NAME, SITE_TAGLINE } from '@/lib/siteConfig';

export default function Footer() {
  return (
    <footer className="relative z-20 border-t border-black/10 bg-white pt-8 pb-2 px-4 text-black md:px-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <h2 className="mb-4 font-display text-xl font-bold text-black">{SITE_NAME}</h2>
            <p className="mb-4 text-sm text-black">{SITE_TAGLINE}</p>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-sm text-black underline hover:no-underline"
            >
              {CONTACT_EMAIL}
            </a>
          </div>

          <div>
            <h2 className="mb-4 text-lg font-semibold text-black">Quick Links</h2>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="text-black hover:underline">Body Fat Calculator</Link></li>
              <li><Link href="/us-navy-body-fat-calculator" className="text-black hover:underline">US Navy Method</Link></li>
              <li><Link href="/body-fat-percentage-men" className="text-black hover:underline">Body Fat % Men</Link></li>
              <li><Link href="/body-fat-percentage-women" className="text-black hover:underline">Body Fat % Women</Link></li>
              <li><Link href="/visceral-fat-calculator" className="text-black hover:underline">Visceral Fat Calculator</Link></li>
              <li><Link href="/blog" className="text-black hover:underline">Blog</Link></li>
            </ul>
          </div>

          <div>
            <h2 className="mb-4 text-lg font-semibold text-black">Resources</h2>
            <ul className="space-y-2 text-sm">
              <li><Link href="/blog/how-to-measure-body-fat" className="text-black hover:underline">How to Measure Body Fat</Link></li>
              <li><Link href="/blog/how-to-calculate-body-fat-percentage" className="text-black hover:underline">How to Calculate Body Fat %</Link></li>
              <li><Link href="/blog/ideal-body-fat-percentage" className="text-black hover:underline">Ideal Body Fat Percentage</Link></li>
              <li><Link href="/about-us" className="text-black hover:underline">About Us</Link></li>
              <li><Link href="/privacy" className="text-black hover:underline">Privacy Policy</Link></li>
              <li><Link href="/disclaimer" className="text-black hover:underline">Disclaimer</Link></li>
            </ul>
          </div>

          <div>
            <h2 className="mb-4 text-lg font-semibold text-black">Try the Tool</h2>
            <p className="mb-4 text-sm text-black">
              Estimate body fat percentage with the Navy method — free, instant, no account required.
            </p>
            <CtaButton href="/#calculator" ariaLabel="Open the body fat calculator">
              OPEN CALCULATOR
            </CtaButton>
          </div>
        </div>

        <div className="mt-8 border-t border-black/10 pt-4 pb-3 text-center text-sm text-black">
          <p className="mb-0">
            © 2026 {SITE_NAME}. All rights reserved. |{' '}
            <Link href="/" className="underline hover:no-underline">{SITE_DOMAIN}</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
