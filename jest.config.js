module.exports = {
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.ts', '!**/node_modules/**'],
  coverageDirectory: 'coverage',
  setupFilesAfterEnv: ['./test/setup.js'],
  testURL: 'http://localhost/',
};
