/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [new URL("https://lh3.googleusercontent.com/p/**")],
        qualities: [50, 80, 100],
    },
    async headers() {
        return [
            {
                // This targets all .ics files in your /public directory
                source: "/:path*{.ics}",
                headers: [
                    {
                        key: "Content-Type",
                        value: "text/calendar; charset=utf-8",
                    },
                ],
            },
        ];
    },
};

export default nextConfig;
