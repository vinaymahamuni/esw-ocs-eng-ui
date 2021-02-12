module.exports = {
  roots: ['<rootDir>/src', '<rootDir>/test'],
  preset: 'ts-jest',
  testRegex: ['(/(test)/.*|(\\.|/)(test|spec))\\.(ts|tsx)?$'],
  testPathIgnorePatterns: ['test/utils/*'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json', 'node'],
  moduleDirectories: ['node_modules', 'src', 'test'],
  verbose: true,
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 85,
      lines: 90,
      statements: 90
    }
  },
  coveragePathIgnorePatterns: ['/node_modules/', 'test/utils/']
}
