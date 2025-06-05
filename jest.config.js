/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'clover', 'html'],
  collectCoverageFrom: [
    'src/**/*.{js,ts}',
    '!**/dist/**',
    '!**/node_modules/**',
    '!src/database/**/*',
    '!src/docs/**/*',
    '!src/Middleware/**/*',
    '!src/Models/**/*',
    '!src/Routes/**/*',
    '!src/Services/**/*',
    '!src/server.ts',
  ],
  testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
};