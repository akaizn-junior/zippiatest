/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    jobsApiEndpoint: 'https://www.zippia.com/api/jobs/'
  }
}

module.exports = nextConfig
