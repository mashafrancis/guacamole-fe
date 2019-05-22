module.exports = {
  verbose: true,
  testURL: "http://localhost/",
  'roots': [
    '<rootDir>/src'
  ],
  "globals": {
    "ts-jest": {
      "useBabelrc": true
    }
  },
  'transform': {
    '^.+\\.tsx?$': 'ts-jest'
  },
  'testRegex': '(roots/.*|(\\.|/)(test))\\.(ts|tsx)?$',
  'moduleDirectories': ['utils', 'modules', 'node_modules'],
  'moduleFileExtensions': [
    'ts',
    'tsx',
    'js',
    'jsx',
    'json',
    'node'
  ],
  "coverageReporters": [
    "html",
    "json",
    "lcov",
    "text",
    "clover"
  ],
  'moduleNameMapper': {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/src/**/*.fixtures.ts',
    '\\.(css|less|scss)$': 'identity-obj-proxy'
  },
  'collectCoverage': true,
  'collectCoverageFrom': ["src/**/*.ts", "src/**/*.tsx", "!src/**/interface.d.ts", "!src/**/*interfaces.d.ts"],
  'coverageThreshold': {
    "global": {
<<<<<<< HEAD
      "branches": 1,
      "functions": 1,
      "lines": 1,
      "statements": 1
=======
      "branches": 10,
      "functions": 10,
      "lines": 10,
      "statements": 15
>>>>>>> feat(user-account): dummy reset password page
    }
  },
  'setupFiles': [
    'jest-canvas-mock',
    'jest-localstorage-mock',
    '<rootDir>/node_modules/regenerator-runtime/runtime',
    '<rootDir>/src/setupMocks.ts',
  ],
  'coveragePathIgnorePatterns': ['/node_modules', '<rootDir>/src/index.tsx', 'src/store/index.ts|rootReducer.ts'],
  'snapshotSerializers': ['enzyme-to-json/serializer'],
  'setupTestFrameworkScriptFile': '<rootDir>/src/setupEnzyme.ts',
};
