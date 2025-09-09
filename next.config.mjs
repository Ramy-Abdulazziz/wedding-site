/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [new URL("https://lh3.googleusercontent.com/p/**")],
            qualities: [50, 80, 100],

    },
};

export default nextConfig;
