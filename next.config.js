const { getRedirectStatus } = require('next/dist/lib/load-custom-routes');

module.exports = {
  async redirects() {
    return [
      {
        source: '/supervirus',
        destination: '/supervirus/index.html',
        permanent: true
      }
    ];
  },
  async headers() {
    return [
      {
        source: '/sylvershine/(.*)',
        headers: [
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin'
          },
          {
            key: 'Cross-Origin-Embedder-Policy',
            value: 'require-corp'
          }
        ]
      }
    ];
  }
};
