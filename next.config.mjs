/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack(webpackConfig) {
    return {
      ...webpackConfig,
      optimization: {
        minimize: false,
      },
    };
  },
};

export default nextConfig; 