import Link from 'next/link';
import CtaButton from '@/components/CtaButton';
import { CONTACT_EMAIL, SITE_DOMAIN, SITE_NAME, SITE_TAGLINE } from '@/lib/siteConfig';

export default function Footer() {
  return (
    <footer className="relative z-20 border-t border-pink/20 bg-gradient-to-br from-brand via-brand-soft to-brand-deep pt-8 pb-2 px-4 text-white md:px-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <h2 className="mb-4 font-display text-xl font-bold text-white">{SITE_NAME}</h2>
            <p className="mb-4 text-sm text-pink-soft/90">{SITE_TAGLINE}</p>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-sm text-pink-soft underline hover:no-underline"
            >
              {CONTACT_EMAIL}
            </a>
          </div>

          <div>
            <h2 className="mb-4 text-lg font-semibold text-white">Quick Links</h2>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="text-white/85 hover:text-white hover:underline">BMI Calculator Women</Link></li>
              <li><Link href="/bmi-chart-women" className="text-white/85 hover:text-white hover:underline">BMI Chart Women</Link></li>
              <li><Link href="/healthy-bmi" className="text-white/85 hover:text-white hover:underline">Healthy BMI</Link></li>
              <li><Link href="/bmi-by-age" className="text-white/85 hover:text-white hover:underline">BMI by Age</Link></li>
              <li><Link href="/blog" className="text-white/85 hover:text-white hover:underline">Blog</Link></li>
            </ul>
          </div>

          <div>
            <h2 className="mb-4 text-lg font-semibold text-white">Resources</h2>
            <ul className="space-y-2 text-sm">
              <li><Link href="/blog/how-to-calculate-bmi" className="text-white/85 hover:text-white hover:underline">How to Calculate BMI</Link></li>
              <li><Link href="/blog/what-is-bmi" className="text-white/85 hover:text-white hover:underline">What Is BMI?</Link></li>
              <li><Link href="/blog/bmi-formula" className="text-white/85 hover:text-white hover:underline">BMI Formula</Link></li>
              <li><Link href="/blog/height-and-weight-chart-for-women" className="text-white/85 hover:text-white hover:underline">Height & Weight Chart</Link></li>
              <li><Link href="/about-us" className="text-white/85 hover:text-white hover:underline">About Us</Link></li>
              <li><Link href="/privacy" className="text-white/85 hover:text-white hover:underline">Privacy Policy</Link></li>
              <li><Link href="/disclaimer" className="text-white/85 hover:text-white hover:underline">Disclaimer</Link></li>
            </ul>
          </div>

          <div>
            <h2 className="mb-4 text-lg font-semibold text-white">Try the Tool</h2>
            <p className="mb-4 text-sm text-white/80">
              Check your BMI in seconds — free, private, no account required.
            </p>
            <CtaButton href="/#calculator" ariaLabel="Open the BMI calculator for women">
              OPEN CALCULATOR
            </CtaButton>
          </div>
        </div>

        <div className="mt-8 border-t border-white/15 pt-4 pb-3 text-center text-sm text-white/70">
          <p className="mb-0">
            © 2026 {SITE_NAME}. All rights reserved. |{' '}
            <Link href="/" className="underline hover:no-underline text-white/90">{SITE_DOMAIN}</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
