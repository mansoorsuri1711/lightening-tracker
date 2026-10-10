'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import MobileNavigation from './MobileNavigation';
import { BRAND_LOGO_MARK, SITE_NAME } from '@/lib/siteConfig';

const navLinks = [
  { href: '/', label: 'Calculator' },
  { href: '/us-navy-body-fat-calculator', label: 'Navy Method' },
  { href: '/body-fat-percentage-men', label: 'Men' },
  { href: '/body-fat-percentage-women', label: 'Women' },
  { href: '/visceral-fat-calculator', label: 'Visceral Fat' },
  { href: '/blog', label: 'Blog' },
  { href: '/about-us', label: 'About' },
];

export default function Header() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname === href || pathname.startsWith(href + '/');
  };

  return (
    <header className="sticky top-0 z-40 border-b border-black/10 bg-white/95 py-2 px-3 backdrop-blur-md sm:py-3 sm:px-4 md:px-8">
      <div className="container mx-auto flex justify-between items-center gap-3">
        <Link href="/" className="flex items-center min-w-0">
          <div className="relative h-8 w-8 sm:h-9 sm:w-9 mr-2 flex-shrink-0">
            <Image
              src={BRAND_LOGO_MARK}
              alt="Body Fat Calculator logo"
              width={40}
              height={40}
              className="object-contain"
              priority
              fetchPriority="high"
            />
          </div>
          <span className="truncate font-display text-sm sm:text-base md:text-lg font-bold leading-tight text-black">
            {SITE_NAME}
          </span>
        </Link>

        <nav className="hidden xl:flex space-x-5">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`relative font-medium transition-colors pb-1 group text-sm text-black ${
                isActive(href) ? 'font-semibold' : 'hover:underline'
              }`}
            >
              {label}
              <span
                className={`absolute bottom-0 left-0 h-0.5 bg-black rounded-full transition-all duration-300 ${
                  isActive(href) ? 'w-full' : 'w-0 group-hover:w-full'
                }`}
              />
            </Link>
          ))}
        </nav>

        <MobileNavigation />
      </div>
    </header>
  );
}
