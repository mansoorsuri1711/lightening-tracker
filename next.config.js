/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  compress: true,
  // Dev-only: allow HMR when the page is opened as 127.0.0.1 instead of localhost
  allowedDevOrigins: ['127.0.0.1', 'localhost'],
  
  // Target modern browsers - no legacy polyfills
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // Optimize images
  images: {
    formats: ['image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    qualities: [75, 80, 90, 100],
    minimumCacheTTL: 0,
  },

  async redirects() {
    return [
      {
        source: '/about',
        destination: '/about-us',
        permanent: true,
      },
      // Legacy Florida paycheck routes → Body Fat Calculator
      {
        source: '/how-florida-paychecks-work',
        destination: '/us-navy-body-fat-calculator',
        permanent: true,
      },
      {
        source: '/florida-no-state-income-tax',
        destination: '/body-fat-percentage-men',
        permanent: true,
      },
      {
        source: '/pay-frequency-guide',
        destination: '/body-fat-percentage-women',
        permanent: true,
      },
      {
        source: '/blog/how-to-calculate-florida-take-home-pay',
        destination: '/blog/how-to-calculate-body-fat-percentage',
        permanent: true,
      },
      {
        source: '/blog/fica-taxes-explained',
        destination: '/blog/how-to-measure-body-fat',
        permanent: true,
      },
      {
        source: '/blog/federal-tax-brackets',
        destination: '/blog/ideal-body-fat-percentage',
        permanent: true,
      },
      {
        source: '/blog/federal-tax-brackets-2026',
        destination: '/blog/ideal-body-fat-percentage',
        permanent: true,
      },
      // Older CD calculator leftovers
      {
        source: '/how-cds-work',
        destination: '/us-navy-body-fat-calculator',
        permanent: true,
      },
      {
        source: '/cd-ladder',
        destination: '/body-fat-percentage-men',
        permanent: true,
      },
      {
        source: '/cd-vs-savings-account',
        destination: '/body-fat-percentage-women',
        permanent: true,
      },
      // Legacy asset paths
      {
        source: '/og-image.webp',
        destination: '/feature/og-image-1200x630.png',
        permanent: true,
      },
      {
        source: '/og-image.png',
        destination: '/feature/og-image-1200x630.png',
        permanent: true,
      },
      {
        source: '/twitter-card.webp',
        destination: '/feature/twitter-card-1200x675.png',
        permanent: true,
      },
      {
        source: '/twitter-card.png',
        destination: '/feature/twitter-card-1200x675.png',
        permanent: true,
      },
      {
        source: '/feature/og-image-1200x630.webp',
        destination: '/feature/og-image-1200x630.png',
        permanent: true,
      },
      {
        source: '/feature/twitter-card-1200x675.webp',
        destination: '/feature/twitter-card-1200x675.png',
        permanent: true,
      },
      {
        source: '/hero-florida-paycheck-calculator.webp',
        destination: '/hero-desktop-1920x1080.png',
        permanent: true,
      },
      {
        source: '/logo-icon-512.png',
        destination: '/android-chrome-512x512.png',
        permanent: true,
      },
      {
        source: '/logo-mark-512.png',
        destination: '/android-chrome-512x512.png',
        permanent: true,
      },
      {
        source: '/logo-512.png',
        destination: '/android-chrome-512x512.png',
        permanent: true,
      },
      {
        source: '/favicon-512x512.png',
        destination: '/android-chrome-512x512.png',
        permanent: true,
      },
      {
        source: '/maskable-icon-512x512.png',
        destination: '/android-chrome-512x512.png',
        permanent: true,
      },
    ];
  },

  async rewrites() {
    return [
      {
        source: '/.well-known/:path*',
        destination: '/public/.well-known/:path*',
      },
    ];
  },

  // Skip Next.js legacy polyfills. Target browsers already ship Array.at,
  // Object.hasOwn, etc. (Lighthouse: Legacy JavaScript ~14KB).
  turbopack: {
    resolveAlias: {
      '../build/polyfills/polyfill-module': './src/lib/empty-polyfill.js',
      'next/dist/build/polyfills/polyfill-module': './src/lib/empty-polyfill.js',
      'next/dist/esm/build/polyfills/polyfill-module': './src/lib/empty-polyfill.js',
    },
  },

  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        '../build/polyfills/polyfill-module': false,
        'next/dist/build/polyfills/polyfill-module': false,
        'next/dist/esm/build/polyfills/polyfill-module': false,
      };
    }
    return config;
  },

  // Optimize headers
  async headers() {
    return [
      // HTML pages: always revalidate so Googlebot gets fresh content.
      // Exclude /_next/static so Next.js can manage hashed-asset caching
      // (custom Cache-Control there breaks HMR in development).
      {
        source: '/((?!_next/static|_next/image).*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, must-revalidate',
          },
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: https:",
              "font-src 'self' data:",
              "connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://www.googletagmanager.com",
              "frame-ancestors 'none'",
              "base-uri 'self'",
              "form-action 'self'",
            ].join('; '),
          },
        ],
      },
      // Public images: cache briefly and always revalidate so replacements show up
      {
        source: '/:path*.webp',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, must-revalidate',
          },
        ],
      },
      {
        source: '/:path*.png',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, must-revalidate',
          },
        ],
      },
      {
        source: '/:path*.svg',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, must-revalidate',
          },
        ],
      },
      {
        source: '/css/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
          {
            key: 'Content-Type',
            value: 'text/css',
          },
        ],
      },
      {
        source: '/favicon.ico',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, must-revalidate',
          },
        ],
      },
    ];
  },

  // Enable experimental features
  experimental: {
    optimizeCss: true, // Critters inlines critical CSS
    inlineCss: true, // Inline CSS in HTML to eliminate render-blocking (improves FCP/LCP)
    scrollRestoration: true,
    optimizePackageImports: ['react-icons'],
  },
  
  // Modern module/nomodule pattern
  modularizeImports: {
    'react-icons': {
      transform: 'react-icons/{{member}}',
    },
  },
}

module.exports = nextConfig
