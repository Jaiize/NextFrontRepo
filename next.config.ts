import type { NextConfig } from "next";
import { WebpackConfigContext } from "next/dist/server/config-shared";
import path from "path";
import { Configuration } from "webpack";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true
  },
  outputFileTracingRoot: path.join(__dirname),
  webpack: (config: Configuration, { dev, isServer }: WebpackConfigContext) => {
    if (dev && config.watchOptions && !isServer) {
      config.watchOptions = {
        ...config.watchOptions,
        ignored: ["**/node_modules/**", "**/.git/**", "**/.next/**", "**/dist/**"],
        poll: 1000,
        aggregateTimeout: 300
      };
    }
    return config;
  },
  reactCompiler: true,
  cacheComponents: false,
  experimental: {
    turbopackFileSystemCacheForDev: true,
  },
  // devIndicators: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "media.rawg.io",
      },
    ],
  },
};

export default nextConfig;
