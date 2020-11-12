module.exports = {
  preset: 'ts-jest',
  setupFilesAfterEnv: ['./test/jest-start.ts'],
  coverageDirectory: 'docs/coverage',
}
