// jest.config.js (ваш конфиг с moduleNameMapper и transform)
module.exports = {
  moduleNameMapper: {
    "^common/(.*)$": "<rootDir>/src/common/$1",
    "\.(css|less|sass|scss)$": "identity-obj-proxy",
    "^app/(.*)$": "<rootDir>/src/app/$1",
  },
  transform: {
    "^.+\.(ts|tsx)$": "ts-jest",
    "^.+\.(js|jsx)$": "babel-jest",
  },
  transformIgnorePatterns: [
    "/node_modules/(?!axios)/",
  ],
  testEnvironment: "jsdom",
  testMatch: [
    "<rootDir>/src/**/*.test.(ts|tsx|js|jsx)",
    "<rootDir>/src/**/*.spec.(ts|tsx|js|jsx)"
  ],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
};