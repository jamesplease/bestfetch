const config = {
  test: {
    targets: {
      node: 'current',
    },
  },
  build: {
    targets: {
      browsers: ['last 2 versions', 'safari >= 7'],
    },
    modules: false,
  },
};

module.exports = api => {
  const isTest = api.env('test');
  const configKey = isTest ? 'test' : 'build';

  return {
    presets: [['@babel/preset-env', config[configKey]], '@babel/typescript'],
  };
};
