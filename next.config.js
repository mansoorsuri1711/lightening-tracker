/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  serverExternalPackages: ['h5wasm'],
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
    qualities: [70, 75, 80, 90, 100],
    minimumCacheTTL: 0,
  },

  async redirects() {
    return [
      {
        source: '/about',
        destination: '/about-us',
        permanent: true,
      },
      // Retired BMI / TikTok / unrelated routes from previous brands
      {
        source: '/bmi-chart-women',
        destination: '/',
        permanent: true,
      },
      {
        source: '/healthy-bmi',
        destination: '/',
        permanent: true,
      },
      {
        source: '/bmi-by-age',
        destination: '/',
        permanent: true,
      },
      {
        source: '/blog/how-to-calculate-bmi',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/blog/what-is-bmi',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/blog/bmi-formula',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/blog/height-and-weight-chart-for-women',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/pricing',
        destination: '/',
        permanent: true,
      },
      {
        source: '/blog/how-to-schedule-tiktok-posts',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/blog/best-time-to-post-on-tiktok',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/blog/tiktok-content-calendar',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/blog/does-tiktok-have-a-scheduler',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/parlay-odds-calculator',
        destination: '/',
        permanent: true,
      },
      {
        source: '/parlay-payout-calculator',
        destination: '/',
        permanent: true,
      },
      {
        source: '/parlay-bet-calculator',
        destination: '/',
        permanent: true,
      },
      {
        source: '/nfl-parlay-calculator',
        destination: '/',
        permanent: true,
      },
      {
        source: '/moneyline-parlay-calculator',
        destination: '/',
        permanent: true,
      },
      {
        source: '/round-robin-calculator',
        destination: '/',
        permanent: true,
      },
      {
        source: '/blog/how-to-calculate-parlay-odds',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/blog/what-is-a-parlay-bet',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/blog/parlay-odds-explained',
        destination: '/blog',
        permanent: true,
      },

      // Retired Index Fund Calculator routes
      {
        source: '/compound-interest-calculator',
        destination: '/lightning-distance-calculator',
        permanent: true,
      },
      {
        source: '/expense-ratio-calculator',
        destination: '/lightning-alerts',
        permanent: true,
      },
      {
        source: '/investment-growth-calculator',
        destination: '/live-lightning-map',
        permanent: true,
      },
      {
        source: '/blog/what-is-an-index-fund',
        destination: '/blog/how-lightning-trackers-work',
        permanent: true,
      },
      {
        source: '/blog/index-fund-vs-mutual-fund',
        destination: '/blog/best-lightning-tracker-apps',
        permanent: true,
      },
      {
        source: '/blog/expense-ratio-explained',
        destination: '/blog/how-far-away-is-lightning',
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
        destination: '/feature/twitter-card-1200x600.png',
        permanent: true,
      },
      {
        source: '/twitter-card.png',
        destination: '/feature/twitter-card-1200x600.png',
        permanent: true,
      },
      {
        source: '/feature/twitter-card-1200x675.png',
        destination: '/feature/twitter-card-1200x600.png',
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
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' blob: https://www.googletagmanager.com https://www.google-analytics.com",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: blob: https:",
              "font-src 'self' data: https://tiles.openfreemap.org",
              "worker-src 'self' blob:",
              "child-src 'self' blob:",
              // Leaflet / Esri dark basemap tiles
              "connect-src 'self' blob: https://basemaps.cartocdn.com https://tiles.basemaps.cartocdn.com https://api.rainviewer.com https://tilecache.rainviewer.com https://server.arcgisonline.com https://services.arcgisonline.com https://www.google-analytics.com https://analytics.google.com https://www.googletagmanager.com",
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
    optimizePackageImports: ['react-icons', 'maplibre-gl'],
  },
  
  // Modern module/nomodule pattern
  modularizeImports: {
    'react-icons': {
      transform: 'react-icons/{{member}}',
    },
  },
}

module.exports = nextConfig
