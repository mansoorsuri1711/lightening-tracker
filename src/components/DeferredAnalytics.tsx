'use client';

import { useEffect } from 'react';

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/** Load GA only after first user gesture so it stays out of Lighthouse TBT/LCP. */
export default function DeferredAnalytics() {
  useEffect(() => {
    if (!GA_ID || /^G-XXXXXXXXXX$/i.test(GA_ID)) {
      return;
    }

    let loaded = false;

    const load = () => {
      if (loaded) return;
      loaded = true;
      cleanup();

      const script = document.createElement('script');
      script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
      script.async = true;
      document.head.appendChild(script);

      window.dataLayer = window.dataLayer || [];
      window.gtag = function gtag() {
        window.dataLayer.push(arguments);
      };
      window.gtag('js', new Date());
      window.gtag('config', GA_ID, {
        page_path: window.location.pathname,
        send_page_view: false,
        transport_type: 'beacon',
      });
    };

    const opts: AddEventListenerOptions = { once: true, passive: true };
    const events = ['pointerdown', 'keydown', 'touchstart', 'scroll'] as const;

    const cleanup = () => {
      for (const ev of events) {
        window.removeEventListener(ev, load, opts);
      }
    };

    for (const ev of events) {
      window.addEventListener(ev, load, opts);
    }

    return cleanup;
  }, []);

  return null;
}
