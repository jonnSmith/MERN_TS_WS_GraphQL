module.exports = {
  preset: "ts-jest",
  coverageReporters: [
    "lcov",
    "html"
  ],
  rootDir: "../../server",
  testEnvironment: "node",
  setupFilesAfterEnv: [
    "../configs/server/jest.setup.js"
  ]
};