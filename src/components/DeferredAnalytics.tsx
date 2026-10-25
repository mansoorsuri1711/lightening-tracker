'use client';

import { useEffect } from 'react';

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export default function DeferredAnalytics() {
  useEffect(() => {
    if (!GA_ID || /^G-XXXXXXXXXX$/i.test(GA_ID)) {
      return;
    }

    let loaded = false;
    let idleId: number | undefined;
    let timeoutId: number | undefined;

    const load = () => {
      if (loaded) return;
      loaded = true;

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

    const idle = window.requestIdleCallback;
    if (typeof idle === 'function') {
      idleId = idle(load, { timeout: 6000 });
    } else {
      timeoutId = window.setTimeout(load, 6000);
    }

    return () => {
      if (idleId !== undefined && typeof window.cancelIdleCallback === 'function') {
        window.cancelIdleCallback(idleId);
      }
      if (timeoutId !== undefined) {
        window.clearTimeout(timeoutId);
      }
    };
  }, []);

  return null;
}
