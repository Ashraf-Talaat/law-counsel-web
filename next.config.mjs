/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["ik.imagekit.io"],
  },
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: false, 
      },
    ];
  },
};

export default nextConfig;
