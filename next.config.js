import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['images.unsplash.com'],
  },
}

export default nextConfig
