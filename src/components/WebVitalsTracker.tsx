'use client';

import { useEffect } from 'react';
import type { Metric } from 'web-vitals';

function sendToAnalytics(metric: Metric) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', metric.name, {
      event_category: 'Web Vitals',
      event_label: metric.id,
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      non_interaction: true,
    });
  }
}

/** Defer web-vitals until idle so it does not compete with first paint. */
export default function WebVitalsTracker() {
  useEffect(() => {
    let cancelled = false;
    let idleId: number | undefined;
    let timeoutId: number | undefined;

    const run = () => {
      void import('web-vitals').then(({ onCLS, onFCP, onLCP, onTTFB, onINP }) => {
        if (cancelled) return;
        onCLS(sendToAnalytics);
        onFCP(sendToAnalytics);
        onLCP(sendToAnalytics);
        onTTFB(sendToAnalytics);
        onINP(sendToAnalytics);
      });
    };

    const ric = window.requestIdleCallback;
    if (typeof ric === 'function') {
      idleId = ric(run, { timeout: 8000 });
    } else {
      timeoutId = window.setTimeout(run, 5000);
    }

    return () => {
      cancelled = true;
      if (idleId !== undefined && typeof window.cancelIdleCallback === 'function') {
        window.cancelIdleCallback(idleId);
      }
      if (timeoutId !== undefined) window.clearTimeout(timeoutId);
    };
  }, []);

  return null;
}
