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
  'collectCoverageFrom': ["src/**/*.{ts, tsx}", "!src/utils/helpers/downloadChartsAsPDF.ts", "!src/**/interface.d.ts", "!src/**/*interface.d.ts"],
  'coverageThreshold': {
    "global": {
      "branches": 80,
      "functions": 80,
      "lines": 80,
      "statements": -10
    }
  },
  'setupFiles': [
    'jest-canvas-mock',
    'jest-localstorage-mock',
    '<rootDir>/node_modules/regenerator-runtime/runtime',
    '<rootDir>/src/setupMocks.ts',
  ],
  'coveragePathIgnorePatterns': ['/node_modules', '<rootDir>/src/index.ts', 'src/store/index.ts|rootReducer.ts'],
  'snapshotSerializers': ['enzyme-to-json/serializer'],
  'setupTestFrameworkScriptFile': '<rootDir>/src/setupEnzyme.ts',
};
