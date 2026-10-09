const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: false,
  images: {
    unoptimized: false,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ritzmediaworld.com",
      },
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "https",
        hostname: "etorisoft.com",
      },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  eslint: {
    // This disables ESLint during builds (optional)
    ignoreDuringBuilds: true,
  },
  // Compress responses
  compress: true,
  // Enable production source maps for better debugging
  productionBrowserSourceMaps: false,
  // Optimize package imports
  modularizeImports: {
    'react-icons': {
      transform: 'react-icons/{{member}}',
      skipDefaultConversion: true,
    },
  },
  // Headers for better caching and security
  async headers() {
    return [
      {
        source: '/:all*(svg|jpg|jpeg|png|webp|ico|avif|woff|woff2)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/:path*',
        headers: [
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload',
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.ritzmediaworld.com" }],
        destination: "https://ritzmediaworld.com/:path*",
        permanent: true,
      },
      { source: "/discussion-forum", destination: "/contact.html", permanent: true },
      { source: "/discussion-forum/:path*", destination: "/contact.html", permanent: true },
      { source: "/blogs2", destination: "/blogs", permanent: true },
      { source: "/blog2", destination: "/blogs", permanent: true },
      { source: "/all-ritz-blogs", destination: "/blogs", permanent: true },
      { source: "/all-ritz-blogs/:path*", destination: "/blogs", permanent: true },
      { source: "/blogs/blogs/:page(\\d+)", destination: "/blogs", permanent: true },
      { source: "/blogs/:page(\\d+)", destination: "/blogs", permanent: true },
      // Slug without "." so /blogs/image.jpg stays on disk (nginx) or middleware
      { source: "/blogs/:slug([^./]+)", destination: "/:slug", permanent: true },
      {
        source: "/seo-vs-paid-ads%3A-which-strategy-works-best-in-2025",
        destination: "/seo-vs-paid-ads-which-strategy-works-best-in-2025",
        permanent: true,
      },
      // Legacy WordPress blog URLs: /my-post.html -> /my-post (not about/contact/work)
      {
        source: "/:slug((?!about|contact|work)[^/]+)\\.html",
        destination: "/:slug",
        permanent: true,
      },
      { source: "/contact.html2", destination: "/contact.html", permanent: true },
      { source: "/contact.html2/:path*", destination: "/contact.html", permanent: true },
      { source: "/stories", destination: "/web-stories", permanent: true },
      { source: "/stories/:path*", destination: "/web-stories", permanent: true },
      {
        source: "/services/contents-marketing/content-marketing",
        destination: "/services/contents-marketing/customized-content-strategy",
        permanent: true,
      },
    ];
  },
  // Legacy service redirects (uncomment to enable):
  // async redirects() {
  //   return [
  //     { source: "/campaign-integration.html", destination: "/services/influencer-marketing-agency-in-india/campaign-integration", permanent: true },
  //     { source: "/radio-advertising.html", destination: "/services/radio-advertising", permanent: true },
  //     { source: "/creative-services.html", destination: "/services/creative-services", permanent: true },
  //     { source: "/celebrity-selection.html", destination: "/services/celebrity-endorsements", permanent: true },
  //     { source: "/graphic-designing.html", destination: "/services/creative-services/graphic-designing", permanent: true },
  //     { source: "/web-designing-development.html", destination: "/services/web-designing-and-development", permanent: true },
  //     { source: "/real-estate-companies-dubai", destination: "/top-real-estate-companies-dubai-property-investment", permanent: true },
  //     { source: "/contents-marketing.html", destination: "/services/contents-marketing", permanent: true },
  //     { source: "/realestate-industry.html", destination: "/digital-marketing-strategies-for-real-estate-businesses", permanent: true },
  //     { source: "/orm-in-digital-marketing.html", destination: "/services/digital-marketing/orm-in-digital-marketing", permanent: true },
  //     { source: "/advertisement-designing.html", destination: "/services/print-advertising/advertisement-designing", permanent: true },
  //     { source: "/what-is-fm-radio-advertising-agency", destination: "/fm-radio-advertising-benefits-costs-strategies", permanent: true },
  //     { source: "/about-2", destination: "/about.html", permanent: true },
  //     { source: "/custom-design-development.html", destination: "/services/web-designing-and-development/custom-design-development", permanent: true },
  //     { source: "/influencer-marketing-agency-in-india", destination: "/services/influencer-marketing-agency-in-india", permanent: true },
  //     { source: "/celebrity-endorsements", destination: "/services/celebrity-endorsements", permanent: true },
  //     { source: "/web-designing-and-development", destination: "/services/web-designing-and-development", permanent: true },
  //     { source: "/contents-marketing", destination: "/services/contents-marketing", permanent: true },
  //     { source: "/digital-marketing", destination: "/services/digital-marketing", permanent: true },
  //     { source: "/print-advertising", destination: "/services/print-advertising", permanent: true },
  //     { source: "/creative-services", destination: "/services/creative-services", permanent: true },
  //     { source: "/radio-advertising", destination: "/services/radio-advertising", permanent: true },
  //   ];
  // },
  async rewrites() {
    return {
      beforeFiles: [
        { source: "/about", destination: "/about.html" },
        { source: "/contact", destination: "/contact.html" },
        {
          source: "/services/real-estate-walkthrough",
          destination: "/services/Real-Estate-Walkthrough",
        },
        {
          source: "/services/real-estate-walkthrough/:path*",
          destination: "/services/Real-Estate-Walkthrough/:path*",
        },
      ],
    };
  },
  webpack: (config) => {
    config.resolve = {
      ...config.resolve,
      alias: {
        ...(config.resolve?.alias || {}),
        "@": path.resolve(__dirname, "src"),
      },
    };
    return config;
  },
};

module.exports = nextConfig;
