/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            { hostname: "cdn-icons-png.flaticon.com" },
            { hostname: "m.media-amazon.com" },
            { hostname: "html.hixstudio.net" },
            { hostname: "res.cloudinary.com" }
        ],
    },
};

export default nextConfig;
