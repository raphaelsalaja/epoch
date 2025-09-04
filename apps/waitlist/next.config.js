import createMDX from "@next/mdx";

const withMDX = createMDX({
  // You can add remark/rehype plugins here
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: [
      "@tanstack/react-query",
      "@tanstack/react-query-devtools",
      "zustand",
    ],
  },
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.scdn.co",
        port: "",
        pathname: "/image/**",
      },
      {
        protocol: "https",
        hostname: "mosaic.scdn.co",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn-images.dzcdn.net",
        port: "",
        pathname: "/images/**",
      },
    ],
  },
};

export default withMDX(nextConfig);
