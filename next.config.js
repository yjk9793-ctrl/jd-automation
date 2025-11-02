/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com'],
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      'reactflow': require.resolve('reactflow'),
    };
    return config;
  },
}

module.exports = nextConfig
