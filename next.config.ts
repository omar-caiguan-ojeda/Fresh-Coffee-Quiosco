import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
  // typescript: {
  //   ignoreBuildErrors: true, // ⚠️ ignora errores de tipos solo en build
  // },
};

export default nextConfig;
