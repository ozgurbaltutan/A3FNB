import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/en/products/green-coffee-beans",
        destination: "/en/products/coffee",
        permanent: true,
      },
      {
        source: "/en/products/cocoa",
        destination: "/en/products/cocoa-products",
        permanent: true,
      },
      {
        source: "/en/products/grains-oilseeds",
        destination: "/en/products/grains-seeds",
        permanent: true,
      },
      {
        source: "/en/products/dairy-ingredients",
        destination: "/en/products/dairy-milk-powders",
        permanent: true,
      },
      {
        source: "/en/products/edible-oils",
        destination: "/en/products/oils-fats",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
