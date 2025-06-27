import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals = [...(config.externals || []), 'zlib-sync'];
    }
    
    return config;
  },
  serverExternalPackages: ['zlib-sync']
};

export default nextConfig;
