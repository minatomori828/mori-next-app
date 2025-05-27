import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {},
  eslint: {
    ignoreDuringBuilds: true, // ✅ これを追加！
  },
};

export default nextConfig;
