const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.resolve.modules.push(path.resolve('./'));

    return config;
  },
  async rewrites() {
    return [
      {
        source: '/api/classify',
        destination: 'https://pqv7mdkdf4.us-west-2.awsapprunner.com/classify',
      },
    ];
  },
};

module.exports = nextConfig;
