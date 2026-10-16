import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      {
        source: "/products/5-in-1-schoolbag-sets/design-01",
        destination: "/products/3-in-1-schoolbag-sets/design-13",
        permanent: true,
      },
      {
        source: "/:locale/products/5-in-1-schoolbag-sets/design-01",
        destination: "/:locale/products/3-in-1-schoolbag-sets/design-13",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.besdergroup.com" }],
        destination: "https://besdergroup.com/:path*",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

export default nextConfig;
