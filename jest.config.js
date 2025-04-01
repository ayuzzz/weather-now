const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig = {
  moduleDirectories: ["node_modules", "<rootDir>/"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1", // Alias resolution
    "^@/styles/(.*)$": "<rootDir>/src/styles/$1", // Handle CSS modules
    "\\.(css|less|scss|sass)$": "identity-obj-proxy", // Mock styles
  },
  testEnvironment: "jest-environment-jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
};

module.exports = createJestConfig(customJestConfig);
