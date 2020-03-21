// This file is not going through babel transformation.
// So, we write it in vanilla JS
// (But you could use ES2015 features supported by your Node.js version)

const debug = process.env.NODE_ENV !== 'production';

module.exports = {
  exportPathMap: function() {
    return {
      '/': { page: '/' },
      '/about': { page: '/about' },

      '/guides': { page: '/guides/index' },
      '/getting-started': { page: '/getting-started' },
      '/guides/invalidating-the-cache': {
        page: '/guides/invalidating-the-cache',
      },
      '/guides/caching-responses': { page: '/guides/caching-responses' },
      '/guides/deduplicating-requests': {
        page: '/guides/deduplicating-requests',
      },
      '/guides/faq': {
        page: '/guides/faq',
      },

      '/api': { page: '/api/index' },
      '/api/bestfetch': { page: '/api/bestfetch' },
      '/api/responsecache': { page: '/api/response-cache' },
      '/api/activerequests': { page: '/api/active-requests' },
      '/api/cachemisserror': { page: '/api/cache-miss-error' },
      '/api/getrequestkey': { page: '/api/get-request-key' },
    };
  },
  assetPrefix: !debug ? '/bestfetch/' : '',
  webpack: (config, { dev }) => {
    // Perform customizations to webpack config
    // console.log('webpack');
    // console.log(config.module.rules, dev);
    config.module.rules = config.module.rules.map(rule => {
      if (rule.loader === 'babel-loader') {
        rule.options.cacheDirectory = false;
      }
      return rule;
    });
    // Important: return the modified config
    return config;
  } /*,
  webpackDevMiddleware: (config) => {
    // Perform customizations to webpack dev middleware config
    // console.log('webpackDevMiddleware');
    // console.log(config);
    // Important: return the modified config
    return config
  }, */,
};
