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
  }
};
