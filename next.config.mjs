/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'static.atlasacademy.io',
        port: '',
        pathname: '/JP/**',
      },
    ],
  },
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.ink$/i,
      type: 'asset/source',
    });
    return config;
  },
  reactStrictMode: false,
};
export default nextConfig;
