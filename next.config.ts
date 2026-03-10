import type { NextConfig } from "next";

const wpHostname = new URL(process.env.NEXT_PUBLIC_WORDPRESS_API_URL!).hostname

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: wpHostname,
            },
        ],
    },
};

export default nextConfig;
