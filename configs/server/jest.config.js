module.exports = {
  preset: "ts-jest",
  testPathIgnorePatterns: [
    "/node_modules/",
    "/client/"
  ],
  coverageReporters: [
    "lcov",
    "html"
  ],
  testEnvironment: "node",
  setupFilesAfterEnv: [
    "./jest.setup.js"
  ]
};