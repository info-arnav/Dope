module.exports = {
  images: {
    unoptimized: true,
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://www.itsdope.in/:path*",
      },
    ];
  },
};
