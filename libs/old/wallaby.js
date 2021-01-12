module.exports = function () {
  return {
    files: [
      'src/**/*.ts',
      { pattern: 'src/**/*.test.ts', ignore: true },
      'test/**/*.ts',
    ],
    tests: ['src/**/*.test.ts'],
    autoDetect: true,
    env: {
      type: 'node',
      params: {
        runner: '--experimental-vm-modules',
      },
    },
    testFramework: 'jest',
  }
}
