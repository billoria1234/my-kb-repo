// @ts-check
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Image optimization configuration (required for external images)
  images: {
    domains: [
      'via.placeholder.com',
      'images.unsplash.com',
      'cdn.shopify.com',
      'your-custom-domain.com'
    ],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // React Strict Mode (recommended for development)
  reactStrictMode: true,

  // Environment variables
  env: {
    API_BASE_URL: process.env.API_BASE_URL,
    STRIPE_PUBLIC_KEY: process.env.STRIPE_PUBLIC_KEY,
  },

  // Custom webpack configuration (simplified for Turbopack)
  webpack: (config) => {
    config.resolve.fallback = { fs: false, path: false };
    return config;
  },

  // Turbopack-compatible experimental features
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
    // Moved from experimental to root config
    serverExternalPackages: ['@prisma/client'],
  },

  // Enable typed routes through jsconfig/tsconfig instead
  // (Create jsconfig.json or tsconfig.json for typed routes)

  // Redirects (Turbopack compatible)
  async redirects() {
    return [
      {
        source: '/old-products',
        destination: '/products',
        permanent: true,
      },
    ];
  },

  // Security headers
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

export default nextConfig;