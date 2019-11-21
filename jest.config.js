module.exports = {
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{js,jsx}', '!**/node_modules/**'],
  coverageDirectory: 'coverage',
  setupFilesAfterEnv: ['./test/setup.js'],
  testURL: 'http://localhost/',
};
