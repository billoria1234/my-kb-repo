// next.config.js
// @ts-check

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'via.placeholder.com',
      'images.unsplash.com',
      'cdn.shopify.com',
      'your-custom-domain.com',
      'dummyimage.com',
    ],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  reactStrictMode: true,

  env: {
    API_BASE_URL: process.env.API_BASE_URL,
    STRIPE_PUBLIC_KEY: process.env.STRIPE_PUBLIC_KEY,
    DATABASE_URL: process.env.DATABASE_URL,
  },

  webpack: (config) => {
    config.resolve.fallback = { fs: false, path: false };
    return config;
  },

  experimental: {
    turbo: {
      loaders: {
        '.md': [
          {
            loader: '@mdx-js/loader',
            options: {
              format: 'mdx',
            },
          },
        ],
      },
    },
    // @ts-ignore
    serverExternalPackages: ['@prisma/client'],
  },

  async redirects() {
    return [
      {
        source: '/old-products',
        destination: '/products',
        permanent: true,
      },
    ];
  },

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
