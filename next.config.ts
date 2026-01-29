import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      // Placeholder images
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
      // GitHub images
      {
        protocol: 'https',
        hostname: 'camo.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'github.githubassets.com',
      },
      // Google images
      {
        protocol: 'https',
        hostname: 'encrypted-tbn0.gstatic.com',
      },
      {
        protocol: 'https',
        hostname: '*.googleapis.com',
      },
      // Technology logos
      {
        protocol: 'https',
        hostname: 'nodejs.org',
      },
      {
        protocol: 'https',
        hostname: 'www.postgresql.org',
      },
      {
        protocol: 'https',
        hostname: 'www.w3.org',
      },
      {
        protocol: 'https',
        hostname: '*.w3.org',
      },
      // Icon/logo CDNs
      {
        protocol: 'https',
        hostname: 'e7.pngegg.com',
      },
      {
        protocol: 'https',
        hostname: 'www.vectorlogo.zone',
      },
      {
        protocol: 'https',
        hostname: 'static-00.iconduck.com',
      },
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
      },
      // Design tools
      {
        protocol: 'https',
        hostname: 's3-alpha.figma.com',
      },
      // LinkedIn images
      {
        protocol: 'https',
        hostname: 'media.licdn.com',
      },
      // Company websites
      {
        protocol: 'https',
        hostname: 'cdn.prod.website-files.com',
      },
      {
        protocol: 'https',
        hostname: 'nabsolutions.ca',
      },
      // CDNs
      {
        protocol: 'https',
        hostname: '*.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.simpleicons.org',
      },
    ],
  },
};

export default nextConfig;
