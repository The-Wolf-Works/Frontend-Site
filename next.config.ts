import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'mtcreative.dev',
            },
        ],
    },
};

export default nextConfig;
