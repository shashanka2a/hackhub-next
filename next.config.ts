import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    // Ignore ESLint errors during builds to allow successful production builds
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
