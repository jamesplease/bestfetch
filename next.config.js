// This file is not going through babel transformation.
// So, we write it in vanilla JS
// (But you could use ES2015 features supported by your Node.js version)

const debug = process.env.NODE_ENV !== 'production';

module.exports = {
  exportPathMap: function() {
    return {
      '/': { page: '/' },
      '/getting-started': { page: '/getting-started' },

      '/guides': { page: '/guides/index' },
      '/guides/making-requests': {
        page: '/guides/making-requests',
      },
      '/guides/cache-freshness': {
        page: '/guides/cache-freshness',
      },
      '/guides/caching-responses': { page: '/guides/caching-responses' },

      '/guides/deduplicating-requests': {
        page: '/guides/deduplicating-requests',
      },

      '/advanced-guides': { page: '/advanced-guides/index' },
      '/advanced-guides/managing-server-errors': {
        page: '/advanced-guides/managing-server-errors',
      },
      '/advanced-guides/identical-requests': {
        page: '/advanced-guides/identical-requests',
      },
      '/advanced-guides/other-response-types': {
        page: '/advanced-guides/other-response-types',
      },

      '/faq': {
        page: '/faq',
      },

      '/api-reference': { page: '/api-reference/index' },
      '/api-reference/bestfetch': { page: '/api-reference/bestfetch' },
      '/api-reference/response-cache': {
        page: '/api-reference/response-cache',
      },
      '/api-reference/duplicate-requests': {
        page: '/api-reference/duplicate-requests',
      },
      '/api-reference/cache-miss-error': {
        page: '/api-reference/cache-miss-error',
      },
      '/api-reference/get-request-key': {
        page: '/api-reference/get-request-key',
      },
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
