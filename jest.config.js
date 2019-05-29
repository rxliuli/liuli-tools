module.exports = {
  preset: 'ts-jest',
  setupFilesAfterEnv: ['jest-extended'],
  coverageDirectory: 'docs/coverage',
  moduleFileExtensions: ['ts', 'js'],
  setupFilesAfterEnv: ['./test/jest-start.ts'],
}
