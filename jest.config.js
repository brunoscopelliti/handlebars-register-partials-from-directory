module.exports = {
  collectCoverage: true,
  coverageReporters: ["json", "html"],
  moduleDirectories: [
    "node_modules",
  ],
  setupFiles: [
  ],
  testMatch: ["<rootDir>/**/*.test.js"],
  verbose: true,
};
