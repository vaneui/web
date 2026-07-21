/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Enable Turbopack (Next.js 16 default)
  turbopack: {},
  // Docs taxonomy change: form controls split out of basic-components, NavLink
  // absorbed it (navigation-components dissolved), ListItem merged into List.
  async redirects() {
    return [
      { source: '/docs/basic-components/input', destination: '/docs/form-components/input', permanent: true },
      { source: '/docs/basic-components/checkbox', destination: '/docs/form-components/checkbox', permanent: true },
      { source: '/docs/basic-components/label', destination: '/docs/form-components/label', permanent: true },
      { source: '/docs/navigation-components/navlink', destination: '/docs/basic-components/navlink', permanent: true },
      { source: '/docs/navigation-components', destination: '/docs/basic-components/navlink', permanent: true },
      { source: '/docs/typography-components/list-item', destination: '/docs/typography-components/list', permanent: true },
    ];
  },
};

export default nextConfig; 