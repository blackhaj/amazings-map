const nextConfig = {
  experimental: {
    newNextLinkBehavior: true,
    scrollRestoration: true,
  },
  pageExtensions: ['jsx', 'js', 'tsx', 'ts'],
  reactStrictMode: true,
  swcMinify: true,
};

/** @type {import('next').NextConfig} */
export default nextConfig;
