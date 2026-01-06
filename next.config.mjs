// /** @type {import('next').NextConfig} */
// const nextConfig = {};

// export default nextConfig;


// next.config.js - Add this file if you don't have it
/** @type {import('next').NextConfig} */
const nextConfig = {
    // Ensure cookies work properly in development
    async headers() {
      return [
        {
          source: '/api/:path*',
          headers: [
            {
              key: 'Access-Control-Allow-Credentials',
              value: 'true',
            },
          ],
        },
      ]
    },
  }
  
  export default nextConfig;