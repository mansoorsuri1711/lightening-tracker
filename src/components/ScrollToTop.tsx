'use client';

import { useState, useEffect, useRef } from 'react';
import { useMobileMenu } from './MobileMenuProvider';

export default function ScrollToTop() {
  const { isOpen: isMobileMenuOpen } = useMobileMenu();
  const [isVisible, setIsVisible] = useState(false);
  const rafId = useRef<number | null>(null);
  const lastRan = useRef(0);

  useEffect(() => {
    const handler = () => {
      // Read scrollY synchronously in the scroll event (not in rAF) to avoid forced reflow
      const scrollY = window.scrollY;
      if (rafId.current) return;
      rafId.current = requestAnimationFrame(() => {
        const now = Date.now();
        if (now - lastRan.current >= 150) {
          setIsVisible((prev) => {
            const next = scrollY > 300;
            return prev !== next ? next : prev;
          });
          lastRan.current = now;
        }
        rafId.current = null;
      });
    };
    window.addEventListener('scroll', handler, { passive: true });
    return () => {
      window.removeEventListener('scroll', handler);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  // Scroll to top smoothly
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      {isVisible && !isMobileMenuOpen && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 rounded-full bg-gradient-to-br from-brand to-brand-soft p-3 text-white shadow-lg shadow-pink/30 transition-all duration-300 hover:scale-110 hover:from-pink-deep hover:to-coral hover:shadow-2xl group"
          aria-label="Scroll to top"
        >
          <svg
            className="w-6 h-6 transform group-hover:-translate-y-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        </button>
      )}
    </>
  );
}

